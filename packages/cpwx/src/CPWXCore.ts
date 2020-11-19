import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'

export interface IApiConfig {
  corpId: string
  corpSecret: string
  agentId?: string
  token?: string
  encodingAesKey?: string
}

export class CPWXCoreFactory {
  private static CORE_MAP: Map<string, CPWXCore> = new Map<string, CPWXCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    let cpWXCore: CPWXCore = this.CORE_MAP.get(apiConfig.corpId)
    if (cpWXCore) {
      return cpWXCore
    }
    cpWXCore = new CPWXCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.corpId, cpWXCore)
    return cpWXCore
  }

  public static getCore(corpId: string) {
    let cpWXCore: CPWXCore = this.CORE_MAP.get(corpId)
    if (!cpWXCore) {
      throw new Error(
        '需事先调用 CPWXCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 corpId 对应的 config 对象存入后,才可以使用 CPWXCoreFactory.getCore方法'
      )
    }
    return cpWXCore
  }

  public static removeCore(appId: string): boolean {
    return this.CORE_MAP.delete(appId)
  }
}

export class CPWXCore {
  private _accesstokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s'
  private _cache = null
  private _http = Http.getInstance()
  private _apiConfig = null
  constructor(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    this._cache = new RedisCache(redisConfig)
    this._apiConfig = apiConfig
  }

  /**
   *  获取 acces_token
   *  1、先从redis缓存中获取，如果可用就直接返回
   *  2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token，并存入redis
   */
  public async getAccessToken(): Promise<string> {
    let accessToken: string | undefined = await this.getAvailableAccessToken()
    if (accessToken) {
      return accessToken
    }
    return await this.refreshAccessToken()
  }

  /**
   *  通过 corpId 从缓存中获取 acces_token
   *  @param apiConfig
   */
  private async getAvailableAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`cp_wx_access_token_${this._apiConfig.corpId}`)
  }

  /**
   *  通过 corpId 从缓存中获取 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`cp_wx_access_token_${this._apiConfig.corpId}`)
  }

  /**
   *  获取新的 acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshAccessToken(): Promise<string> {
    const url = util.format(this._accesstokenUrl, this._apiConfig.corpId, this._apiConfig.corpSecret)
    const data = await this._http.get(url)
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      this._cache.set(`cp_wx_access_token_${this._apiConfig.corpId}`, data.access_token, 'EX', data.expires_in - 100)
      return data.access_token
    } else {
      throw new Error('获取accessToken异常')
    }
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }
}

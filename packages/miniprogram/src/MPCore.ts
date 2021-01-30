import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'

export interface IApiConfig {
  appId: string
  appScrect: string
  token?: string
  encodingAesKey?: string
}

export class MPCoreFactory {
  private static CORE_MAP: Map<string, MPCore> = new Map<string, MPCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    let mpCore: MPCore = this.CORE_MAP.get(apiConfig.appId)
    if (mpCore) {
      return mpCore
    }
    mpCore = new MPCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.appId, mpCore)
    return mpCore
  }

  public static getCore(appId?: string) {
    let mpCore: MPCore = null
    if (appId) {
      mpCore = this.CORE_MAP.get(appId)
    } else {
      const keys = [...this.CORE_MAP.keys()]
      if (keys[0]) {
        mpCore = this.CORE_MAP.get(keys[0])
      }
    }
    if (!mpCore) {
      throw new Error('需事先调用 MPCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 appId 对应的 config 对象存入后,才可以使用 MPCoreFactory.getCore方法')
    }
    return mpCore
  }

  public static removeCore(appId: string): boolean {
    return this.CORE_MAP.delete(appId)
  }
}

export class MPCore {
  private _accesstokenUrl: string = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'
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
   *  通过 appId 从缓存中获取 acces_token
   *  @param apiConfig
   */
  private async getAvailableAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`mp_access_token_${this._apiConfig.appId}`)
  }

  /**
   *  通过 appId 从缓存中获取 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`mp_access_token_${this._apiConfig.appId}`)
  }

  /**
   *  获取新的 acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshAccessToken(): Promise<string> {
    const url = util.format(this._accesstokenUrl, this._apiConfig.appId, this._apiConfig.appScrect)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('获取accessToken异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    await this._cache.set(`mp_access_token_${this._apiConfig.appId}`, data.access_token, 'EX', data.expires_in - 100)
    return data.access_token
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }
}

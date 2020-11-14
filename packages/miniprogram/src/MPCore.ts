import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'

export interface ApiConfig {
  appId: string
  appScrect: string
  token?: string
  encodingAesKey?: string
}

export class MPCoreFactory {
  private static CORE_MAP: Map<string, MPCore> = new Map<string, MPCore>()
  private static RedisConfig: IRedisConfig
  public static setRedis(redisConfig: IRedisConfig) {
    this.RedisConfig = redisConfig
  }

  public static getCore(apiConfig: ApiConfig) {
    if (!this.RedisConfig) {
      throw new Error('please call setRedis to init redis')
    }
    let mpCore: MPCore = this.CORE_MAP.get(apiConfig.appId)
    if (mpCore) {
      return mpCore
    }
    mpCore = new MPCore(apiConfig, this.RedisConfig)
    this.CORE_MAP.set(apiConfig.appId, mpCore)
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
  constructor(apiConfig: ApiConfig, redisConfig: IRedisConfig) {
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
    return await this._cache.get(`access_token_${this._apiConfig.appId}`)
  }

  /**
   *  通过 appId 从缓存中获取 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`access_token_${this._apiConfig.appId}`)
  }

  /**
   *  获取新的 acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshAccessToken(): Promise<string> {
    const url = util.format(this._accesstokenUrl, this._apiConfig.appId, this._apiConfig.appScrect)
    const data = await this._http.get(url)
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      this._cache.set(`access_token_${this._apiConfig.appId}`, data.access_token, 'EX', data.expires_in)
      return data.access_token
    } else {
      throw new Error('获取accessToken异常')
    }
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): ApiConfig {
    return this._apiConfig
  }
}

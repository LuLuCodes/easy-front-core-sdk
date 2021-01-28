import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'

export interface Suite {
  suite_id: string
  suite_secret: string
}
export interface IApiConfig {
  corpid: string
  provider_secret: string
  suite_map?: Map<string, Suite>
}

export class OpenCPWXCoreFactory {
  private static CORE_MAP: Map<string, OpenCPWXCore> = new Map<string, OpenCPWXCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    let openWXCore: OpenCPWXCore = this.CORE_MAP.get(apiConfig.corpid)
    if (openWXCore) {
      return openWXCore
    }
    openWXCore = new OpenCPWXCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.corpid, openWXCore)
    return openWXCore
  }

  public static getCore(corpid?: string) {
    let openWXCore: OpenCPWXCore = null
    if (corpid) {
      openWXCore = this.CORE_MAP.get(corpid)
    } else {
      const keys = [...this.CORE_MAP.keys()]
      if (keys[0]) {
        openWXCore = this.CORE_MAP.get(keys[0])
      }
    }
    if (!openWXCore) {
      throw new Error(
        '需事先调用 OpenCPWXCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 appId 对应的 config 对象存入后,才可以使用 OpenCPWXCoreFactory.getCore方法'
      )
    }
    return openWXCore
  }

  public static removeCore(corpid: string): boolean {
    return this.CORE_MAP.delete(corpid)
  }
}

export class OpenCPWXCore {
  private getProviderTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_provider_token'
  private getSuiteTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token'
  private _cache = null
  private _http = Http.getInstance()
  private _apiConfig: IApiConfig = null
  constructor(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    this._cache = new RedisCache(redisConfig)
    this._apiConfig = apiConfig
  }

  /**
   *  获取 服务商acces_token
   *  1、先从redis缓存中获取，如果可用就直接返回
   *  2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token，并存入redis
   */
  public async getProviderAccessToken(): Promise<string> {
    let accessToken: string | undefined = await this.getAvailableProviderAccessToken()
    if (accessToken) {
      return accessToken
    }
    return await this.refreshProviderAccessToken()
  }

  /**
   *  通过 corpid 从缓存中获取 服务商acces_token
   *  @param apiConfig
   */
  private async getAvailableProviderAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`open_cp_wx_provider_access_token_${this._apiConfig.corpid}`)
  }

  /**
   *  通过 corpid 从缓存中获取服务商 acces_token过期时间
   *  @param apiConfig
   */
  public async getProviderAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`open_cp_wx_provider_access_token_${this._apiConfig.corpid}`)
  }

  /**
   *  获取新的 服务商acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshProviderAccessToken(): Promise<string> {
    const { corpid, provider_secret } = this._apiConfig
    const url = util.format(this.getProviderTokenUrl)
    const data = await this._http.get(url, { corpid, provider_secret })
    if (!data) {
      throw new Error('获取provider access token异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    this._cache.set(`open_cp_wx_provider_access_token_${corpid}`, data.provider_access_token, 'EX', data.expires_in)
    return data.access_token
  }

  /**
   *  获取 suite acces_token
   *  1、先从redis缓存中获取，如果可用就直接返回
   *  2、如果缓存中的已过期就调用刷新接口来获取新的 acces_token，并存入redis
   */
  public async getSuiteAccessToken(suite_id: string): Promise<string> {
    let accessToken: string | undefined = await this.getAvailableSuiteAccessToken(suite_id)
    if (accessToken) {
      return accessToken
    }
    return await this.refreshSuiteAccessToken(suite_id)
  }

  /**
   *  通过 suite_id 从缓存中获取 suite acces_token
   *  @param apiConfig
   */
  private async getAvailableSuiteAccessToken(suite_id: string): Promise<string | undefined> {
    return await this._cache.get(`open_cp_wx_suite_access_token_${suite_id}`)
  }

  /**
   *  通过 suite_id 从缓存中获取suite acces_token过期时间
   *  @param apiConfig
   */
  public async getSuiteAccessTokenExpiresIn(suite_id: string): Promise<number | undefined> {
    return await this._cache.ttl(`open_cp_wx_provider_access_token_${suite_id}`)
  }

  /**
   *  获取新的 suite acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshSuiteAccessToken(suite_id: string): Promise<string> {
    const { suite_map } = this._apiConfig
    const suite = suite_map.get(suite_id)
    if (!suite) {
      throw new Error('缺少suite_ticket')
    }
    const { suite_secret } = suite
    const suite_ticket = this._cache.get(`open_cp_wx_suite_ticket_${suite_id}`)
    if (!suite_ticket) {
      throw new Error('缺少suite_ticket')
    }
    const url = util.format(this.getSuiteTokenUrl)
    const data = await this._http.get(url, { suite_id, suite_secret, suite_ticket })
    if (!data) {
      throw new Error('获取suite access token异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    this._cache.set(`open_cp_wx_suite_access_token_${suite_id}`, data.suite_access_token, 'EX', data.expires_in)
    return data.access_token
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }
}

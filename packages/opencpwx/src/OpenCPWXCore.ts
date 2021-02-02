import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'
export interface ISuiteConfig {
  suite_id: string
  suite_secret: string
  token: string
  encodingAesKey: string
}
export interface IApiConfig {
  corpid: string
  provider_secret: string
  token: string
  encodingAesKey: string
}

export interface ICropConfig {
  suite: OpenCPWXSuite
  corpid: string
  permanent_code: string
}

export interface OpenCPWXBase {
  getAccessToken(): Promise<string>
  getAccessTokenExpiresIn(): Promise<number | undefined>
  refreshAccessToken(): Promise<string>
}

export class OpenCPWXCoreFactory {
  private static CORE_MAP: Map<string, OpenCPWXCore> = new Map<string, OpenCPWXCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig): OpenCPWXCore {
    let openCPWXCore: OpenCPWXCore = this.CORE_MAP.get(apiConfig.corpid)
    if (openCPWXCore) {
      return openCPWXCore
    }
    openCPWXCore = new OpenCPWXCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.corpid, openCPWXCore)
    return openCPWXCore
  }

  public static getCore(corpid?: string): OpenCPWXCore {
    let openCPWXCore: OpenCPWXCore = null
    if (corpid) {
      openCPWXCore = this.CORE_MAP.get(corpid)
    } else {
      const keys = [...this.CORE_MAP.keys()]
      if (keys[0]) {
        openCPWXCore = this.CORE_MAP.get(keys[0])
      }
    }
    if (!openCPWXCore) {
      throw new Error(
        '需事先调用 OpenCPWXCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 appId 对应的 config 对象存入后,才可以使用 OpenCPWXCoreFactory.getCore方法'
      )
    }
    return openCPWXCore
  }

  public static removeCore(corpid: string): boolean {
    return this.CORE_MAP.delete(corpid)
  }
}

export class OpenCPWXCrop implements OpenCPWXBase {
  private getCorpTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_corp_token?suite_access_token=%s'
  private _cache = null
  private _http = Http.getInstance()
  private _cropConfig: ICropConfig = null
  constructor(cropConfig: ICropConfig, cache: RedisCache) {
    this._cache = cache
    this._cropConfig = cropConfig
  }

  /**
   *  获取 crop acces_token
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
   *  通过 permanent_code 从缓存中获取 crop acces_token
   */
  private async getAvailableAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`open_cp_wx_crop_access_token_${this._cropConfig.permanent_code}`)
  }

  /**
   *  通过 permanent_code 从缓存中获取 crop acces_token过期时间
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`open_cp_wx_crop_access_token_${this._cropConfig.permanent_code}`)
  }

  /**
   *  获取新的 crop acces_token 并设置缓存
   */
  public async refreshAccessToken(): Promise<string> {
    const { suite, corpid, permanent_code } = this._cropConfig
    let url = util.format(this.getCorpTokenUrl, suite.getAccessToken())
    let data = await this._http.post(url, { auth_corpid: corpid, permanent_code })
    if (!data) {
      throw new Error('获取suite access token异常')
    }
    if (data.errcode === 40014) {
      await suite.refreshAccessToken()
      return await this.refreshAccessToken()
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }

    await this._cache.set(`open_cp_wx_crop_access_token_${permanent_code}`, data.access_token, 'EX', data.expires_in)
    return data.access_token
  }

  /**
   *  设置新的 crop acces_token 并设置缓存
   */
  public async setAccessToken(permanent_code: string, access_token: string, expires_in: number): Promise<string> {
    await this._cache.set(`open_cp_wx_crop_access_token_${permanent_code}`, access_token, 'EX', expires_in)
    return access_token
  }

  /**
   *  获取新的 apiConfig
   */
  public getCropConfig(): ICropConfig {
    return this._cropConfig
  }
}

export class OpenCPWXSuite implements OpenCPWXBase {
  private getSuiteTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_suite_token'
  private _cache = null
  private _http = Http.getInstance()
  private _suiteConfig: ISuiteConfig = null
  constructor(suiteConfig: ISuiteConfig, redisConfig: IRedisConfig) {
    this._cache = new RedisCache(redisConfig)
    this._suiteConfig = suiteConfig
  }

  /**
   *  获取 suite acces_token
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
   *  通过 suite_id 从缓存中获取 suite acces_token
   */
  private async getAvailableAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`open_cp_wx_suite_access_token_${this._suiteConfig.suite_id}`)
  }

  /**
   *  通过 suite_id 从缓存中获取suite acces_token过期时间
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`open_cp_wx_suite_access_token_${this._suiteConfig.suite_id}`)
  }

  /**
   *  获取新的 suite acces_token 并设置缓存
   */
  public async refreshAccessToken(): Promise<string> {
    const suite_ticket = await this._cache.get(`open_cp_wx_suite_ticket_${this._suiteConfig.suite_id}`)
    if (!suite_ticket) {
      throw new Error('缺少suite_ticket')
    }
    const url = util.format(this.getSuiteTokenUrl)
    const data = await this._http.post(url, { suite_id: this._suiteConfig.suite_id, suite_secret: this._suiteConfig.suite_secret, suite_ticket })
    if (!data) {
      throw new Error('获取suite access token异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    await this._cache.set(`open_cp_wx_suite_access_token_${this._suiteConfig.suite_id}`, data.suite_access_token, 'EX', data.expires_in)
    return data.suite_access_token
  }
  /**
   *  获取新的 apiConfig
   */
  public getSuiteConfig(): ISuiteConfig {
    return this._suiteConfig
  }

  /**
   * 获取suite_ticket
   */
  public async getSuiteTicket(): Promise<string> {
    const suite_ticket = await this._cache.get(`open_cp_wx_suite_ticket_${this._suiteConfig.suite_id}`)
    return suite_ticket || ''
  }

  /**
   * 设置suite_ticket
   */
  public async setSuiteTicket(suite_ticket: string): Promise<string> {
    await this._cache.set(`open_cp_wx_suite_ticket_${this._suiteConfig.suite_id}`, suite_ticket)
    return suite_ticket
  }

  public initCrop(corpid: string, permanent_code: string): OpenCPWXCrop {
    return new OpenCPWXCrop(
      {
        suite: this,
        corpid,
        permanent_code,
      },
      this._cache
    )
  }
}

export class OpenCPWXCore implements OpenCPWXBase {
  private SUITE_MAP: Map<string, OpenCPWXSuite> = new Map<string, OpenCPWXSuite>()
  private getProviderTokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_provider_token'
  private _cache = null
  private _http = Http.getInstance()
  private _apiConfig: IApiConfig = null
  private _redisConfig: IRedisConfig = null
  constructor(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    this._cache = new RedisCache(redisConfig)
    this._apiConfig = apiConfig
    this._redisConfig = redisConfig
  }

  /**
   *  获取 服务商acces_token
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
   *  通过 corpid 从缓存中获取 服务商acces_token
   *  @param apiConfig
   */
  private async getAvailableAccessToken(): Promise<string | undefined> {
    return await this._cache.get(`open_cp_wx_provider_access_token_${this._apiConfig.corpid}`)
  }

  /**
   *  通过 corpid 从缓存中获取服务商 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`open_cp_wx_provider_access_token_${this._apiConfig.corpid}`)
  }

  /**
   *  获取新的 服务商acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshAccessToken(): Promise<string> {
    const { corpid, provider_secret } = this._apiConfig
    const url = util.format(this.getProviderTokenUrl)
    const data = await this._http.get(url, { corpid, provider_secret })
    if (!data) {
      throw new Error('获取provider access token异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    await this._cache.set(`open_cp_wx_provider_access_token_${corpid}`, data.provider_access_token, 'EX', data.expires_in)
    return data.access_token
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }

  public putSuite(suiteConfig: ISuiteConfig): OpenCPWXSuite {
    let suite: OpenCPWXSuite = this.SUITE_MAP.get(suiteConfig.suite_id)
    if (suite) {
      return suite
    }
    suite = new OpenCPWXSuite(suiteConfig, this._redisConfig)
    this.SUITE_MAP.set(suiteConfig.suite_id, suite)
    return suite
  }

  public getSuite(suite_id?: string): OpenCPWXSuite {
    let suite: OpenCPWXSuite = null
    if (suite_id) {
      suite = this.SUITE_MAP.get(suite_id)
    } else {
      const keys = [...this.SUITE_MAP.keys()]
      if (keys[0]) {
        suite = this.SUITE_MAP.get(keys[0])
      }
    }
    if (!suite) {
      throw new Error('需事先调用 OpenCPWXCore实例的putSuite(suiteConfig: ISuiteConfig) 将 suite_id 对应的 config 对象存入后,才可以使用 getSuite方法')
    }
    return suite
  }

  public removeCore(suite_id: string): boolean {
    return this.SUITE_MAP.delete(suite_id)
  }

  public getAllSuite(): Map<string, OpenCPWXSuite> {
    return this.SUITE_MAP
  }
}

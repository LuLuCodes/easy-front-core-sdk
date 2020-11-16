import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'
import { JsApiType } from './Enums'

export interface IApiConfig {
  appId: string
  appScrect: string
  token?: string
  encodingAesKey?: string
}

export class WXCoreFactory {
  private static CORE_MAP: Map<string, WXCore> = new Map<string, WXCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    let wxCore: WXCore = this.CORE_MAP.get(apiConfig.appId)
    if (wxCore) {
      return wxCore
    }
    wxCore = new WXCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.appId, wxCore)
    return wxCore
  }

  public static getCore(appId: string) {
    let wxCore: WXCore = this.CORE_MAP.get(appId)
    if (!wxCore) {
      throw new Error('需事先调用 WXCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 appId 对应的 config 对象存入后,才可以使用 WXCoreFactory.getCore方法')
    }
    return wxCore
  }

  public static removeCore(appId: string): boolean {
    return this.CORE_MAP.delete(appId)
  }
}

export class WXCore {
  private _accesstokenUrl: string = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s'
  private ticketUrl: string = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=%s'
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
    return await this._cache.get(`wx_access_token_${this._apiConfig.appId}`)
  }

  /**
   *  通过 appId 从缓存中获取 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`wx_access_token_${this._apiConfig.appId}`)
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
      this._cache.set(`wx_access_token_${this._apiConfig.appId}`, data.access_token, 'EX', data.expires_in - 100)
      return data.access_token
    } else {
      throw new Error('获取accessToken异常')
    }
  }

  /**
   * 获取api_ticket
   * @param type
   */
  public async getTicket(type: JsApiType) {
    let jsTicket: string = await this._cache.get(`wx_js_ticket_${this._apiConfig.appId}`)
    if (jsTicket) {
      return jsTicket
    }
    // 通过接口获取
    const token = await this.getAccessToken()
    let url = util.format(this.ticketUrl, token, type)
    let data = await this._http.get(url)
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      this._cache.set(`wx_js_ticket_${this._apiConfig.appId}`, data.ticket, 'EX', data.expires_in - 100)
      return data.ticket
    } else {
      throw new Error('获取jsTicket异常')
    }
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }
}

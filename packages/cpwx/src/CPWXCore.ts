import * as util from 'util'
import { RedisCache, IRedisConfig } from '@easy-front-core-sdk/cache'
import { Http } from '@easy-front-core-sdk/kits'
import { JsApiType } from './Enums'

export interface IApiConfig {
  corpId: string
  corpSecret: string
  agentId: string
  token?: string
  encodingAesKey?: string
}

export class CPWXCoreFactory {
  private static CORE_MAP: Map<string, CPWXCore> = new Map<string, CPWXCore>()

  public static putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) {
    let cpWXCore: CPWXCore = this.CORE_MAP.get(`${apiConfig.corpId}_${apiConfig.agentId}`)
    if (cpWXCore) {
      return cpWXCore
    }
    cpWXCore = new CPWXCore(apiConfig, redisConfig)
    this.CORE_MAP.set(apiConfig.corpId, cpWXCore)
    return cpWXCore
  }

  public static getCore(corpId: string, agentId: string) {
    let cpWXCore: CPWXCore = this.CORE_MAP.get(`${corpId}_${agentId}`)
    if (!cpWXCore) {
      throw new Error(
        '需事先调用 CPWXCoreFactory.putCore(apiConfig: IApiConfig, redisConfig: IRedisConfig) 将 corpId 对应的 config 对象存入后,才可以使用 CPWXCoreFactory.getCore方法'
      )
    }
    return cpWXCore
  }

  public static removeCore(corpId: string, agentId: string): boolean {
    return this.CORE_MAP.delete(`${corpId}_${agentId}`)
  }
}

export class CPWXCore {
  private _accesstokenUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=%s&corpsecret=%s'
  private getCorpTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/get_jsapi_ticket?access_token=%s'
  private getAgentTicketUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/ticket/get?access_token=%s&type=agent_config'

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
    return await this._cache.get(`cp_wx_access_token_${this._apiConfig.corpId}_${this._apiConfig.agentId}`)
  }

  /**
   *  通过 corpId 从缓存中获取 acces_token过期时间
   *  @param apiConfig
   */
  public async getAccessTokenExpiresIn(): Promise<number | undefined> {
    return await this._cache.ttl(`cp_wx_access_token_${this._apiConfig.corpId}_${this._apiConfig.agentId}`)
  }

  /**
   *  获取新的 acces_token 并设置缓存
   *  @param apiConfig
   */
  public async refreshAccessToken(): Promise<string> {
    const url = util.format(this._accesstokenUrl, this._apiConfig.corpId, this._apiConfig.corpSecret)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('获取accessToken异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    this._cache.set(`cp_wx_access_token_${this._apiConfig.corpId}_${this._apiConfig.agentId}`, data.access_token, 'EX', data.expires_in - 100)
    return data.access_token
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }

  /**
   * 获取api_ticket
   * @param type
   */
  public async getTicket(type: JsApiType) {
    let agentId = this._apiConfig.agentId
    let corpId = this._apiConfig.corpId
    let key = agentId.concat(':').concat(corpId).concat(':').concat(type)
    // 从缓存中获取
    let jsTicket: string = await this._cache.get(`qywx_js_ticket_${key}`)
    if (jsTicket) {
      return jsTicket
    }
    // 通过接口获取
    const token = await this.getAccessToken()
    let url: string = util.format(type === JsApiType.CORP ? this.getCorpTicketUrl : this.getAgentTicketUrl, token)
    let data = await this._http.get(url)
    if (!data) {
      throw new Error('获取jsTicket异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    this._cache.set(`qywx_js_ticket_${key}`, data.ticket, 'EX', data.expires_in - 100)
    return data.ticket
  }
}

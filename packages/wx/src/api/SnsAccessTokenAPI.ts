import * as util from 'util'
import * as urlencode from 'urlencode'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { ScopeEnum, Lang } from '../Enums'

export class SnsAccessTokenAPI {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s'
  private static accessTokenUrl: string = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=%s&secret=%s&code=%s&grant_type=authorization_code'
  private static refreshTokenUrl: string = 'https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=%s&grant_type=refresh_token&refresh_token=%s'
  private static userInfoUrl: string = 'https://api.weixin.qq.com/sns/userinfo?access_token=%s&openid=%s&lang=%s'
  private static checkTokenUrl: string = 'https://api.weixin.qq.com/sns/auth?access_token=%s&openid=%s'

  private static _http = Http.getInstance()

  /**
   *  获取授权链接
   *  @param wxCore
   *  @param redirectUri 回调地址
   *  @param scope
   *  @param state
   */
  public static getAuthorizeUrl(wxCore: WXCore, redirectUri: string, scope: ScopeEnum, state?: string): string {
    let url = util.format(this.authorizeUrl, wxCore.getApiConfig().appId, urlencode(redirectUri), scope)
    if (state) {
      url = url + '&state=' + state
    }
    return url + '#wechat_redirect'
  }

  /**
   *  通过code换取网页授权access_token
   *  @param wxCore
   *  @param code
   */
  public static async getSnsAccessToken(wxCore: WXCore, code: string) {
    const url = util.format(this.accessTokenUrl, wxCore.getApiConfig().appId, wxCore.getApiConfig().appScrect, code)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   *  刷新access_token
   *  @param wxCore
   *  @param refreshToken
   */
  public static async refreshAccessToken(wxCore: WXCore, refreshToken: string) {
    const url = util.format(this.refreshTokenUrl, wxCore.getApiConfig().appId, refreshToken)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   *  检验授权凭证（access_token）是否有效
   *  @param accessToken
   *  @param openId
   */
  public static async checkAccessToken(accessToken: string, openId: string) {
    const url = util.format(this.checkTokenUrl, accessToken, openId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   *  拉取用户信息(需scope为 snsapi_userinfo)
   *  @param accessToken
   *  @param openId
   *  @param lang
   */
  public static async getUserInfo(accessToken: string, openId: string, lang: Lang) {
    const url = util.format(this.userInfoUrl, accessToken, openId, lang)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

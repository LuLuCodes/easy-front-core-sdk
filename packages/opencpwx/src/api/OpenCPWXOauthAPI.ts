import * as util from 'util'
import * as urlencode from 'urlencode'
import { OpenCPWXCore, OpenCPWXSuite } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'
/**
 * @description 身份验证-网页授权登录、扫码授权登录
 */
export class OpenCPWXOauthAPI {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=%s&state=%s#wechat_redirect'
  private static qrConnectUrl: string = 'https://open.work.weixin.qq.com/wwopen/sso/3rd_qrConnect?appid=%s&redirect_uri=%s&state=%s&usertype=%s'
  private static getUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/getuserinfo3rd?suite_access_token=%s&code=%s'
  private static getUserDetailUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/getuserdetail3rd?suite_access_token=%s'
  private static getLoginInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_login_info?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 构造网页授权链接
   * @param suiteId 第三方应用id
   * @param redirectUri 授权后重定向的回调链接地址
   * @param scope 应用授权作用域。
   * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
   */
  public static getAuthorizeUrl(suiteId: string, redirectUri: string, scope: string, state?: string) {
    return util.format(this.authorizeUrl, suiteId, urlencode.encode(redirectUri), scope, state)
  }

  /**
   * 构造扫码登录链接
   * @param corpId 服务商的corpId
   * @param redirectUri 授权登录之后目的跳转网址
   * @param state 重定向后会带上state参数
   * @param userType 支持登录的类型。admin代表管理员登录（使用微信扫码）,member代表成员登录（使用企业微信扫码），默认为admin
   */
  public static getQrConnect(corpId: string, redirectUri: string, state?: string, userType?: string) {
    return util.format(this.qrConnectUrl, corpId, urlencode.encode(redirectUri), state, userType)
  }

  /**
   * 根据 code 获取成员信息
   * @param suite
   * @param code 通过成员授权获取到的 code
   */
  @AccessTokenRefresh()
  public static async getUserInfo(suite: OpenCPWXSuite, code: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getUserInfoUrl, token, code)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取访问用户敏感信息
   * @param suite
   * @param userTicket 成员票据
   */
  @AccessTokenRefresh()
  public static async getUserDetail(suite: OpenCPWXSuite, userTicket: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getUserDetailUrl, token)
    const data = await this._http.post(url, {
      user_ticket: userTicket,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取登录用户信息
   * @param cpWXCore
   * @param authCode oauth2.0授权企业微信管理员登录产生的code
   */
  @AccessTokenRefresh()
  public static async getLoginInfo(cpWXCore: OpenCPWXCore, authCode: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getLoginInfoUrl, token)
    const data = await this._http.post(url, {
      auth_code: authCode,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

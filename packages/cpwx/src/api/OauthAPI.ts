import * as util from 'util'
import * as urlencode from 'urlencode'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 身份验证接口
 */
export class OauthAPI {
  private static authorizeUrl: string = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=%s&redirect_uri=%s&response_type=code&scope=snsapi_base&state=%s#wechat_redirect'
  private static qrConnectUrl: string = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=%s&agentid=%s&redirect_uri=%s&state=%s'
  private static getUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s'

  private static _http = Http.getInstance()

  /**
   * 构造网页授权链接
   * @param cpWXCore
   * @param redirectUri 授权后重定向的回调链接地址
   * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
   */
  public static getAuthorizeUrl(cpWXCore: CPWXCore, redirectUri: string, state?: string) {
    return util.format(this.authorizeUrl, cpWXCore.getApiConfig().corpId, urlencode.encode(redirectUri), state)
  }

  /**
   * 构造扫码登录链接
   * @param cpWXCore
   * @param redirectUri 授权后重定向的回调链接地址
   * @param state 重定向后会带上state参数，企业可以填写a-zA-Z0-9的参数值，长度不可超过128个字节
   */
  public static getQrConnect(cpWXCore: CPWXCore, redirectUri: string, state?: string) {
    return util.format(this.qrConnectUrl, cpWXCore.getApiConfig().corpId, cpWXCore.getApiConfig().agentId, urlencode.encode(redirectUri), state)
  }

  /**
   * 根据 code 获取成员信息
   * @param cpWXCore
   * @param code 通过成员授权获取到的 code
   */
  public static async getUserInfo(cpWXCore: CPWXCore, code: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserInfoUrl, token, code)
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

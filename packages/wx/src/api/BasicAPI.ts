import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { CheckAction, CheckOperator } from '../Enums'

/**
 * @description 微信服务器信息
 */
export class BasicAPI {
  private static getCallbackApiUrl: string = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=%s'
  private static getApiDomainIpUrl = 'https://api.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=%s'
  private static checkUrl: string = 'https://api.weixin.qq.com/cgi-bin/callback/check?access_token=%s'
  private static _http = Http.getInstance()
  /**
   * 获取微信API接口 IP地址
   * @param wxCore
   */
  public static async getApiDomainIp(wxCore?: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getApiDomainIpUrl, token)
    const data = await this._http.get(url)
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      return data
    } else {
      throw new Error('接口异常')
    }
  }

  /**
   * 获取微信callback IP地址
   * @param wxCore
   */
  public static async getCallbackIp(wxCore?: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCallbackApiUrl, token)
    const data = await this._http.get(url)
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      return data
    } else {
      throw new Error('接口异常')
    }
  }

  /**
   * 网络检测
   * @param action    执行的检测动作，允许的值：dns（做域名解析）、ping（做ping检测）、all（dns和ping都做）
   * @param operator  指定平台从某个运营商进行检测，允许的值：CHINANET（电信出口）、UNICOM（联通出口）、CAP（腾讯自建出口）、DEFAULT（根据ip来选择运营商）
   * @param wxCore
   */
  public static async check(action: CheckAction = CheckAction.ALL, operator: CheckOperator = CheckOperator.DEFAULT, wxCore?: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.checkUrl, token)
    const data = await this._http.post(url, {
      action: action,
      check_operator: operator,
    })
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      return data
    } else {
      throw new Error('接口异常')
    }
  }
}

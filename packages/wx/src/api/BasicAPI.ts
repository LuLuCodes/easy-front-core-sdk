import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { CheckAction, CheckOperator } from '../Enums'

/**
 * @description 公众号基础接口
 */
export class BasicAPI {
  private static getCallbackApiUrl: string = 'https://api.weixin.qq.com/cgi-bin/getcallbackip?access_token=%s'
  private static getApiDomainIpUrl = 'https://api.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=%s'
  private static checkUrl: string = 'https://api.weixin.qq.com/cgi-bin/callback/check?access_token=%s'
  private static clearQuotaUrl = 'https://api.weixin.qq.com/cgi-bin/clear_quota?access_token=%s'
  private static getAutoReplyRulesUrl: string = 'https://api.weixin.qq.com/cgi-bin/get_current_autoreply_info?access_token=%s'
  private static _http = Http.getInstance()
  /**
   * 获取微信API接口 IP地址
   * @param wxCore
   */
  public static async getApiDomainIp(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getApiDomainIpUrl, token)
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
   * 获取微信callback IP地址
   * @param wxCore
   */
  public static async getCallbackIp(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCallbackApiUrl, token)
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
   * 网络检测
   * @param wxCore
   * @param action    执行的检测动作，允许的值：dns（做域名解析）、ping（做ping检测）、all（dns和ping都做）
   * @param operator  指定平台从某个运营商进行检测，允许的值：CHINANET（电信出口）、UNICOM（联通出口）、CAP（腾讯自建出口）、DEFAULT（根据ip来选择运营商）

   */
  public static async netCheck(wxCore: WXCore, action: CheckAction = CheckAction.ALL, operator: CheckOperator = CheckOperator.DEFAULT) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.checkUrl, token)
    const data = await this._http.post(url, {
      action: action,
      check_operator: operator,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 对公众号的所有 API 调用次数进行清零
   * @param wxCore
   * @param appId 公众号的 appId
   */
  public static async clearQuota(wxCore: WXCore, appId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.clearQuotaUrl, token)
    const data = await this._http.post(url, {
      appid: appId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取公众号的自动回复规则
   * @param accessToken
   */
  public static async getAutoReplyRules(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    let url = util.format(this.getAutoReplyRulesUrl, token)
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

import * as util from 'util'
import * as urlencode from 'urlencode'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

export class SubscribeMsgAPI {
  private static _http = Http.getInstance()

  private static authorizeUrl: string = 'https://mp.weixin.qq.com/mp/subscribemsg?action=get_confirm&appid=%s&scene=%d&template_id=%s&redirect_url=%s'
  private static sdenSubscribeUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/template/subscribe?access_token=%s'
  /**
   * 获取授权URL
   * @param scene  0-10000 场景值
   * @param templateId 订阅消息模板ID
   * @param redirectUrl
   * @param reserved 可以填写a-zA-Z0-9的参数值
   */
  public static getAuthorizeURL(wxCore: WXCore, scene: number, templateId: string, redirectUrl: string, reserved?: string): string {
    let url = util.format(this.authorizeUrl, wxCore.getApiConfig().appId, scene, templateId, urlencode(redirectUrl))
    if (reserved) {
      url = url + '&reserved=' + urlencode(reserved)
    }
    return url + '#wechat_redirect'
  }

  /**
   * 推送订阅模板消息给到授权微信用户
   * @param wxCore
   * @param subscribeMsg
   */
  public static async send(wxCore: WXCore, subscribeMsg: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.sdenSubscribeUrl, token)
    const data = await this._http.post(url, subscribeMsg)
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

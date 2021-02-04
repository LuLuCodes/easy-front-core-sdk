import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'
/**
 * @description 统一服务消息API（可能会被下线，谨慎使用）
 */
export class UniformMsgAPI {
  private static sendUniformMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/uniform_send?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 下发小程序和公众号统一的服务消息
   * @param mpCore
   * @param touser 用户openid
   * @param weappTemplateMsg 小程序模板消息相关的信息
   * @param mpTemplateMsg 公众号模板消息相关的信息
   */
  public static async sendUniformMessage(mpCore: MPCore, touser: string, mpTemplateMsg: object, weappTemplateMsg?: object) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.sendUniformMessageUrl, token)
    const data = await this._http.post(url, {
      touser: touser,
      mp_template_msg: mpTemplateMsg,
      weapp_template_msg: weappTemplateMsg,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

import * as util from 'util'
import { OpenCPWXBase } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'

/**
 * @description 主动发送消息
 */
export class OpenCPWXSendMsgAPI {
  private static sendMessageUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 发送应用消息
   * @param base
   * @param msgJson
   */
  @AccessTokenRefresh()
  public static async sendMessage(base: OpenCPWXBase, msgJson: any) {
    const token = await base.getAccessToken()
    const url = util.format(this.sendMessageUrl, token)
    const data = await this._http.post(url, msgJson)

    return data
  }
}

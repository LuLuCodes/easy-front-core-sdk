import * as util from 'util'
import * as urlencode from 'urlencode'
import { OpenCPWXCore, OpenCPWXSuite } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'
/**
 * @description 小程序接口
 */
export class OpenCPWXMiniAPI {
  private static code2sessionUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/miniprogram/jscode2session?suite_access_token=%s&js_code=%s&grant_type=authorization_code'

  private static _http = Http.getInstance()

  /**
   * 根据 code 获取成员信息
   * @param suite
   * @param code 用户登录凭证
   */
  @AccessTokenRefresh()
  public static async code2session(suite: OpenCPWXSuite, code: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.code2sessionUrl, token, code)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 语义理解
 */
export class SemanticAPI {
  private static searchUrl = 'https://api.weixin.qq.com/semantic/semproxy/search?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 语义理解
   * @param wxCore
   * @param json
   */
  public static async search(wxCore: WXCore, json: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.searchUrl, token)
    json.appid = wxCore.getApiConfig().appId
    const data = await this._http.post(url, json)
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

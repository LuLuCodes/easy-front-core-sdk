import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 长链接转成短链接
 */
export class ShortUrlAPI {
  private static apiUrl: string = 'https://api.weixin.qq.com/cgi-bin/shorturl?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 长链接转成短链接
   * @param wxCore
   * @param json
   */
  public static async getShorturl(wxCore: WXCore, longUrl: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.apiUrl, token)
    const data = await this._http.post(url, {
      action: 'long2short',
      long_url: longUrl,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

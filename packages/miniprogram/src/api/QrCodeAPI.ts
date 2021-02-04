import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * 小程序二维码接口
 */
export class QrCodeAPI {
  private static createQRCodeUrl: string = 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=%s'
  private static getWxAcodeUrl: string = 'https://api.weixin.qq.com/wxa/getwxacode?access_token=%s'
  private static getUnlimitedUrl: string = 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @param mpCore
   * @param path
   * @param width
   */
  public static async createQRCode(mpCore: MPCore, path: string, width: number = 430) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.createQRCodeUrl, token)
    const data = await this._http.post(
      url,
      {
        path: path,
        width: width,
      },
      {
        responseType: 'arraybuffer',
      }
    )
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

  /**
   * 获取小程序二维码
   * 适用于需要的码数量较少的业务场景。通过该接口生成的小程序码，永久有效，有数量限制
   * @param mpCore
   * @param path
   * @param width
   * @param autoColor
   * @param lineColor
   * @param isHyaline
   */
  public static async getWxAcode(
    mpCore: MPCore,
    path: string,
    width: number = 430,
    autoColor: boolean = false,
    lineColor: object = { r: 0, g: 0, b: 0 },
    isHyaline: boolean = false
  ) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getWxAcodeUrl, token)
    const data = await this._http.post(
      url,
      {
        path: path,
        width: width,
        auto_color: autoColor,
        line_color: lineColor,
        is_hyaline: isHyaline,
      },
      {
        responseType: 'arraybuffer',
      }
    )
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

  /**
   * 获取小程序二维码
   * 适用于需要的码数量极多的业务场景。通过该接口生成的小程序码，永久有效，数量暂无限制。
   * @param mpCore
   * @param scene
   * @param page
   * @param width
   * @param autoColor
   * @param lineColor
   * @param isHyaline
   */
  public static async getUnlimited(
    mpCore: MPCore,
    scene: string,
    page: string,
    width: number = 430,
    autoColor: boolean = false,
    lineColor: object = { r: 0, g: 0, b: 0 },
    isHyaline: boolean = false
  ) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getUnlimitedUrl, token)
    const data = await this._http.post(
      url,
      {
        scene: scene,
        page: page,
        width: width,
        auto_color: autoColor,
        line_color: lineColor,
        is_hyaline: isHyaline,
      },
      {
        responseType: 'arraybuffer',
      }
    )
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

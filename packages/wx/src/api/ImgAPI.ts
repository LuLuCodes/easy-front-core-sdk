import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { ImgProcessingType } from '../Enums'

/**
 * @description 图像处理API
 */

export class ImgAPI {
  private static _http = Http.getInstance()
  /**
   * 图像处理
   * @param wxCore
   * @param type 接口URL
   * @param imgUrl 图片的URL
   */
  public static async imgProcessingByUrl(wxCore: WXCore, type: ImgProcessingType, imgUrl: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(type, token)
    const data = await this._http.get(url.concat('&img_url=').concat(imgUrl))
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
   * 图像处理
   * @param wxCore
   * @param type 接口URL
   * @param filePath 图片文件路径
   */
  public static async imgProcessingByFile(wxCore: WXCore, type: ImgProcessingType, filePath: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(type, token)
    const data = await this._http.upload(url, filePath)
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

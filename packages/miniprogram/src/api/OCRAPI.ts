import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'
import { OCRType } from '../Enums'

/**
 * @description OCR 识别API
 */

export class OCRAPI {
  private static _http = Http.getInstance()
  /**
   * OCR 识别
   * @param mpCore
   * @param OcrType 接口URL
   * @param imgUrl 图片的URL
   */
  public static async ocrByUrl(mpCore: MPCore, ocrType: OCRType, imgUrl: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(ocrType, token)
    const data = await this._http.get(url.concat('&img_url=').concat(imgUrl))
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
   * OCR 识别
   * @param mpCore
   * @param ocrType 接口URL
   * @param filePath 图片的文件路径
   */
  public static async ocrByFile(mpCore: MPCore, ocrType: OCRType, filePath: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(ocrType, token)
    const data = await this._http.upload(url, filePath)
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

import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { MediaType } from '../Enums'

/**
 * @description 素材管理
 */
export class MediaAPI {
  private static uploadUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s'
  private static uploadImgUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s'
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s'
  private static jssdkMediaUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/media/get/jssdk?access_token=%s&media_id=%s'

  private static _http = Http.getInstance()

  /**
   * 上传临时素材
   * @param cpWXCore
   * @param mediaType 媒体文件类型
   * @param filePath 文件路径
   */
  public static async upload(cpWXCore: CPWXCore, mediaType: MediaType, filePath: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.uploadUrl, token, mediaType)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 上传图片
   * @param cpWXCore
   * @param filePath 文件路径
   */
  public static async uploadImg(cpWXCore: CPWXCore, filePath: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.uploadImgUrl, token)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取临时素材
   * @param cpWXCore
   * @param mediaId 媒体文件id
   */
  public static async get(cpWXCore: CPWXCore, mediaId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token, mediaId)
    const data = await this._http.get(url, {
      headers: { 'Content-type': 'application/json' },
      responseType: 'arraybuffer',
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
   * 获取高清语音素材
   * @param cpWXCore
   * @param mediaId 媒体文件id
   */
  public static async jssdkMedia(cpWXCore: CPWXCore, mediaId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.jssdkMediaUrl, token, mediaId)
    const data = await this._http.get(url, {
      headers: { 'Content-type': 'application/json' },
      responseType: 'arraybuffer',
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

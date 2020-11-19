import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'
import { MiniProgramMediaType } from '../Enums'

/**
 * @description 内容安全接口
 */
export class SecurityAPI {
  private static imgSecCheckUrl: string = 'https://api.weixin.qq.com/wxa/img_sec_check?access_token=%s'
  private static mediaCheckAsyncUrl: string = 'https://api.weixin.qq.com/wxa/media_check_async?access_token=%s'
  private static msgSecCheckUrl: string = 'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 校验图片是否违规
   * @param mpCore
   * @param imgPath 图片路径
   */
  public static async imgSecCheck(mpCore: MPCore, imgPath: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.imgSecCheckUrl, token)
    const data = await this._http.upload(url, imgPath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 异步校验图片/音频是否违规
   * @param mpCore
   * @param mediaUrl
   * @param mediaType
   */
  public static async mediaCheckAsync(mpCore: MPCore, mediaUrl: string, mediaType: MiniProgramMediaType) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.mediaCheckAsyncUrl, token)
    const data = await this._http.post(url, {
      media_url: mediaUrl,
      media_type: mediaType,
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
   * 校验文本是否违规
   * @param mpCore
   * @param content
   */
  public static async msgSecCheck(mpCore: MPCore, content: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.msgSecCheckUrl, token)
    const data = await this._http.post(url, {
      content,
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

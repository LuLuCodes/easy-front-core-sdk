import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'
import { MiniProgramCustomerMsgType } from '../Enums'

/**
 * @description 小程序客服消息API
 */
export class CustomerMsgAPI {
  private static getTempMediaUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s'
  private static sendUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'
  private static setTypingUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=%s'
  private static uploadUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s'

  private static _http = Http.getInstance()

  /**
   * 获取客服消息内的临时素材。即下载临时的多媒体文件。目前小程序仅支持下载图片文件
   * @param mpCore
   * @param mediaId 媒体文件 ID
   */
  public static async getTempMedia(mpCore: MPCore, mediaId: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getTempMediaUrl, token, mediaId)
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
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 发送客服消息给用户
   * @param mpCore
   * @param openId 用户的 openId
   * @param msgType 消息类型
   * @param data 消息对应的数据
   */
  public static async send(mpCore: MPCore, openId: string, msgType: MiniProgramCustomerMsgType, params?: object) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.sendUrl, token)

    let obj: any = {
      touser: openId,
      text: null,
      image: null,
      link: null,
      miniprogrampage: null,
    }
    if (msgType === MiniProgramCustomerMsgType.TEXT) {
      obj.text = params
      obj.msgtype = 'text'
    } else if (msgType === MiniProgramCustomerMsgType.IMAGE) {
      obj.image = params
      obj.msgtype = 'image'
    } else if (msgType === MiniProgramCustomerMsgType.LINK) {
      obj.link = params
      obj.msgtype = 'link'
    } else if (msgType === MiniProgramCustomerMsgType.MINIPROGRAMPAGE) {
      obj.miniprogrampage = params
      obj.msgtype = 'miniprogrampage'
    }

    const data = await this._http.post(url, obj)
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
   * 下发客服当前输入状态给用户
   * @param mpCore
   * @param openId 用户的 openId
   * @param command 命令
   */
  public static async setTyping(mpCore: MPCore, openId: string, command: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.setTypingUrl, token)
    const data = await this._http.post(url, {
      touser: openId,
      command: command,
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

  /**
   * 新增临时素材
   * @param mpCore
   * @param filePath 文件路径
   * @param mediaType 文件类型
   */
  public static async uploadMedia(mpCore: MPCore, filePath: string, mediaType: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.uploadUrl, token, mediaType)
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

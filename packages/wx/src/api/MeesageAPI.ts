import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 群发消息
 */

export class MessageAPI {
  private static sendByTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/sendall?access_token=%s'
  private static sendByOpenIdUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/send?access_token=%s'
  private static deleteUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/delete?access_token=%s'
  private static previewUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/preview?access_token=%s'
  private static getStatusUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/get?access_token=%s'
  private static getSendSpeedUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/speed/get?access_token=%s'
  private static setSendSpeedUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/mass/speed/set?access_token=%s'
  private static _http = Http.getInstance()
  /**
   * 根据标签进行群发【订阅号与服务号认证后均可用】
   * @param wxCore
   * @param msgJson
   */
  public static async sendByTag(wxCore: WXCore, msgJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.sendByTagUrl, token)
    const data = await this._http.post(url, msgJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 根据OpenID列表群发【订阅号不可用，服务号认证后可用】
   * @param wxCore
   * @param msgJson
   */
  public static async sendByOpenId(wxCore: WXCore, msgJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.sendByOpenIdUrl, token)
    const data = await this._http.post(url, msgJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除群发【订阅号与服务号认证后均可用】
   * @param wxCore
   * @param msgJson
   */
  public static async delete(wxCore: WXCore, msgJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.deleteUrl, token)
    const data = await this._http.post(url, msgJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 预览接口【订阅号与服务号认证后均可用】
   * @param wxCore
   * @param msgJson
   */
  public static async preview(wxCore: WXCore, msgJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.previewUrl, token)
    const data = await this._http.post(url, msgJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 查询群发消息发送状态【订阅号与服务号认证后均可用】
   * @param wxCore
   * @param msgId 群发消息后返回的消息id
   */
  public static async getStatus(wxCore: WXCore, msgId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getStatusUrl, token)
    const data = await this._http.post(url, {
      msg_id: msgId,
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
   * 获取群发速度
   * @param wxCore
   */
  public static async getSpeed(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getSendSpeedUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 设置群发速度
   * 0 80w/分钟
   * 1 60w/分钟
   * 2 45w/分钟
   * 3 30w/分钟
   * 4 10w/分钟
   * @param wxCore
   * @param speed 群发速度的级别，是一个0到4的整数，数字越大表示群发速度越慢
   */
  public static async setSpeed(wxCore: WXCore, speed: number) {
    if (speed > 4) speed = 4
    if (speed < 0) speed = 0
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setSendSpeedUrl, token)
    const data = await this._http.post(url, { speed })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

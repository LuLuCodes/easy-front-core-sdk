import { Http } from '@easy-front-core-sdk/kits'
import { TextMsg } from '../entity/TextMsg'
import { MarkDownMsg } from '../entity/MarkDownMsg'
import { ImageMsg } from '../entity/ImageMsg'
import { NewsMsg, Articles } from '../entity/NewsMsg'

/**
 * @description 群机器人
 */
export class GroupRobotAPI {
  private static _http = Http.getInstance()

  /**
   * 往群组推送消息
   * @param url webhook url
   * @param msgJson 请求数据
   */
  public static async send(url: string, msgJson: any) {
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
   * 发送文本消息
   * @param url webhook 地址
   * @param text 文本消息对象 TextMsg
   */
  public static async sendTextMsg(url: string, text: TextMsg) {
    return this.send(url, JSON.stringify(text))
  }

  /**
   * 发送 markdown 消息
   * @param url webhook 地址
   * @param markdown markdown 消息对象 MarkDownMsg
   */
  public static async sendMarkDownMsg(url: string, markdown: MarkDownMsg) {
    return this.send(url, JSON.stringify(markdown))
  }

  /**
   * 发送图片消息
   * @param url webhook 地址
   * @param image 图片消息对象 QyImageMsg
   */
  public static async sendImageMsg(url: string, image: ImageMsg) {
    return this.send(url, JSON.stringify(image))
  }

  /**
   * 发送图文消息
   * @param url webhook 地址
   * @param news 图文类型对象 QyNewsMsg
   */
  public static async sendNewsMsg(url: string, news: NewsMsg) {
    return this.send(url, JSON.stringify(news))
  }
}

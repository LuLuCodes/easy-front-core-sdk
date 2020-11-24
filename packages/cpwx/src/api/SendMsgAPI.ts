import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

import { FileMsg } from '../entity/FileMsg'
import { VideoMsg } from '../entity/VideoMsg'
import { TextMsg } from '../entity/TextMsg'
import { ImageMsg } from '../entity/ImageMsg'
import { VoiceMsg } from '../entity/VoiceMsg'
import { TextCardMsg } from '../entity/TextCardMsg'
import { NewsMsg } from '../entity/NewsMsg'
import { MpNewsMsg } from '../entity/MpNewsMsg'
import { TaskCardMsg } from '../entity/TaskCardMsg'
import { MiniProgramNoticeMsg } from '../entity/MiniProgramNoticeMsg'
import { MarkDownMsg } from '../entity/MarkDownMsg'

/**
 * @description 主动发送消息
 */
export class SendMsgAPI {
  private static getStatisticsUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/get_statistics?access_token=%s'
  private static sendMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/send?access_token=%s'
  private static _http = Http.getInstance()

  /**
   * 查询应用消息发送统计
   * @param cpWXCore
   * @param timeType 查询哪天的数据，0：当天；1：昨天。默认为0
   */
  public static async getTatistics(cpWXCore: CPWXCore, timeType = 0) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getStatisticsUrl, token)
    const data = await this._http.post(url, {
      time_type: timeType,
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
   * 发送应用消息
   * @param cpWXCore
   * @param msgJson
   */
  public static async sendMessage(cpWXCore: CPWXCore, msgJson: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.sendMessageUrl, token)
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
   * @param cpWXCore
   * @param TextMsg text
   */
  public static async sendTextMessage(cpWXCore: CPWXCore, text: TextMsg) {
    return this.sendMessage(cpWXCore, text)
  }

  /**
   * 发送图片消息
   * @param cpWXCore
   * @param ImageMsg image
   */
  public static async sendImageMessage(cpWXCore: CPWXCore, image: ImageMsg) {
    return this.sendMessage(cpWXCore, image)
  }

  /**
   * 发送语音消息
   * @param cpWXCore
   * @param voice
   */
  public static async sendVoiceMessage(cpWXCore: CPWXCore, voice: VoiceMsg) {
    return this.sendMessage(cpWXCore, voice)
  }

  /**
   * 发送视频消息
   * @param cpWXCore
   * @param video
   */
  public static async sendVideoMessage(cpWXCore: CPWXCore, video: VideoMsg) {
    return this.sendMessage(cpWXCore, video)
  }
  /**
   * 发送文件消息
   * @param cpWXCore
   * @param file
   */
  public static async sendFileMessage(cpWXCore: CPWXCore, file: FileMsg) {
    return this.sendMessage(cpWXCore, file)
  }

  /**
   * 文本卡片消息
   * @param cpWXCore
   * @param textCard
   */
  public static async sendTextCardMessage(cpWXCore: CPWXCore, textCard: TextCardMsg) {
    return this.sendMessage(cpWXCore, textCard)
  }

  /**
   * 图文消息
   * @param cpWXCore
   * @param news
   */
  public static async sendNewsMessage(cpWXCore: CPWXCore, news: NewsMsg) {
    return this.sendMessage(cpWXCore, news)
  }

  /**
   * 图文消息
   * @param cpWXCore
   * @param mpnews
   */
  public static async sendMpNewsMessage(cpWXCore: CPWXCore, mpnews: MpNewsMsg) {
    return this.sendMessage(cpWXCore, mpnews)
  }

  /**
   * markdown 消息
   * @param cpWXCore
   * @param markdown
   */
  public static async sendMarkDownMessage(cpWXCore: CPWXCore, markdown: MarkDownMsg) {
    return this.sendMessage(cpWXCore, markdown)
  }

  /**
   * 小程序通知消息
   * @param cpWXCore
   * @param miniprogramNotice
   */
  public static async sendMiniprogramNoticeMessage(cpWXCore: CPWXCore, miniprogramNotice: MiniProgramNoticeMsg) {
    return this.sendMessage(cpWXCore, miniprogramNotice)
  }

  /**
   * 任务卡片消息
   * @param cpWXCore
   * @param taskCard
   */
  public static async sendTaskCardMessage(cpWXCore: CPWXCore, taskCard: TaskCardMsg) {
    return this.sendMessage(cpWXCore, taskCard)
  }
}

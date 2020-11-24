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
 * @description 群聊
 */
export class ChatAPI {
  private static createUrl = 'https://api.weixin.qq.com/cgi-bin/appchat/create?access_token=%s'
  private static updateUrl = 'https://api.weixin.qq.com/cgi-bin/appchat/update?access_token=%s'
  private static getUrl = 'https://api.weixin.qq.com/cgi-bin/appchat/get?access_token=%s&chatid=%s'
  private static sendLinkedCorpUrl = 'https://api.weixin.qq.com/cgi-bin/linkedcorp/message/send?access_token=%s'
  private static sendUrl = 'https://api.weixin.qq.com/cgi-bin/appchat/send?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建群聊会话
   * @param cpWXCore
   * @param userList 群成员id列表。至少2人，至多500人
   * @param owner 指定群主的id。如果不指定，系统会随机从userlist中选一人作为群主
   * @param name 群聊名，最多50个utf8字符，超过将截断
   * @param chatId 群聊的唯一标志，不能与已有的群重复；字符串类型，最长32个字符。只允许字符0-9及字母a-zA-Z。如果不填，系统会随机生成群id
   */
  public static async create(cpWXCore: CPWXCore, userList: Array<string>, owner?: string, name?: string, chatId?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, {
      userlist: userList,
      name: name,
      owner: owner,
      chatid: chatId,
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
   * 修改群聊会话
   * @param cpWXCore
   * @param chatId 群聊id
   * @param addUserList 添加成员的id列表
   * @param delUserList 踢出成员的id列表
   * @param owner 新群主的id
   * @param name 新的群聊名
   */
  public static async update(cpWXCore: CPWXCore, chatId: string, addUserList?: Array<string>, delUserList?: Array<string>, owner?: string, name?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      chatid: chatId,
      add_user_list: addUserList,
      del_user_list: delUserList,
      name: name,
      owner: owner,
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
   * 获取群聊会话
   * @param cpWXCore
   * @param chatId 群聊id
   */
  public static async get(cpWXCore: CPWXCore, chatId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token, chatId)
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
   * 应用推送消息
   * @param cpWXCore
   * @param msgJson 请求数据
   */
  public static async send(cpWXCore: CPWXCore, msgJson: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.sendUrl, token)
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
   * 互联企业消息推送
   * @param cpWXCore
   * @param msgJson 请求数据
   */
  public static async sendLinkedCorpMsg(cpWXCore: CPWXCore, msgJson: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.sendLinkedCorpUrl, token)
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
   * @param {TextMsg} text
   */
  public static async sendTextMessage(cpWXCore: CPWXCore, text: TextMsg) {
    return this.send(cpWXCore, text)
  }

  /**
   * 发送图片消息
   * @param cpWXCore
   * @param {ImageMsg} image
   */
  public static async sendImageMessage(cpWXCore: CPWXCore, image: ImageMsg) {
    return this.send(cpWXCore, image)
  }

  /**
   * 发送语音消息
   * @param cpWXCore
   * @param voice
   */
  public static async sendVoiceMessage(cpWXCore: CPWXCore, voice: VoiceMsg) {
    return this.send(cpWXCore, voice)
  }

  /**
   * 发送视频消息
   * @param cpWXCore
   * @param video
   */
  public static async sendVideoMessage(cpWXCore: CPWXCore, video: VideoMsg) {
    return this.send(cpWXCore, video)
  }

  /**
   * 发送文件消息
   * @param cpWXCore
   * @param file
   */
  public static async sendFileMessage(cpWXCore: CPWXCore, file: FileMsg) {
    return this.send(cpWXCore, file)
  }

  /**
   * 文本卡片消息
   * @param cpWXCore
   * @param textCard
   */
  public static async sendTextCardMessage(cpWXCore: CPWXCore, textCard: TextCardMsg) {
    return this.send(cpWXCore, textCard)
  }

  /**
   * 图文消息
   * @param cpWXCore
   * @param news
   */
  public static async sendNewsMessage(cpWXCore: CPWXCore, news: NewsMsg) {
    return this.send(cpWXCore, news)
  }

  /**
   * 图文消息
   * @param cpWXCore
   * @param mpnews
   */
  public static async sendMpNewsMessage(cpWXCore: CPWXCore, mpnews: MpNewsMsg) {
    return this.send(cpWXCore, mpnews)
  }

  /**
   * markdown 消息
   * @param cpWXCore
   * @param markdown
   */
  public static async sendMarkDownMessage(cpWXCore: CPWXCore, markdown: MarkDownMsg) {
    return this.send(cpWXCore, markdown)
  }
}

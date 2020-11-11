import { InMsg } from './entity/message/input/InMsg'
import { InTextMsg } from './entity/message/input/InTextMsg'
import { OutMsg } from './entity/message/output/OutMsg'
import { InNotDefinedMsg } from './entity/message/input/InNotDefinedMsg'
import { InImageMsg } from './entity/message/input/InImageMsg'
import { InVideoMsg } from './entity/message/input/InVideoMsg'
import { InVoiceMsg } from './entity/message/input/InVoiceMsg'
import { InShortVideoMsg } from './entity/message/input/InShortVideoMsg'
import { InLocationMsg } from './entity/message/input/InLocationMsg'
import { InLinkMsg } from './entity/message/input/InLinkMsg'
import { InSpeechRecognitionResults } from './entity/message/input/InSpeechRecognitionResults'
import { InFollowEvent } from './entity/message/input/event/InFollowEvent'
import { InQrCodeEvent } from './entity/message/input/event/InQrCodeEvent'
import { InLocationEvent } from './entity/message/input/event/InLocationEvent'
import { InMenuEvent } from './entity/message/input/event/InMenuEvent'
import { InTemplateMsgEvent } from './entity/message/input/event/InTemplateMsgEvent'
import { OutTextMsg } from './entity/message/output/OutTextMsg'
import { OutImageMsg } from './entity/message/output/OutImageMsg'
import { OutVoiceMsg } from './entity/message/output/OutVoiceMsg'
import { OutVideoMsg } from './entity/message/output/OutVideoMsg'

/**
 * @description 消息适配器
 */
export interface IMsgAdapter {
  // 处理文本消息
  processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg>
  // 处理图片消息
  processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg>
  // 处理声音消息
  processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg>
  // 处理视频消息
  processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg>
  // 处理小视频消息
  processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg>
  // 处理地理位置消息
  processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg>
  // 处理链接消息
  processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg>
  // 处理语音识别结果
  processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg>
  // 处理未定义的消息(其他消息...该扩展了)
  processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg>
  // 处理关注、取消关注事件
  processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg>
  // 处理扫码事件
  processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg>
  // 处理地理位置事件
  processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg>
  // 处理地理位置事件
  processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg>
  // 处理模板消息事件
  processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg>
  renderOutTextMsg(inMsg: InMsg, content?: string): Promise<OutTextMsg>
}

export class MsgAdapter implements IMsgAdapter {
  async processInTextMsg(inTextMsg: InTextMsg): Promise<OutMsg> {
    const outMsg = new OutTextMsg(inTextMsg)
    outMsg.setContent(inTextMsg.getContent)
    return outMsg
  }

  async processInImageMsg(inImageMsg: InImageMsg): Promise<OutMsg> {
    let outMsg = new OutImageMsg(inImageMsg)
    outMsg.setMediaId = inImageMsg.getMediaId
    return outMsg
  }
  async processInVoiceMsg(inVoiceMsg: InVoiceMsg): Promise<OutMsg> {
    let outMsg = new OutVoiceMsg(inVoiceMsg)
    outMsg.setMediaId = inVoiceMsg.getMediaId
    return outMsg
  }
  async processInVideoMsg(inVideoMsg: InVideoMsg): Promise<OutMsg> {
    let outMsg = new OutVideoMsg(inVideoMsg)
    outMsg.setMediaId = inVideoMsg.getMediaId
    outMsg.setDescription = 'IJPay 让支付触手可及'
    outMsg.setTitle = '视频消息'
    return outMsg
  }
  async processInShortVideoMsg(inShortVideoMsg: InShortVideoMsg): Promise<OutMsg> {
    let outMsg = new OutVideoMsg(inShortVideoMsg)
    outMsg.setMediaId = inShortVideoMsg.getMediaId
    outMsg.setDescription = 'TypeScript + Node.js 开发微信公众号'
    outMsg.setTitle = '短视频消息'
    return outMsg
  }
  async processInLocationMsg(inLocationMsg: InLocationMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationMsg, '位置消息... \n\nX:' + inLocationMsg.getLocation_X + ' Y:' + inLocationMsg.getLocation_Y + '\n\n' + inLocationMsg.getLabel)
  }
  async processInLinkMsg(inLinkMsg: InLinkMsg): Promise<OutMsg> {
    let text = new OutTextMsg(inLinkMsg)
    text.setContent('链接频消息...' + inLinkMsg.getUrl)
    return text
  }
  async processInSpeechRecognitionResults(inSpeechRecognitionResults: InSpeechRecognitionResults): Promise<OutMsg> {
    let text = new OutTextMsg(inSpeechRecognitionResults)
    text.setContent('语音识别消息...' + inSpeechRecognitionResults.getRecognition)
    return text
  }

  async processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {
    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == inFollowEvent.getEvent) {
      return this.renderOutTextMsg(inFollowEvent, '感谢你的关注 么么哒 \n\n交流群：114196246')
    } else if (InFollowEvent.EVENT_INFOLLOW_UNSUBSCRIBE == inFollowEvent.getEvent) {
      console.error('取消关注：' + inFollowEvent.getFromUserName)
      return this.renderOutTextMsg(inFollowEvent)
    } else {
      return this.renderOutTextMsg(inFollowEvent)
    }
  }

  async processInQrCodeEvent(inQrCodeEvent: InQrCodeEvent): Promise<OutMsg> {
    if (InQrCodeEvent.EVENT_INQRCODE_SUBSCRIBE == inQrCodeEvent.getEvent) {
      return this.renderOutTextMsg(inQrCodeEvent, '感谢您的关注，二维码内容：' + inQrCodeEvent.getEventKey)
    } else if (InQrCodeEvent.EVENT_INQRCODE_SCAN == inQrCodeEvent.getEvent) {
      return this.renderOutTextMsg(inQrCodeEvent)
    } else {
      return this.renderOutTextMsg(inQrCodeEvent)
    }
  }
  async processInLocationEvent(inLocationEvent: InLocationEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inLocationEvent, '地理位置是：' + inLocationEvent.getLatitude)
  }
  async processInMenuEvent(inMenuEvent: InMenuEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inMenuEvent, '菜单事件内容是：' + inMenuEvent.getEventKey)
  }
  async processInTemplateMsgEvent(inTemplateMsgEvent: InTemplateMsgEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inTemplateMsgEvent, '消息发送状态：' + inTemplateMsgEvent.getStatus)
  }
  async processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inNotDefinedMsg, '未知消息')
  }
  async renderOutTextMsg(inMsg: InMsg, content?: string | undefined): Promise<OutTextMsg> {
    let OutMsg = new OutTextMsg(inMsg)
    OutMsg.setContent(content ? content : ' ')
    return OutMsg
  }
}

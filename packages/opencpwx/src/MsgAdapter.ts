import { InSuiteTicket } from './entity/message/input/InSuiteTicket'
import { InAuthEvent } from './entity/message/input/InAuthEvent'
import { InExternalContact } from './entity/message/input/InExternalContact'
import { InUpdateUser } from './entity/message/input/InUpdateUser'
import { InNotDefinedMsg } from './entity/message/input/InNotDefinedMsg'
import { InFollowEvent } from './entity/message/input/event/InFollowEvent'
import { InMsg } from './entity/message/input/InMsg'
import { OutMsg } from './entity/message/output/OutMsg'
import { OutTextMsg } from './entity/message/output/OutTextMsg'

/**
 * @description 消息适配器
 */
export interface IMsgAdapter {
  // 处理suite ticket推送
  processInSuiteTicketMsg(inTextMsg: InSuiteTicket): Promise<string>
}

export class MsgAdapter implements IMsgAdapter {
  async processInSuiteTicketMsg(inSuiteTicket: InSuiteTicket): Promise<string> {
    return 'success'
  }

  async processIsNotDefinedMsg(inNotDefinedMsg: InNotDefinedMsg): Promise<OutMsg> {
    return this.renderOutTextMsg(inNotDefinedMsg, '未知消息')
  }

  async renderOutTextMsg(inMsg: InMsg, content?: string | undefined): Promise<OutTextMsg> {
    let OutMsg = new OutTextMsg(inMsg)
    OutMsg.setContent(content ? content : ' ')
    return OutMsg
  }

  // 企业微信开放平台授权通知事件
  async processInAuthEvent(inAuthEvent: InAuthEvent): Promise<string> {
    return 'success'
  }

  async processInExternalContact(inExternalContact: InExternalContact): Promise<string> {
    return 'success'
  }

  async processInUpdateUser(inUpdateUser: InUpdateUser): Promise<string> {
    return 'success'
  }

  // 处理关注、取消关注事件
  async processInFollowEvent(inFollowEvent: InFollowEvent): Promise<OutMsg> {
    return this.renderOutTextMsg(inFollowEvent)
  }
}

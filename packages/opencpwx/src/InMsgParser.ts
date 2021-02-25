import { BaseMsg } from './entity/message/BaseMsg'
import { InMsg } from './entity/message/input/InMsg'
import { InNotDefinedMsg } from './entity/message/input/InNotDefinedMsg'
import { InSuiteTicket } from './entity/message/input/InSuiteTicket'
import { InAuthEvent } from './entity/message/input/InAuthEvent'
import { InExternalContact } from './entity/message/input/InExternalContact'
import { InFollowEvent } from './entity/message/input/event/InFollowEvent'
import { InNotDefinedEvent } from './entity/message/input/event/InNotDefinedEvent'

export class InMsgParser {
  public static parse(obj: any): BaseMsg {
    return this.doParse(obj)
  }

  private static doParse(obj: any): BaseMsg {
    if ('event' === obj.MsgType) return this.parseInEvent(obj)
    if (InSuiteTicket.INFO_TYPE === obj.InfoType) return this.parseInSuiteTicket(obj)
    if (InAuthEvent.CREATE_AUTH === obj.InfoType || InAuthEvent.CHANGE_AUTH === obj.InfoType || InAuthEvent.CANCEL_AUTH === obj.InfoType) return this.InAuthEvent(obj)
    if (InExternalContact.INFO_TYPE === obj.InfoType) return this.parseInExternalContact(obj)
    return new InNotDefinedMsg(obj.ToUserName, obj.FromUserName, obj.CreateTime, obj.MsgType)
  }

  // 推送 suite_ticket
  private static parseInSuiteTicket(obj: any): BaseMsg {
    return new InSuiteTicket(obj.SuiteId, obj.InfoType, obj.TimeStamp, obj.SuiteTicket)
  }

  // 企业微信开放平台授权通知事件
  private static InAuthEvent(obj: any): BaseMsg {
    let infoType = obj.InfoType
    if (InAuthEvent.CREATE_AUTH === infoType) return new InAuthEvent(obj.SuiteId, obj.InfoType, obj.TimeStamp, obj.AuthCode)
    if (InAuthEvent.CHANGE_AUTH === infoType || InAuthEvent.CANCEL_AUTH === infoType) return new InAuthEvent(obj.SuiteId, obj.InfoType, obj.TimeStamp, undefined, obj.AuthCorpId)
  }

  // 外部联系人事件
  private static parseInExternalContact(obj: any): BaseMsg {
    return new InExternalContact(obj.SuiteId, obj.AuthCorpId, obj.InfoType, obj.TimeStamp, obj.ChangeType, obj.UserID, obj.ExternalUserID, obj.WelcomeCode)
  }

  private static parseInEvent(obj: any): InMsg {
    let event: string = obj.Event
    let eventKey: string = obj.EventKey
    let agentId: string = obj.AgentID

    if ('unsubscribe' == event) {
      let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }

    if (InFollowEvent.EVENT_INFOLLOW_SUBSCRIBE == event) {
      let e = new InFollowEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
      e.setEventKey = eventKey
      e.setAgentId = agentId
      return e
    }

    return new InNotDefinedEvent(obj.ToUserName, obj.FromUserName, obj.CreateTime, event)
  }
}

import { BaseMsg } from './entity/message/BaseMsg'
import { InSuiteTicket } from './entity/message/input/InSuiteTicket'
import { InAuthEvent } from './entity/message/input/InAuthEvent'

export class InMsgParser {
  public static parse(obj: any): BaseMsg {
    return this.doParse(obj)
  }

  private static doParse(obj: any): BaseMsg {
    if (InSuiteTicket.INFO_TYPE === obj.InfoType) return this.parseInSuiteTicket(obj)
    if (InAuthEvent.CREATE_AUTH === obj.InfoType || InAuthEvent.CHANGE_AUTH === obj.InfoType || InAuthEvent.CANCEL_AUTH === obj.InfoType) return this.InAuthEvent(obj)
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
}

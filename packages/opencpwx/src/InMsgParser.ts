import { BaseMsg } from './entity/message/BaseMsg'
import { InSuiteTicket } from './entity/message/input/InSuiteTicket'

export class InMsgParser {
  public static parse(obj: any): BaseMsg {
    return this.doParse(obj)
  }

  private static doParse(obj: any): BaseMsg {
    if (InSuiteTicket.INFO_TYPE === obj.InfoType) return this.parseInSuiteTicket(obj)
  }

  // 推送 suite_ticket
  private static parseInSuiteTicket(obj: any): BaseMsg {
    return new InSuiteTicket(obj.SuiteId, obj.InfoType, obj.TimeStamp, obj.SuiteTicket)
  }
}

import { InEventMsg } from './InEventMsg'

export class InNotDefinedEvent extends InEventMsg {
  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }
}

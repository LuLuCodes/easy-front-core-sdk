import { InEventMsg } from './InEventMsg'

export class InFollowEvent extends InEventMsg {
  // 订阅：subscribe
  public static EVENT_INFOLLOW_SUBSCRIBE = 'subscribe'
  // 取消订阅：unsubscribe
  public static EVENT_INFOLLOW_UNSUBSCRIBE = 'unsubscribe'

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }
}

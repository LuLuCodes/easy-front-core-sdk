import { BaseMsg } from './BaseMsg'
import { MessageType } from '../Enums'
import { Text } from './TextMsg'

/**
 * @description markdown 消息
 */
export class MarkDownMsg extends BaseMsg {
  private markdown: Text

  constructor(
    markdown: Text,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.MARKDOWN, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.markdown = markdown
  }

  public get markDown(): Text {
    return this.markdown
  }

  public set markDown(markdown: Text) {
    this.markdown = markdown
  }
}

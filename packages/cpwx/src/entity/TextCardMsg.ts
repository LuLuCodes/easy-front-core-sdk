import { BaseMsg } from './BaseMsg'
import { MessageType } from '../Enums'

/**
 * @description 文本卡片消息
 */
export class TextCardMsg extends BaseMsg {
  private textcard: TextCard

  constructor(
    textCard: TextCard,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.TEXTCARD, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.textcard = textCard
  }

  public get textCard(): TextCard {
    return this.textcard
  }

  public set textCard(textCard: TextCard) {
    this.textcard = textCard
  }
}

export class TextCard {
  private title: string
  private description: string
  private url: string
  private btntxt: string

  constructor(title: string, description: string, url: string, btnTxt: string) {
    this.title = title
    this.description = description
    this.url = url
    this.btntxt = btnTxt
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getTitle(): string {
    return this.title
  }

  public get getDescription(): string {
    return this.description
  }

  public set setDescription(description: string) {
    this.description = description
  }

  public set setUrl(url: string) {
    this.url = url
  }

  public get getUrl(): string {
    return this.url
  }

  public set setBtnTxt(btntxt: string) {
    this.btntxt = btntxt
  }

  public get getBtnTxt(): string {
    return this.btntxt
  }
}

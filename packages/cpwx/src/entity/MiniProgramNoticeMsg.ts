import { BaseMsg } from './BaseMsg'
import { MessageType } from '../Enums'

/**
 * @description 小程序通知消息
 */
export class MiniProgramNoticeMsg extends BaseMsg {
  private miniprogram_notice: Miniprogram

  constructor(
    miniprogramNotice: Miniprogram,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.MINIPROGRAM_NOTICE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.miniprogram_notice = miniprogramNotice
  }

  public get miniprogramNotice(): Miniprogram {
    return this.miniprogram_notice
  }

  public set miniprogramNotice(miniprogramNotice: Miniprogram) {
    this.miniprogram_notice = miniprogramNotice
  }
}

export class Miniprogram {
  private appid: string
  private page: string
  private title: string
  private description: string
  private emphasis_first_item: boolean
  private content_item: Array<Kv>

  constructor(appId: string, title: string, contentTtem: Array<Kv>, page?: string, description?: string, emphasisFirstItem?: boolean) {
    this.appid = appId
    this.title = title
    this.content_item = contentTtem
    this.page = page
    this.emphasis_first_item = emphasisFirstItem
    this.description = description
  }

  public set appId(appId: string) {
    this.appid = appId
  }

  public get appId(): string {
    return this.appid
  }

  public set setPage(page: string) {
    this.page = page
  }

  public get getPage(): string {
    return this.page
  }

  public set setTitle(title: string) {
    this.title = title
  }

  public get getTitle(): string {
    return this.title
  }

  public set contentItem(contentItem: Array<Kv>) {
    this.content_item = contentItem
  }

  public get contentItem(): Array<Kv> {
    return this.content_item
  }

  public set setDescription(description: string) {
    this.description = description
  }

  public get getDescription(): string {
    return this.description
  }

  public set emphasisFirstItem(emphasisFirstItem: boolean) {
    this.emphasis_first_item = emphasisFirstItem
  }

  public get emphasisFirstItem(): boolean {
    return this.emphasis_first_item
  }
}

export class Kv {
  private key: string
  private value: string

  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }

  public set setKey(key: string) {
    this.key = key
  }

  public get getKey() {
    return this.key
  }

  public set setValue(v: string) {
    this.value = v
  }

  public get getValue() {
    return this.value
  }
}

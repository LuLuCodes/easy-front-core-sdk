import { BaseMsg } from './BaseMsg'
import { MessageType } from '../Enums'

/**
 * @description 任务卡片消息
 */
export class TaskCardMsg extends BaseMsg {
  private taskcard: TaskCard

  constructor(
    taskCard: TaskCard,
    agentId: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.TASKCARD, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.taskcard = taskCard
  }

  public get taskCard(): TaskCard {
    return this.taskcard
  }

  public set setText(taskCard: TaskCard) {
    this.taskcard = taskCard
  }
}

export class TaskCard {
  private title: string
  private description: string
  private url: string
  private task_id: string
  private btn: Array<TaskCardBtn>

  constructor(taskId: string, title: string, description: string, btn: Array<TaskCardBtn>, url?: string) {
    this.title = title
    this.description = description
    this.url = url
    this.task_id = taskId
    this.btn = btn
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

  public set setBtn(btn: Array<TaskCardBtn>) {
    this.btn = btn
  }

  public get getBtn(): Array<TaskCardBtn> {
    return this.btn
  }

  public set taskId(taskId: string) {
    this.task_id = taskId
  }

  public get taskId(): string {
    return this.task_id
  }
}

export class TaskCardBtn {
  private key: string
  private name: string
  private replace_name: string
  private color: string
  private is_bold: boolean

  constructor(key: string, name: string, replaceName?: string, color?: string, isBold?: boolean) {
    this.key = key
    this.name = name
    this.replace_name = replaceName
    this.color = color
    this.is_bold = isBold
  }

  public set setKey(key: string) {
    this.key = key
  }

  public get getKey(): string {
    return this.key
  }

  public set setName(name: string) {
    this.name = name
  }

  public get getName(): string {
    return this.name
  }

  public set replaceName(replaceName: string) {
    this.replace_name = replaceName
  }

  public get replaceName(): string {
    return this.replace_name
  }

  public set setColor(color: string) {
    this.color = color
  }

  public get getColor(): string {
    return this.color
  }

  public set isBold(isBold: boolean) {
    this.is_bold = isBold
  }

  public get isBold(): boolean {
    return this.is_bold
  }
}

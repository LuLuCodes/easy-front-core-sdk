import { BaseMsg } from './BaseMsg'
import { MediaId } from './MediaId'
import { MessageType } from '../Enums'

/**
 * @description 文件消息
 */
export class FileMsg extends BaseMsg {
  private file: MediaId

  constructor(
    file: MediaId,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.FILE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.file = file
  }

  public get getFile(): MediaId {
    return this.file
  }

  public set setFile(file: MediaId) {
    this.file = file
  }
}

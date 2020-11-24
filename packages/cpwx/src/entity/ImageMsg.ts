import { BaseMsg } from './BaseMsg'
import { MediaId } from './MediaId'
import { MessageType } from '../Enums'

/**
 * @description 图片消息
 */
export class ImageMsg extends BaseMsg {
  private image: MediaId | Image

  constructor(
    image: MediaId | Image,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.IMAGE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.image = image
  }

  public get getImage(): MediaId | Image {
    return this.image
  }

  public set setImage(image: MediaId | Image) {
    this.image = image
  }
}

export class Image {
  private base64: string
  private md5: string

  constructor(base64: string, md5: string) {
    this.base64 = base64
    this.md5 = md5
  }

  public set setBase64(base64: string) {
    this.base64 = base64
  }

  public get getBase64(): string {
    return this.base64
  }
  public set setMd5(md5: string) {
    this.md5 = md5
  }

  public get getMd5(): string {
    return this.md5
  }
}

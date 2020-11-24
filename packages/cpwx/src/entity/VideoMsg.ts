import { BaseMsg } from './BaseMsg'
import { MediaId } from './MediaId'
import { MessageType } from '../Enums'

/**
 * @description 视频消息
 */
export class VideoMsg extends BaseMsg {
  private video: Video

  constructor(
    video: Video,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.VIDEO, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.video = video
  }

  public get getVideo(): Video {
    return this.video
  }

  public set setVideo(video: Video) {
    this.video = video
  }
}

export class Video extends MediaId {
  private title: string
  private description: string

  constructor(mediaId: string, title: string, description: string) {
    super(mediaId)
    this.title = title
    this.description = description
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
}

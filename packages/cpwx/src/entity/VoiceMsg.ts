import { BaseMsg } from './BaseMsg'
import { MediaId } from './MediaId'
import { MessageType } from '../Enums'

/**
 * @description 语音消息
 */
export class VoiceMsg extends BaseMsg {
  private voice: MediaId

  constructor(
    voice: MediaId,
    agentId?: string,
    toUser?: string,
    toParty?: string,
    toTag?: string,
    safe = 0,
    enableIdTrans = 0,
    enableDuplicateCheck = 0,
    duplicateCheckInterval = 1800
  ) {
    super(MessageType.VOICE, agentId, toUser, toParty, toTag, safe, enableIdTrans, enableDuplicateCheck, duplicateCheckInterval)
    this.voice = voice
  }

  public get getVoice(): MediaId {
    return this.voice
  }

  public set setVoice(voice: MediaId) {
    this.voice = voice
  }
}

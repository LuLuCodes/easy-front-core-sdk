import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { Lang } from '../Enums'

/**
 * @description AI智能接口
 */
export class AIOpenAPI {
  private static addVoiceUrl: string = 'http://api.weixin.qq.com/cgi-bin/media/voice/addvoicetorecofortext?access_token=%s&format=&voice_id=%s&lang=%s'
  private static queryTextUrl: string = 'http://api.weixin.qq.com/cgi-bin/media/voice/queryrecoresultfortext?access_token=%s&voice_id=%s&lang=%s'
  private static translateUrl: string = 'http://api.weixin.qq.com/cgi-bin/media/voice/translatecontent?access_token=%s&lfrom=%s&lto=%s'

  private static _http = Http.getInstance()

  /**
   * 提交语音
   * @param wxCore
   * @param voiceId
   * @param lang
   * @param filePath
   */
  public static async addVoice(wxCore: WXCore, voiceId: string, lang: Lang, filePath: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addVoiceUrl, token, voiceId, lang)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取语音识别结果
   * @param wxCore
   * @param voiceId
   * @param lang
   */
  public static async queryText(wxCore: WXCore, voiceId: string, lang: Lang) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.queryTextUrl, token, voiceId, lang)
    const data = await this._http.post(url, {})
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 微信翻译
   * @param wxCore
   * @param lfrom
   * @param lto
   * @param filePath
   */
  public static async translate(wxCore: WXCore, lfrom: string, lto: string, filePath: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.translateUrl, token, lfrom, lto)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

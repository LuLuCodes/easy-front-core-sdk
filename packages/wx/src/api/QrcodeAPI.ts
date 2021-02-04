import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 生成带参数的二维码
 */
export class QrcodeAPI {
  private static createUrl: string = 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=%s'
  private static showQrcodeUrl: string = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=%s'

  private static _http = Http.getInstance()

  public static async create(wxCore: WXCore, json: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, json)
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
   * 临时二维码
   * @param wxCore
   * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
   * @param sceneId 场景值ID，临时二维码时为32位非0整型
   */
  public static async createTemporary(wxCore: WXCore, expireSeconds: number, sceneId: number) {
    return this.create(wxCore, {
      expire_seconds: expireSeconds,
      action_name: 'QR_SCENE',
      action_info: {
        scene: {
          scene_id: sceneId,
        },
      },
    })
  }

  /**
   * 临时二维码
   * @param wxCore
   * @param expireSeconds 该二维码有效时间，以秒为单位。最大不超过2592000（即30天），此字段如果不填，则默认有效期为30秒。
   * @param sceneStr 长度限制为1到64
   */
  public static async createTemporaryByStr(wxCore: WXCore, expireSeconds: number, sceneStr: string) {
    return this.create(wxCore, {
      expire_seconds: expireSeconds,
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: sceneStr,
        },
      },
    })
  }

  /**
   * 永久二维码
   * @param wxCore
   * @param sceneId
   */
  public static async createPermanent(wxCore: WXCore, sceneId: number) {
    return this.create(wxCore, {
      action_name: 'QR_LIMIT_SCENE',
      action_info: {
        scene: {
          scene_id: sceneId,
        },
      },
    })
  }

  /**
   * 永久二维码
   * @param wxCore
   * @param sceneStr
   */
  public static async createPermanentByStr(wxCore: WXCore, sceneStr: string) {
    return this.create(wxCore, {
      action_name: 'QR_LIMIT_STR_SCENE',
      action_info: {
        scene: {
          scene_str: sceneStr,
        },
      },
    })
  }

  /**
   * 通过ticket换取二维码
   * @param ticket
   */
  public static getShowQrcodeUrl(ticket: string): string {
    return util.format(this.showQrcodeUrl, ticket)
  }
}

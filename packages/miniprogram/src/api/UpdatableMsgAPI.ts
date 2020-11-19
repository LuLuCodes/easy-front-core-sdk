import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 动态消息接口
 */
export class UpdatableMsgAPI {
  private static createActivieyIdUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/activityid/create?access_token=%s'
  private static setUpdatableMsgUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/updatablemsg/send?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建被分享动态消息的 activity_id
   * @param mpCore
   */
  public static async createActivityId(mpCore: MPCore) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.createActivieyIdUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 修改被分享的动态消息
   * @param mpCore
   * @param activityId 动态消息的 ID
   * @param targetState 动态消息修改后的状态
   * @param templateInfo 动态消息对应的模板信息
   */
  public static async setUpdatableMsg(mpCore: MPCore, activityId: string, targetState: number, templateInfo: any) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.setUpdatableMsgUrl, token)
    const data = await this._http.post(url, {
      activity_id: activityId,
      target_state: targetState,
      template_info: templateInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

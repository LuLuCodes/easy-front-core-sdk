import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 通讯录-成员管理异步批量接口
 */

export interface ISyncCallback {
  url: string
  token: string
  encodingaeskey: string
}

export class UserSyncAPI {
  private static batchSyncUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/syncuser?access_token=%s'
  private static replaceUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/replaceuser?access_token=%s'
  private static replacePartyUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/replaceparty?access_token=%s'
  private static getResultUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/getresult?access_token=%s&jobid=%s'

  private static _http = Http.getInstance()

  /**
   * 增量更新成员
   * @param cpWXCore
   * @param mediaId  上传的csv文件的 mediaId
   * @param toInvite 是否邀请新建的成员使用企业微信
   * @param callback 回调信息
   */
  public static async batchSyncUser(cpWXCore: CPWXCore, mediaId: string, toInvite = true, callback?: ISyncCallback) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchSyncUserUrl, token)
    const data = await this._http.post(url, {
      media_id: mediaId,
      to_invite: toInvite,
      callback: callback,
    })
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
   * 全量覆盖成员
   * @param cpWXCore
   * @param mediaId  上传的csv文件的 mediaId
   * @param toInvite 是否邀请新建的成员使用企业微信
   * @param callback 回调信息
   */
  public static async replaceUser(cpWXCore: CPWXCore, mediaId: string, toInvite = true, callback?: ISyncCallback) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.replaceUserUrl, token)
    const data = await this._http.post(url, {
      media_id: mediaId,
      to_invite: toInvite,
      callback: callback,
    })
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
   * 全量覆盖部门
   * @param cpWXCore
   * @param mediaId  上传的csv文件的 mediaId
   * @param callback 回调信息
   */
  public static async replaceParty(cpWXCore: CPWXCore, mediaId: string, callback?: ISyncCallback) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.replacePartyUrl, token)
    const data = await this._http.post(url, {
      media_id: mediaId,
      callback: callback,
    })
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
   * 获取异步任务结果
   * @param cpWXCore
   * @param jobId  异步任务id，最大长度为64字节
   */
  public static async getResult(cpWXCore: CPWXCore, jobId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getResultUrl, token, jobId)
    const data = await this._http.get(url)
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

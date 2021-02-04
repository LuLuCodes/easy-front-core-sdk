import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
/**
 * @description 通讯录-标签管理接口
 */
export class TagAPI {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/create?access_token=%s'
  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/update?access_token=%s'
  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/delete?access_token=%s&tagid=%s'
  private static getUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/get?access_token=%s&tagid=%s'
  private static addTagUsersUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/addtagusers?access_token=%s'
  private static delTagUsersUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/deltagusers?access_token=%s'
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/tag/list?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建标签
   * @param cpWXCore
   * @param tagName 标签名称
   * @param tagId 标签id
   */
  public static async create(cpWXCore: CPWXCore, tagName: string, tagId?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, {
      tagname: tagName,
      tagid: tagId,
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
   * 更新标签名字
   * @param cpWXCore
   * @param tagName 标签名称
   * @param tagId 标签id
   */
  public static async update(cpWXCore: CPWXCore, tagName: string, tagId: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      tagname: tagName,
      tagid: tagId,
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
   * 删除标签
   * @param cpWXCore
   * @param tagId 标签id
   */
  public static async delete(cpWXCore: CPWXCore, tagId: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.deleteUrl, token, tagId)
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

  /**
   * 获取标签成员
   * @param cpWXCore
   * @param tagId 标签id
   */
  public static async getUserByTagId(cpWXCore: CPWXCore, tagId: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserUrl, token, tagId)
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

  /**
   * 增加标签成员
   * @param cpWXCore
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   */
  public static async addTagUsers(cpWXCore: CPWXCore, tagId: number, userList?: Array<string>, partyList?: Array<number>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addTagUsersUrl, token, tagId)
    const data = await this._http.post(url, {
      tagid: tagId,
      userlist: userList,
      partylist: partyList,
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
   * 删除标签成员
   * @param cpWXCore
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   */
  public static async delTagUsers(cpWXCore: CPWXCore, tagId: number, userList?: Array<string>, partyList?: Array<number>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delTagUsersUrl, token, tagId)
    const data = await this._http.post(url, {
      tagid: tagId,
      userlist: userList,
      partylist: partyList,
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
   * 获取标签列表
   * @param cpWXCore
   */
  public static async getTagList(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token)
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

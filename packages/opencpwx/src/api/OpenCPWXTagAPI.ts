import * as util from 'util'
import { OpenCPWXBase } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'
/**
 * @description 标签管理相关接口
 */
export class OpenCPWXTagAPI {
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
   * @param base
   * @param tagName 标签名称
   * @param tagId 标签id
   */
  @AccessTokenRefresh()
  public static async create(base: OpenCPWXBase, tagName: string, tagId?: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, {
      tagname: tagName,
      tagid: tagId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 更新标签名字
   * @param base
   * @param tagName 标签名称
   * @param tagId 标签id
   */
  @AccessTokenRefresh()
  public static async update(base: OpenCPWXBase, tagName: string, tagId: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      tagname: tagName,
      tagid: tagId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除标签
   * @param base
   * @param tagId 标签id
   */
  @AccessTokenRefresh()
  public static async delete(base: OpenCPWXBase, tagId: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.deleteUrl, token, tagId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取标签成员
   * @param base
   * @param tagId 标签id
   */
  @AccessTokenRefresh()
  public static async getUserByTagId(base: OpenCPWXBase, tagId: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.getUserUrl, token, tagId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 增加标签成员
   * @param base
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   */
  @AccessTokenRefresh()
  public static async addTagUsers(base: OpenCPWXBase, tagId: number, userList?: Array<string>, partyList?: Array<number>) {
    const token = await base.getAccessToken()
    const url = util.format(this.addTagUsersUrl, token)
    const data = await this._http.post(url, {
      tagid: tagId,
      userlist: userList,
      partylist: partyList,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除标签成员
   * @param base
   * @param tagId 标签id
   * @param userList 企业成员id列表
   * @param partyList 企业部门id列表
   */
  @AccessTokenRefresh()
  public static async delTagUsers(base: OpenCPWXBase, tagId: number, userList?: Array<string>, partyList?: Array<number>) {
    const token = await base.getAccessToken()
    const url = util.format(this.delTagUsersUrl, token)
    const data = await this._http.post(url, {
      tagid: tagId,
      userlist: userList,
      partylist: partyList,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取标签列表
   * @param base
   */
  @AccessTokenRefresh()
  public static async getTagList(base: OpenCPWXBase) {
    const token = await base.getAccessToken()
    const url = util.format(this.getUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

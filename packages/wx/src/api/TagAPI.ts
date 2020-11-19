import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 用户标签
 */
export class TagAPI {
  private static createTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/create?access_token=%s'
  private static getTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/get?access_token=%s'
  private static updateTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/update?access_token=%s'
  private static deleteTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/delete?access_token=%s'
  private static getUserTagUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/tag/get?access_token=%s'
  private static batchTaggingUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchtagging?access_token=%s'
  private static batchUnTaggingUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchuntagging?access_token=%s'
  private static getIdListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/getidlist?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建标签
   * @param wxCore
   * @param tagName
   */
  public static async create(wxCore: WXCore, tagName: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createTagUrl, token)
    const data = await this._http.post(url, {
      tag: {
        name: tagName,
      },
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取公众号已创建的标签
   * @param wxCore
   */
  public static async get(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getTagUrl, token)
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
   * 编辑标签
   * @param wxCore
   * @param tagId
   * @param tagName
   */
  public static async update(wxCore: WXCore, tagId: number, tagName: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateTagUrl, token)
    const data = await this._http.post(url, {
      tag: {
        id: tagId,
        name: tagName,
      },
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除标签
   * @param wxCore
   * @param tagId
   */
  public static async delete(wxCore: WXCore, tagId: number) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.deleteTagUrl, token)
    const data = await this._http.post(url, {
      tag: {
        id: tagId,
      },
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取标签下粉丝列表
   * @param wxCore
   * @param tagId
   * @param nextOpenid
   */
  public static async getUser(wxCore: WXCore, tagId: number, nextOpenid?: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getUserTagUrl, token)
    const data = await this._http.post(url, {
      tagid: tagId,
      next_openid: nextOpenid,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 批量为用户打标签
   * @param wxCore
   * @param tagId
   * @param openIdList
   */
  public static async batchAddTag(wxCore: WXCore, tagId: number, openIdList: string[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchTaggingUrl, token)
    const data = await this._http.post(url, {
      openid_list: openIdList,
      tagid: tagId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 批量为用户取消标签
   * @param wxCore
   * @param tagId
   * @param openIdList
   */
  public static async batchDelTag(wxCore: WXCore, tagId: number, openIdList: string[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchUnTaggingUrl, token)
    const data = await this._http.post(url, {
      openid_list: openIdList,
      tagid: tagId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取用户身上的标签列表
   * @param wxCore
   * @param openId
   */
  public static async getUserTag(wxCore: WXCore, openId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getIdListUrl, token)
    const data = await this._http.post(url, {
      openid: openId,
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

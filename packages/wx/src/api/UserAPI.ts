import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 模板消息
 */
export class UserAPI {
  private static updateRemarkUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/updateremark?access_token=%s'

  private static getUserUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/get?access_token=%s'
  private static getUserInfoUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info?access_token=%s&openid=%s'
  private static batchGetUrl: string = 'https://api.weixin.qq.com/cgi-bin/user/info/batchget?access_token=%s'

  private static getBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/getblacklist?access_token=%s'
  private static batchBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchblacklist?access_token=%s'
  private static batchUnBlackListUrl: string = 'https://api.weixin.qq.com/cgi-bin/tags/members/batchunblacklist?access_token=%s'

  private static _http = Http.getInstance()

  /**
   *  设置用户备注名
   *  @param wxCore
   *  @param openId
   *  @param remark
   */
  public static async updateRemark(wxCore: WXCore, openId: string, remark: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateRemarkUrl, token)
    const data = await this._http.post(url, {
      openid: openId,
      remark: remark,
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
   *  获取用户列表
   *  @param wxCore
   *  @param openId
   *  @param remark
   */
  public static async getFollowers(wxCore: WXCore, nextOpenid?: string) {
    const token = await wxCore.getAccessToken()
    let url = util.format(this.getUserUrl, token)
    if (nextOpenid) {
      url += '&next_openid=' + nextOpenid
    }
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
   *  获取用户基本信息（包括UnionID机制）
   *  @param wxCore
   *  @param openId
   *  @param lang
   */
  public static async getUserInfo(wxCore: WXCore, openId: string, lang?: string) {
    const token = await wxCore.getAccessToken()
    let url = util.format(this.getUserInfoUrl, token, openId)
    if (lang) {
      url += '&lang=' + lang
    }
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
   *  批量获取用户基本信息
   *  @param wxCore
   *  @param userList
   */
  public static async batchGetUserInfo(wxCore: WXCore, userList: BatchUserInfo[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchGetUrl, token)
    const data = await this._http.post(url, {
      user_list: userList,
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
   *  获取公众号的黑名单列表
   *  @param wxCore
   *  @param beginOpenId 为空时默认从开头拉取
   */
  public static async getBlackList(wxCore: WXCore, beginOpenId?: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getBlackListUrl, token)
    const data = await this._http.post(url, {
      begin_openid: beginOpenId || '',
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
   *  拉黑用户
   *  @param wxCore
   *  @param openidList  需要拉入黑名单的用户的openid，一次拉黑最多允许20个
   */
  public static async batchBlackList(wxCore: WXCore, openidList: string[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchBlackListUrl, token)
    const data = await this._http.post(url, {
      openid_list: openidList,
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
   *  取消拉黑用户
   *  @param wxCore
   *  @param openidList
   */
  public static async batchUnBlackList(wxCore: WXCore, openidList: string[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchUnBlackListUrl, token)
    const data = await this._http.post(url, {
      openid_list: openidList,
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

export class BatchUserInfo {
  private openid: string
  private lang: string

  constructor(openid: string, lang: string) {
    this.openid = openid
    this.lang = lang
  }

  public get getOpenId(): string {
    return this.openid
  }

  public set setOpenId(openid: string) {
    this.openid = openid
  }

  public get getLang(): string {
    return this.lang
  }

  public set setLang(lang: string) {
    this.lang = lang
  }
}

import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 通讯录-成员管理接口
 */
export class UserAPI {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/create?access_token=%s'
  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/update?access_token=%s'
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/get?access_token=%s&userid=%s'
  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/delete?access_token=%s&userid=%s'
  private static batchDeleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/batchdelete?access_token=%s'
  private static departmentUserUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/simplelist?access_token=%s&department_id=%s&fetch_child=%s'
  private static departmentUserInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/list?access_token=%s&department_id=%s&fetch_child=%s'
  private static userIdToOpenIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_openid?access_token=%s'
  private static openIdToUserIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/convert_to_userid?access_token=%s'
  private static authSuccUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/authsucc?access_token=%s&userid=%s'
  private static batchInviteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/batch/invite?access_token=%s'
  private static getJoinQrCodeUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/corp/get_join_qrcode?access_token=%s&size_type=%s'
  private static getMobileHashCodeUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/get_mobile_hashcode?access_token=%s'
  private static getUserIdByMobileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserid?access_token=%s'
  private static getActiveStatUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/get_active_stat?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建成员
   * @param cpWXCore
   * @param user
   */
  public static async create(cpWXCore: CPWXCore, user: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, user)
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
   * 更新成员
   * @param cpWXCore
   * @param user
   */
  public static async update(cpWXCore: CPWXCore, user: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, user)
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
   * 读取成员
   * @param cpWXCore
   * @param userId 成员 userId
   */
  public static async get(cpWXCore: CPWXCore, userId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token, userId)
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
   * 删除成员
   * @param cpWXCore
   * @param userId 成员 userId
   */
  public static async delete(cpWXCore: CPWXCore, userId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.deleteUrl, token, userId)
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
   * 批量删除成员
   * @param cpWXCore
   * @param userIdList 成员 userId 列表
   */
  public static async batchDelete(cpWXCore: CPWXCore, userIdList: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchDeleteUrl, token)
    const data = await this._http.post(url, {
      useridlist: userIdList,
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
   * 获取部门成员
   * @param cpWXCore
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   */
  public static async getDepartmentUser(cpWXCore: CPWXCore, departmentId: string, fetchChild = 0) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.departmentUserUrl, token, departmentId, fetchChild)
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
   * 获取部门成员详情
   * @param cpWXCore
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   */
  public static async departmentUserInfo(cpWXCore: CPWXCore, departmentId: string, fetchChild = 0) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.departmentUserInfoUrl, token, departmentId, fetchChild)
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
   * userid 转 openid
   * @param cpWXCore
   * @param userId 成员 userId
   */
  public static async toOpenId(cpWXCore: CPWXCore, userId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.userIdToOpenIdUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
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
   * openid 转 userid
   * @param cpWXCore
   * @param openId 成员 openid
   */
  public static async toUerId(cpWXCore: CPWXCore, openId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.openIdToUserIdUrl, token)
    const data = await this._http.post(url, {
      openid: openId,
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
   * 二次验证
   * @param cpWXCore
   * @param userId 成员 userId
   */
  public static async authSucc(cpWXCore: CPWXCore, userId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.authSuccUrl, token, userId)
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
   * 邀请成员
   * @param cpWXCore
   * @param users 成员ID列表, 最多支持1000个
   * @param partys 部门ID列表，最多支持100个
   * @param tags 标签ID列表，最多支持100个
   */
  public static async batchInvite(cpWXCore: CPWXCore, users?: Array<string>, partys?: Array<string>, tags?: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchInviteUrl, token)
    const data = await this._http.post(url, {
      user: users,
      party: partys,
      tag: tags,
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
   * 获取加入企业二维码
   * @param cpWXCore
   * @param sizeType qrcode尺寸类型，1: 171 x 171; 2: 399 x 399; 3: 741 x 741; 4: 2052 x 2052
   */
  public static async getJoinQrCode(cpWXCore: CPWXCore, sizeType: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getJoinQrCodeUrl, token, sizeType)
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
   * 获取手机号随机串
   * @param cpWXCore
   * @param mobile 手机号
   * @param state 企业自定义的state参数
   */
  public static async getMobileHashCode(cpWXCore: CPWXCore, mobile: string, state?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getMobileHashCodeUrl, token)
    const data = await this._http.post(url, {
      mobile: mobile,
      state: state,
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
   * 手机号获取userid
   * @param cpWXCore
   * @param mobile 手机号
   */
  public static async getUserIdByMobile(cpWXCore: CPWXCore, mobile: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserIdByMobileUrl, token)
    const data = await this._http.post(url, {
      mobile,
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
   * 获取企业活跃成员数
   * @param cpWXCore
   * @param date 具体某天的活跃人数，最长支持获取30天前数据
   */
  public static async getActiveStat(cpWXCore: CPWXCore, date: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getActiveStatUrl, token)
    const data = await this._http.post(url, {
      date,
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
}

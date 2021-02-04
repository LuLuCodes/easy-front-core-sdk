import * as util from 'util'
import { OpenCPWXBase } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'
/**
 * @description 成员管理相关接口
 */
export class OpenCPWXUserAPI {
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
  private static getUserIdUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/user/getuserid?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建成员
   * @param base
   * @param jsonData 请求 JSON 数据
   */
  @AccessTokenRefresh()
  public static async create(base: OpenCPWXBase, json: any) {
    const token = await base.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, json)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 更新成员
   * @param base
   * @param jsonData 请求 JSON 数据
   */
  @AccessTokenRefresh()
  public static async update(base: OpenCPWXBase, json: any) {
    const token = await base.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, json)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 读取成员
   * @param base
   * @param userId 成员 userId
   */
  @AccessTokenRefresh()
  public static async get(base: OpenCPWXBase, userId: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.getUrl, token, userId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 删除成员
   * @param base
   * @param userId 成员 userId
   */
  @AccessTokenRefresh()
  public static async delete(base: OpenCPWXBase, userId: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.deleteUrl, token, userId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 批量删除成员
   * @param base
   * @param userIdList 成员 userId 列表
   */
  @AccessTokenRefresh()
  public static async batchDelete(base: OpenCPWXBase, userIdList: Array<string>) {
    const token = await base.getAccessToken()
    const url = util.format(this.batchDeleteUrl, token)
    const data = await this._http.post(url, { useridlist: userIdList })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取部门成员
   * @param base
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   */
  @AccessTokenRefresh()
  public static async getDepartmentUser(base: OpenCPWXBase, departmentId: number, fetchChild = 0) {
    const token = await base.getAccessToken()
    const url = util.format(this.departmentUserUrl, token, departmentId, fetchChild)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取部门成员详情
   * @param base
   * @param departmentId 获取的部门id
   * @param fetchChild 是否递归获取子部门下面的成员：1-递归获取，0-只获取本部门
   */
  @AccessTokenRefresh()
  public static async departmentUserInfo(base: OpenCPWXBase, departmentId: string, fetchChild = 0) {
    const token = await base.getAccessToken()
    const url = util.format(this.departmentUserUrl, token, departmentId, fetchChild)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * userid 转 openid
   * @param base
   * @param userId 获取的部门id
   */
  @AccessTokenRefresh()
  public static async toOpenId(base: OpenCPWXBase, userId: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.userIdToOpenIdUrl, token)
    const data = await this._http.post(url, { userid: userId })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * openid 转 userid
   * @param base
   * @param openId 获取的部门id
   */
  @AccessTokenRefresh()
  public static async toUerId(base: OpenCPWXBase, openId: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.openIdToUserIdUrl, token)
    const data = await this._http.post(url, { openid: openId })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 二次验证
   * @param base
   * @param userId 成员 userId
   */
  @AccessTokenRefresh()
  public static async authSucc(base: OpenCPWXBase, userId: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.authSuccUrl, token, userId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 邀请成员
   * @param base
   * @param users 成员ID列表, 最多支持1000个
   * @param partys 部门ID列表，最多支持100个
   * @param tags 标签ID列表，最多支持100个
   */
  @AccessTokenRefresh()
  public static async batchInvite(base: OpenCPWXBase, users?: Array<string>, partys?: Array<string>, tags?: Array<string>) {
    const token = await base.getAccessToken()
    const url = util.format(this.batchInviteUrl, token)
    const data = await this._http.post(url, { user: users, party: partys, tag: tags })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取加入企业二维码
   * @param base
   * @param sizeType qrcode尺寸类型，1: 171 x 171; 2: 399 x 399; 3: 741 x 741; 4: 2052 x 2052
   */
  @AccessTokenRefresh()
  public static async getJoinQrCode(base: OpenCPWXBase, sizeType = 2) {
    const token = await base.getAccessToken()
    const url = util.format(this.getJoinQrCodeUrl, token, sizeType)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取手机号随机串
   * @param base
   * @param mobile 手机号
   * @param state 企业自定义的state参数
   */
  @AccessTokenRefresh()
  public static async getMobileHashCode(base: OpenCPWXBase, mobile: string, state?: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.getMobileHashCodeUrl, token)
    const data = await this._http.post(url, { mobile: mobile, state: state })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 手机号获取userid
   * @param base
   * @param mobile 手机号
   */
  @AccessTokenRefresh()
  public static async getUserId(base: OpenCPWXBase, mobile: string) {
    const token = await base.getAccessToken()
    const url = util.format(this.getUserIdUrl, token)
    const data = await this._http.post(url, { mobile: mobile })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

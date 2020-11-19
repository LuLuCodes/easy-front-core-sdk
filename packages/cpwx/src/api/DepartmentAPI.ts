import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 通讯录-部门管理接口
 */
export class DepartmentAPI {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=%s'
  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=%s'
  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=%s&id=%s'
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建部门
   * @param cpWXCore
   * @param name 部门名称
   * @param parentId 父部门id，32位整型
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   * @param id 部门id，32位整型，指定时必须大于1
   */
  public static async create(cpWXCore: CPWXCore, name: string, parentId: number, nameEn?: string, order?: number, id?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, {
      name: name,
      name_en: nameEn,
      parentid: parentId,
      order: order,
      id: id,
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
   * 更新部门
   * @param cpWXCore
   * @param id 部门id
   * @param name 部门名称
   * @param parentId 父部门id
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   */
  public static async update(cpWXCore: CPWXCore, id: number, name?: string, parentId?: number, nameEn?: string, order?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      id: id,
      name: name,
      name_en: nameEn,
      parentid: parentId,
      order: order,
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
   * 删除部门
   * @param cpWXCore
   * @param id 部门id
   */
  public static async delete(cpWXCore: CPWXCore, id: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.deleteUrl, token, id)
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
   * 获取部门列表
   * @param cpWXCore
   * @param id 部门id
   */
  public static async get(cpWXCore: CPWXCore, id?: number) {
    const token = await cpWXCore.getAccessToken()
    let url = util.format(this.getUrl, token)
    if (id) {
      url += `&id=${id}`
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
}

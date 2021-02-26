import * as util from 'util'
import { OpenCPWXBase } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'
/**
 * @description 部门管理相关接口
 */
export class OpenCPWXDepartmentAPI {
  private static createUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/create?access_token=%s'
  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/update?access_token=%s'
  private static deleteUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/delete?access_token=%s&id=%s'
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/department/list?access_token=%s&id=%s'
  private static _http = Http.getInstance()

  /**
   * 创建部门
   * @param base
   * @param name 部门名称
   * @param parentId 父部门id，32位整型
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   * @param id 部门id，32位整型，指定时必须大于1
   */
  @AccessTokenRefresh()
  public static async create(base: OpenCPWXBase, name: string, parentId: number, nameEn?: string, order?: number, id?: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.createUrl, token)
    const data = await this._http.post(url, {
      name: name,
      name_en: nameEn,
      parentid: parentId,
      order: order,
      id: id,
    })

    return data
  }

  /**
   * 更新部门
   * @param base
   * @param id 部门id
   * @param name 部门名称
   * @param parentId 父部门id
   * @param nameEn 英文名称
   * @param order 在父部门中的次序值
   */
  @AccessTokenRefresh()
  public static async update(base: OpenCPWXBase, id: number, name?: string, parentId?: number, nameEn?: string, order?: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      id: id,
      name: name,
      name_en: nameEn,
      parentid: parentId,
      order: order,
    })

    return data
  }

  /**
   * 删除部门
   * @param base
   * @param id 部门id
   */
  @AccessTokenRefresh()
  public static async delete(base: OpenCPWXBase, id: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.deleteUrl, token, id)
    const data = await this._http.get(url)

    return data
  }

  /**
   * 获取部门列表
   * @param base
   * @param id 部门id
   */
  @AccessTokenRefresh()
  public static async get(base: OpenCPWXBase, id: number) {
    const token = await base.getAccessToken()
    const url = util.format(this.getUrl, token, id)
    const data = await this._http.get(url)

    return data
  }
}

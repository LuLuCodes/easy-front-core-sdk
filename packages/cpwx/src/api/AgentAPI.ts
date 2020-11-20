import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 应用管理接口
 */
export class AgentAPI {
  private static getAgentUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/get?access_token=%s&agentid=%s'
  private static getAgentListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/list?access_token=%s'
  private static setAgentUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set?access_token=%s'
  private static createUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/create?access_token=%s&agentid=%s'
  private static getUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/get?access_token=%s&agentid=%s'
  private static deleteUrl = 'https://qyapi.weixin.qq.com/cgi-bin/menu/delete?access_token=%s&agentid=%s'

  private static _http = Http.getInstance()
  /**
   * 获取指定的应用详情
   * @param cpWXCore
   * @param agentId 应用id
   */
  public static async getAgent(cpWXCore: CPWXCore, agentId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getAgentUrl, token, agentId)
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
   * 获取access_token对应的应用列表
   * @param cpWXCore
   */
  public static async getAgentList(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getAgentListUrl, token)
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
   * 设置应用
   * @param cpWXCore
   * @param name 企业应用名称，长度不超过32个utf8字符
   * @param description 企业应用详情，长度为4至120个utf8字符
   * @param redirectDomain 企业应用可信域名
   * @param isreportenter 是否上报用户进入应用事件。0：不接收；1：接收
   * @param reportLocationFlag 企业应用是否打开地理位置上报 0：不上报；1：进入会话上报
   * @param logoMediaId 企业应用头像的mediaid
   * @param homeUrl 应用主页url
   */
  public static async setAgent(
    cpWXCore: CPWXCore,
    name?: string,
    description?: string,
    redirectDomain?: string,
    isreportenter = 0,
    reportLocationFlag = 0,
    logoMediaId?: string,
    homeUrl?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.setAgentUrl, token)
    const data = await this._http.post(url, {
      agentid: cpWXCore.getApiConfig().agentId,
      name: name,
      description: description,
      logo_mediaid: logoMediaId,
      report_location_flag: reportLocationFlag,
      redirect_domain: redirectDomain,
      isreportenter: isreportenter,
      home_url: homeUrl,
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
   * 创建菜单
   * @param cpWXCore
   * @param menu 请求数据
   */
  public static async createMenu(cpWXCore: CPWXCore, menu: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createUrl, token, cpWXCore.getApiConfig().agentId)
    const data = await this._http.post(url, menu)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取菜单
   * @param cpWXCore
   */
  public static async getMenu(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token, cpWXCore.getApiConfig().agentId)
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
   * 删除菜单
   * @param cpWXCore
   */
  public static async deleteMenu(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.deleteUrl, token, cpWXCore.getApiConfig().agentId)
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

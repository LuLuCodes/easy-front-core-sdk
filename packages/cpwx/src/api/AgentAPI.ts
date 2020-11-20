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
  private static setWorkbenchTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set_workbench_template?access_token=%s'
  private static getWorkbenchTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/get_workbench_template?access_token=%s'
  private static setWorkbenchDataUrl = 'https://qyapi.weixin.qq.com/cgi-bin/agent/set_workbench_data?access_token=%s'

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

  /**
   * 设置应用在工作台展示的模版
   * @param cpWXCore
   * @param type 模版类型，目前支持的自定义类型包括 “keydata”、 “image”、 “list”、 “webview” 。若设置的type为 “normal”,则相当于从自定义模式切换为普通宫格或者列表展示模式
   * @param keyData 若type指定为 “keydata”，且需要设置企业级别默认数据，则需要设置关键数据型模版数据,数据结构参考“关键数据型”
              └  items 关键数据列表个，不超过4个
                  └  key 关键数据名称，需要设置在模版中
                  └  data 关键数据
                  └  jump_url 点击跳转url，若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
                  └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param image 若type指定为 “image”，且需要设置企业级别默认数据，则需要设置图片型模版数据,数据结构参考“图片型”
              └  url 图片url。图片的最佳比例为3.35:1
              └  jump_url 点击跳转url。若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
              └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param list 若type指定为 “list”，且需要设置企业级别默认数据，则需要设置列表型模版数据,数据结构参考“列表型”
              └  items 关键数据列表个，不超过3个
                  └  title 列表显示文字，不超过128个字节
                  └  jump_url 点击跳转url，若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
                  └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param webview 若type指定为 “webview”，且需要设置企业级别默认数据，则需要设置webview型模版数据,数据结构参考“webview型”
              └  url 渲染展示的url
              └  jump_url 点击跳转url。若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
              └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param replaceUserData 是否覆盖用户工作台的数据。设置为true的时候，会覆盖企业所有用户当前设置的数据。若设置为false,则不会覆盖用户当前设置的所有数据。默认为false
   */
  public static async setWorkbenchTemplate(
    cpWXCore: CPWXCore,
    type: 'keydata' | 'image' | 'list' | 'webview' | 'normal',
    replaceUserData = false,
    keyData?: { items: Array<{ key?: string; data: string; jump_url?: string; pagepath?: string }> },
    image?: { url?: string; jump_url?: string; pagepath?: string },
    list?: { items: Array<{ title: string; jump_url?: string; pagepath?: string }> },
    webview?: { url?: string; jump_url?: string; pagepath?: string }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.setWorkbenchTemplateUrl, token)
    const data = await this._http.post(url, {
      agentid: cpWXCore.getApiConfig().agentId,
      type,
      keydata: keyData,
      image,
      list,
      webview,
      replace_user_data: replaceUserData,
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
   * 获取应用在工作台展示的模版
   * @param cpWXCore
   */
  public static async getWorkbenchTemplate(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getWorkbenchTemplateUrl, token)
    const data = await this._http.post(url, {
      agentid: cpWXCore.getApiConfig().agentId,
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
   * 设置应用在用户工作台展示的数据
   * @param cpWXCore
   * @param userId 需要设置的用户的userid
   * @param type 模版类型，目前支持的自定义类型包括 “keydata”、 “image”、 “list”、 “webview” 。若设置的type为 “normal”,则相当于从自定义模式切换为普通宫格或者列表展示模式
   * @param keyData 若type指定为 “keydata”，且需要设置企业级别默认数据，则需要设置关键数据型模版数据,数据结构参考“关键数据型”
              └  items 关键数据列表个，不超过4个
                  └  key 关键数据名称，需要设置在模版中
                  └  data 关键数据
                  └  jump_url 点击跳转url，若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
                  └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param image 若type指定为 “image”，且需要设置企业级别默认数据，则需要设置图片型模版数据,数据结构参考“图片型”
              └  url 图片url。图片的最佳比例为3.35:1
              └  jump_url 点击跳转url。若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
              └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param list 若type指定为 “list”，且需要设置企业级别默认数据，则需要设置列表型模版数据,数据结构参考“列表型”
              └  items 关键数据列表个，不超过3个
                  └  title 列表显示文字，不超过128个字节
                  └  jump_url 点击跳转url，若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
                  └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   * @param webview 若type指定为 “webview”，且需要设置企业级别默认数据，则需要设置webview型模版数据,数据结构参考“webview型”
              └  url 渲染展示的url
              └  jump_url 点击跳转url。若不填且应用设置了主页url，则跳转到主页url，否则跳到应用会话窗口
              └  pagepath 若应用为小程序类型，该字段填小程序pagepath，若未设置，跳到小程序主页
   */
  public static async setWorkbenchData(
    cpWXCore: CPWXCore,
    userId: string,
    type: 'keydata' | 'image' | 'list' | 'webview' | 'normal',
    keyData?: { items: Array<{ key?: string; data: string; jump_url?: string; pagepath?: string }> },
    image?: { url?: string; jump_url?: string; pagepath?: string },
    list?: { items: Array<{ title: string; jump_url?: string; pagepath?: string }> },
    webview?: { url?: string; jump_url?: string; pagepath?: string }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.setWorkbenchDataUrl, token)
    const data = await this._http.post(url, {
      agentid: cpWXCore.getApiConfig().agentId,
      userid: userId,
      type,
      keydata: keyData,
      image,
      list,
      webview,
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

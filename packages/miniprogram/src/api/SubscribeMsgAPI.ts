import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 小程序订阅消息API
 */
export class SubscribeMsgAPI {
  private static addTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/addtemplate?access_token=%s'
  private static delTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/deltemplate?access_token=%s'
  private static getCategoryUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getcategory?access_token=%s'
  private static getPubTemplateKeyWordsUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getpubtemplatekeywords?access_token=%s&tid=%s'
  private static getPubTemplateTitlesUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/getpubtemplatetitles?access_token=%s&ids=%s&start=%s&limit=%s'
  private static getTemplateUrl: string = 'https://api.weixin.qq.com/wxaapi/newtmpl/gettemplate?access_token=%s'
  private static sendMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 组合模板并添加至帐号下的个人模板库
   * @param mpCore
   * @param tid 模板标题 id
   * @param kidList 开发者自行组合好的模板关键词列表，最多支持5个，最少2个关键词组合
   * @param sceneDesc 服务场景描述，15个字以内
   */
  public static async addTemplate(mpCore: MPCore, tid: string, kidList: Array<Number>, sceneDesc?: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.addTemplateUrl, token)
    const data = await this._http.post(url, {
      tid: tid,
      kidList: kidList,
      sceneDesc: sceneDesc,
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
   * 删除帐号下的个人模板
   * @param mpCore
   * @param priTmplId 要删除的模板id
   */
  public static async delTemplate(mpCore: MPCore, priTmplId: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.delTemplateUrl, token)
    const data = await this._http.post(url, {
      priTmplId: priTmplId,
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
   * 获取小程序账号的类目
   * @param mpCore
   */
  public static async getCategory(mpCore: MPCore) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getCategoryUrl, token)
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
   * 获取模板标题下的关键词列表
   * @param mpCore
   * @param tid 模板标题 id
   */
  public static async getPubTemplateKeyWords(mpCore: MPCore, tid: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getPubTemplateKeyWordsUrl, token, tid)
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
   * 获取帐号所属类目下的公共模板标题
   * @param mpCore
   * @param ids 类目 id
   * @param start 用于分页，表示从 start 开始。从 0 开始计数。
   * @param limit 用于分页，表示拉取 limit 条记录。最大为 30。
   */
  public static async getPubTemplateTitles(mpCore: MPCore, ids: Array<Number>, start = 0, limit = 30) {
    if (start < 0) {
      start = 0
    }
    if (limit < 0 || limit > 30) {
      limit = 30
    }
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getPubTemplateTitlesUrl, token, ids.join(','), start, limit)
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
   * 获取当前帐号下的个人模板列表
   * @param mpCore
   */
  public static async getTemplate(mpCore: MPCore) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getTemplateUrl, token)
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
   * 发送订阅消息
   * @param mpCore
   * @param touser 接收者（用户）的 openid
   * @param templateId 所需下发的订阅模板id
   * @param page 点击模板卡片后的跳转页面
   * @param data 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
   */
  public static async sendSubMessage(mpCore: MPCore, touser: string, templateId: string, page: string, params: any) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.sendMessageUrl, token)
    const data = await this._http.post(url, {
      touser: touser,
      template_id: templateId,
      page: page,
      data: params,
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

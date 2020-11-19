import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

export class TemplateMsgAPI {
  public static sendTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=%s'
  private static setIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_set_industry?access_token=%s'
  private static getIndustryUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_industry?access_token=%s'
  private static getTemplateIdUrl = 'https://api.weixin.qq.com/cgi-bin/template/api_add_template?access_token=%s'
  private static delTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/del_private_template?access_token=%s'
  private static getAllTemplateUrl = 'https://api.weixin.qq.com/cgi-bin/template/get_all_private_template?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 发送模板消息
   * @param wxCore
   * @param tempJson
   */
  public static async send(wxCore: WXCore, tempJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.sendTemplateUrl, token)
    const data = await this._http.post(url, tempJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 设置所属行业
   * @param wxCore
   * @param industry_id1 公众号模板消息所属行业编号
   * @param industry_id2 公众号模板消息所属行业编号
   */
  public static async setIndustry(wxCore: WXCore, industry_id1: string, industry_id2: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setIndustryUrl, token)
    const data = await this._http.post(url, {
      industry_id1: industry_id1,
      industry_id2: industry_id2,
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
   * 获取设置的行业信息
   * @param wxCore
   */
  public static async getIndustry(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getIndustryUrl, token)
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
   * 获取模板ID
   * @param wxCore
   * @param templateIdShort 模板库中模板的编号
   */
  public static async getTemplateId(wxCore: WXCore, templateIdShort: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getTemplateIdUrl, token)
    const data = await this._http.post(url, {
      template_id_short: templateIdShort,
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
   * 删除模板
   * @param wxCore
   */
  public static async delTemplate(wxCore: WXCore, templateId: string) {
    const token = await wxCore.getAccessToken()
    let url = util.format(this.delTemplateUrl, token)
    const data = await this._http.post(url, { template_id: templateId })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取模板列表
   * @param wxCore
   */
  public static async getAllTemplate(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getAllTemplateUrl, token)
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

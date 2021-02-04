import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 会员卡接口
 */
export class MemberCardAPI {
  private static activateUrl: string = 'https://api.weixin.qq.com/card/membercard/activate?access_token=%s'
  private static setActivateUserFormUrl: string = 'https://api.weixin.qq.com/card/membercard/activateuserform/set?access_token=%s'
  private static getActivateTempInfoUrl: string = 'https://api.weixin.qq.com/card/membercard/activatetempinfo/get?access_token=%s'
  private static updateUserUrl: string = 'https://api.weixin.qq.com/card/membercard/updateuser?access_token=%s'
  private static getUserInfoUrl: string = 'https://api.weixin.qq.com/card/membercard/userinfo/get?access_token=%s'
  private static payGiftCardAddUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/add?access_token=%s'
  private static payGiftCardDelUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/delete?access_token=%s'
  private static payGiftCardGetUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/getbyid?access_token=%s'
  private static payGiftCardBatchGetUrl: string = 'https://api.weixin.qq.com/card/paygiftcard/batchget?access_token=%s'
  private static getMemberCardInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardmembercardinfo?access_token=%s'
  private static getMemberCardDetailUrl: string = 'https://api.weixin.qq.com/datacube/getcardmembercarddetail?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 接口激活
   * @param wxCore
   * @param cardJson
   */
  public static async activate(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.activateUrl, token)

    const data = await this._http.post(url, cardJson)
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
   * 普通一键激活-设置开卡字段接口
   * @param wxCore
   * @param cardJson
   */
  public static async setActivateUserForm(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setActivateUserFormUrl, token)

    const data = await this._http.post(url, cardJson)
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
   * 跳转型一键激活 获取用户提交资料
   * @param wxCore
   * @param activateTicket
   */
  public static async getActivateTempInfo(wxCore: WXCore, activateTicket: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getActivateTempInfoUrl, token)

    const data = await this._http.post(url, {
      activate_ticket: activateTicket,
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
   * 更新会员信息
   * @param wxCore
   * @param cardJson
   */
  public static async updateUser(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateUserUrl, token)
    const data = await this._http.post(url, cardJson)
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
   * 拉取会员信息（积分查询）接口
   * @param wxCore
   * @param cardId
   * @param code
   */
  public static async getUserInfo(wxCore: WXCore, cardId: string, code: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getUserInfoUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      code: code,
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
   * 设置支付后投放卡券接口
   * @param wxCore
   * @param cardJson
   */
  public static async payGiftCardAdd(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.payGiftCardAddUrl, token)
    const data = await this._http.post(url, cardJson)
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
   * 删除支付后投放卡券规则接口
   * @param wxCore
   * @param ruleId
   */
  public static async payGiftCardDel(wxCore: WXCore, ruleId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.payGiftCardDelUrl, token)
    const data = await this._http.post(url, {
      rule_id: ruleId,
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
   * 查询支付后投放卡券规则详情接口
   * @param wxCore
   * @param ruleId
   */
  public static async payGiftCardGet(wxCore: WXCore, ruleId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.payGiftCardGetUrl, token)
    const data = await this._http.post(url, {
      rule_id: ruleId,
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
   * 批量查询支付后投放卡券规则接口
   * @param wxCore
   * @param effective
   * @param offset
   * @param count
   * @param type
   */
  public static async payGiftCardBatchGet(wxCore: WXCore, effective: boolean, offset: number, count: number, type: string = 'RULE_TYPE_PAY_MEMBER_CARD') {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.payGiftCardBatchGetUrl, token)
    const data = await this._http.post(url, {
      type: type,
      effective: effective,
      offset: offset,
      count: count,
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
   * 拉取会员卡概况数据接口
   * @param wxCore
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
   */
  public static async getMemberCardInfo(wxCore: WXCore, beginDate: string, endDate: string, condSource: number = 0) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMemberCardInfoUrl, token)
    const data = await this._http.post(url, {
      begin_date: beginDate,
      end_date: endDate,
      cond_source: condSource,
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
   * 拉取单张会员卡数据接口
   * @param wxCore
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param cardId 卡券id
   */
  public static async getMemberCardDetail(wxCore: WXCore, beginDate: string, endDate: string, cardId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMemberCardDetailUrl, token)
    const data = await this._http.post(url, {
      begin_date: beginDate,
      end_date: endDate,
      card_id: cardId,
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

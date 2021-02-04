import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 微信卡券接口
 */
export class CardAPI {
  private static cardCreateUrl: string = 'https://api.weixin.qq.com/card/create?access_token=%s'
  private static setPayCellUrl: string = 'https://api.weixin.qq.com/card/paycell/set?access_token=%s'
  private static setSelfConsumeCellUrl: string = 'https://api.weixin.qq.com/card/selfconsumecell/set?access_token=%s'
  private static createQrcodeCardUrl: string = 'https://api.weixin.qq.com/card/qrcode/create?access_token=%s'
  private static createLandingPageCardUrl: string = 'https://api.weixin.qq.com/card/landingpage/create?access_token=%s'
  private static getHtmlMpNewsUrl: string = 'https://api.weixin.qq.com/card/mpnews/gethtml?access_token=%s'
  private static setTestWhiteListUrl: string = 'https://api.weixin.qq.com/card/testwhitelist/set?access_token=%s'
  private static getCodeUrl: string = 'https://api.weixin.qq.com/card/code/get?access_token=%s'
  private static consumeCodeUrl: string = 'https://api.weixin.qq.com/card/code/consume?access_token=%s'
  private static decryptCodeUrl: string = 'https://api.weixin.qq.com/card/code/decrypt?access_token=%s'
  private static setDepositUrl: string = 'http://api.weixin.qq.com/card/code/deposit?access_token=%s'
  private static getDepositCountUrl: string = 'http://api.weixin.qq.com/card/code/getdepositcount?access_token=%s'
  private static checkCodeUrl: string = 'http://api.weixin.qq.com/card/code/checkcode?access_token=%s'
  private static getUserCardListUrl: string = 'https://api.weixin.qq.com/card/user/getcardlist?access_token=%s'
  private static getCardUrl: string = 'https://api.weixin.qq.com/card/get?access_token=%s'
  private static getBatchUrl: string = 'https://api.weixin.qq.com/card/batchget?access_token=%s'
  private static updateUrl: string = 'https://api.weixin.qq.com/card/update?access_token=%s'
  private static modifyStockUrl: string = 'https://api.weixin.qq.com/card/modifystock?access_token=%s'
  private static updateCodeUrl: string = 'https://api.weixin.qq.com/card/code/update?access_token='
  private static deleteUrl: string = 'https://api.weixin.qq.com/card/delete?access_token=%s'
  private static unavailableUrl: string = 'https://api.weixin.qq.com/card/code/unavailable?access_token=%s'
  private static getCardBizUinInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardbizuininfo?access_token=%s'
  private static getFreeCardInfoUrl: string = 'https://api.weixin.qq.com/datacube/getcardcardinfo?access_token=%s'
  private static subMerchantSubmitUrl: string = 'https://api.weixin.qq.com/card/submerchant/submit?access_token=%s'
  private static subMerchantUpdateUrl: string = 'https://api.weixin.qq.com/card/submerchant/update?access_token=%s'
  private static getSubMerchantUrl: string = 'https://api.weixin.qq.com/card/submerchant/get?access_token=%s'
  private static batchGetSubMerchantUrl: string = 'https://api.weixin.qq.com/card/submerchant/batchget?access_token=%s'
  private static getApplyProtocolUrl: string = 'https://api.weixin.qq.com/card/getapplyprotocol?access_token=%s'

  private static _http = Http.getInstance()
  /**
   * 创建会员卡接口
   * @param wxCore
   * @param cardJson
   */
  public static async create(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.cardCreateUrl, token)
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
   * 设置买单接口
   * @param wxCore
   * @param cardId
   * @param isOpen
   */
  public static async setPayCell(wxCore: WXCore, cardId: string, isOpen: boolean) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setPayCellUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      is_open: isOpen,
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
   * 设置自助核销接口
   * @param wxCore
   * @param cardId  卡券ID
   * @param isOpen  是否开启自助核销功能，填true/false，默认为false
   * @param needVerifyCod 用户核销时是否需要输入验证码， 填true/false， 默认为false
   * @param needRemarkAmount 用户核销时是否需要备注核销金额， 填true/false， 默认为false
   */
  public static async setSelfConsumeCell(wxCore: WXCore, cardId: string, isOpen: boolean = false, needVerifyCod: boolean = false, needRemarkAmount: boolean = false) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setSelfConsumeCellUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      is_open: isOpen,
      need_verify_cod: needVerifyCod,
      need_remark_amount: needRemarkAmount,
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
   * 创建二维码接口
   * @param wxCore
   * @param cardJson
   */
  public static async createQrcodeCard(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createQrcodeCardUrl, token)
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
   * 创建货架接口
   * @param wxCore
   * @param cardJson
   */
  public static async createLandingPageCard(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createLandingPageCardUrl, token)
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
   * 图文消息群发卡券
   * @param wxCore
   * @param cardId
   */
  public static async getHtmlMpNews(wxCore: WXCore, cardId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getHtmlMpNewsUrl, token)
    const data = await this._http.post(url, {
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

  /**
   * 设置测试白名单
   * @param wxCore
   * @param infoJson
   */
  public static async setTestWhiteList(wxCore: WXCore, infoJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setTestWhiteListUrl, token)
    const data = await this._http.post(url, infoJson)
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
   * 查询Code接口
   * @param wxCore
   * @param code 单张卡券的唯一标准
   * @param cardId 卡券ID代表一类卡券。自定义code卡券必填。
   * @param checkConsume 是否校验code核销状态
   */
  public static async getCode(wxCore: WXCore, code: string, cardId?: string, checkConsume?: boolean) {
    let map = new Map()
    map.set('code', code)
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (checkConsume) {
      map.set('check_consume', checkConsume)
    }

    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCodeUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 核销Code接口
   * @param wxCore
   * @param code 需核销的Code码
   * @param cardId 卡券ID。创建卡券时use_custom_code填写true时必填。非自定义Code不必填写。
   */
  public static async consumeCode(wxCore: WXCore, code: string, cardId?: string) {
    let map = new Map()
    map.set('code', code)
    if (cardId) {
      map.set('card_id', cardId)
    }
    const token = await wxCore.getAccessToken()
    const url = util.format(this.consumeCodeUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 线上核销Code接口
   * @param wxCore
   * @param code 需核销的Code码
   * @param openid 当前卡券使用者的openid，通常通过网页授权登录或自定义url跳转参数获得。
   */
  public static async consumeCodeOnline(wxCore: WXCore, code: string, openid: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.consumeCodeUrl, token)
    const data = await this._http.post(url, {
      code: code,
      openid: openid,
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
   * Code解码接口
   * @param wxCore
   * @param encryptCode 经过加密的Code码
   */
  public static async decryptCode(wxCore: WXCore, encryptCode: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.decryptCodeUrl, token)
    const data = await this._http.post(url, {
      encrypt_code: encryptCode,
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
   * 导入自定义code
   * @param wxCore
   * @param cardId  需要进行导入code的卡券ID
   * @param codeList 需导入微信卡券后台的自定义code，上限为100个。
   */
  public static async setDeposit(wxCore: WXCore, cardId: string, codeList: []) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.setDepositUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      code: codeList,
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
   * 查询导入code数目接口
   * @param wxCore
   * @param cardId
   */
  public static async getDepositCount(wxCore: WXCore, cardId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getDepositCountUrl, token)
    const data = await this._http.post(url, {
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

  /**
   * 核查code接口
   * @param wxCore
   * @param cardId 进行导入code的卡券ID
   * @param codeList 已经微信卡券后台的自定义code，上限为100个
   */
  public static async checkCode(wxCore: WXCore, cardId: string, codeList: []) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.checkCodeUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      code: codeList,
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
   * 获取用户已领取卡券接口
   * @param wxCore
   * @param openid 需要查询的用户openid
   * @param cardId 卡券ID 不填写时默认查询当前appid下的卡券
   */
  public static async getUserCardList(wxCore: WXCore, openid: string, cardId?: string) {
    let map = new Map()
    map.set('openid', openid)
    if (cardId) {
      map.set('card_id', cardId)
    }
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getUserCardListUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 查看卡券详情
   * @param wxCore
   * @param cardId 卡券ID
   */
  public static async getCard(wxCore: WXCore, cardId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCardUrl, token)

    const data = await this._http.post(url, {
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

  /**
   * 批量查询卡券列表
   * @param wxCore
   * @param offset 查询卡列表的起始偏移量，从0开始，即offset: 5是指从从列表里的第六个开始读取
   * @param count 需要查询的卡片的数量（数量最大50）
   * @param statusList  支持开发者拉出指定状态的卡券列表
   *
   * “CARD_STATUS_NOT_VERIFY”, 待审核 ；
   * “CARD_STATUS_VERIFY_FAIL”, 审核失败；
   * “CARD_STATUS_VERIFY_OK”， 通过审核；
   * “CARD_STATUS_DELETE”， 卡券被商户删除；
   * “CARD_STATUS_DISPATCH”，在公众平台投放过的卡券
   */
  public static async getBatch(wxCore: WXCore, offset: number, count: number, statusList?: []) {
    let map = new Map()
    map.set('offset', offset)
    map.set('count', count)
    if (statusList) {
      map.set('status_list', statusList)
    }

    const token = await wxCore.getAccessToken()
    const url = util.format(this.getBatchUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 更改卡券信息接口
   * @param wxCore
   * @param cardJson
   */
  public static async update(wxCore: WXCore, cardJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
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
   * 修改库存接口
   * @param wxCore
   * @param cardId 卡券ID
   * @param increase 增加多少库存，支持不填或填0
   * @param reduce 减少多少库存，可以不填或填0
   */
  public static async modifyStock(wxCore: WXCore, cardId: string, increase: number = 0, reduce: number = 0) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.modifyStockUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      increase_stock_value: increase,
      reduce_stock_value: reduce,
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
   * 更改Code接口
   * @param wxCore
   * @param code 需变更的Code码
   * @param newCode 变更后的有效Code码
   * @param cardId 卡券ID。自定义Code码卡券为必填
   */
  public static async updateCode(wxCore: WXCore, code: string, newCode: string, cardId?: string) {
    let map = new Map()
    map.set('code', code)
    map.set('new_code', newCode)
    if (cardId) {
      map.set('card_id', cardId)
    }
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateCodeUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 删除卡券接口
   * @param wxCore
   * @param cardId 卡券ID
   */
  public static async delete(wxCore: WXCore, cardId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.deleteUrl, token)
    const data = await this._http.post(url, {
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

  /**
   * 设置卡券失效接口
   * @param wxCore
   * @param cardId 卡券ID
   * @param code 设置失效的Code码
   * @param reason 失效理由
   */
  public static async unavailable(wxCore: WXCore, cardId?: string, code?: string, reason?: string) {
    if (!code && !cardId) {
      throw new Error('code 与 card_id 不能同时为空')
    }
    let map = new Map()
    if (code) {
      map.set('code', code)
    }
    if (cardId) {
      map.set('card_id', cardId)
    }
    if (reason) {
      map.set('reason', reason)
    }

    const token = await wxCore.getAccessToken()
    const url = util.format(this.unavailableUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 拉取卡券概况数据接口
   * @param wxCore
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据 、1是API创建的卡券数据
   */
  public static async getCardBizUinInfo(wxCore: WXCore, beginDate: string, endDate: string, condSource: number = 0) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCardBizUinInfoUrl, token)
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
   * 获取免费券数据接口
   * @param wxCore
   * @param beginDate 查询数据的起始时间
   * @param endDate 查询数据的截至时间
   * @param condSource 卡券来源，0为公众平台创建的卡券数据、1是API创建的卡券数据
   * @param cardId 卡券ID 填写后，指定拉出该卡券的相关数据
   */
  public static async getFreeCardInfo(wxCore: WXCore, beginDate: string, endDate: string, condSource: number = 0, cardId?: string) {
    let map = new Map()
    map.set('begin_date', beginDate)
    map.set('end_date', endDate)
    map.set('cond_source', condSource)
    if (cardId) {
      map.set('card_id', cardId)
    }

    const token = await wxCore.getAccessToken()
    const url = util.format(this.getFreeCardInfoUrl, token)
    const data = await this._http.post(url, JSON.stringify(map))
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
   * 创建子商户接口
   * @param wxCore
   * @param merchant
   */
  public static async subMerchantSubmit(wxCore: WXCore, merchant: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.subMerchantSubmitUrl, token)
    const data = await this._http.post(url, merchant)
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
   * 更新子商户接口
   * @param wxCore
   * @param merchant
   */
  public static async subMerchantUpdate(wxCore: WXCore, merchant: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.subMerchantUpdateUrl, token)
    const data = await this._http.post(url, merchant)
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
   * 拉取单个子商户信息接口
   * @param wxCore
   * @param merchantId
   */
  public static async getSubMerchant(wxCore: WXCore, merchantId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getSubMerchantUrl, token)
    const data = await this._http.post(url, {
      merchant_id: merchantId,
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
   * 批量拉取子商户信息接口
   * @param wxCore
   * @param beginId     起始的子商户id
   * @param limit       拉取的子商户的个数，最大值为100
   * @param status      子商户审核状态，填入后，只会拉出当前状态的子商户
   */
  public static async batchGetSubMerchant(wxCore: WXCore, beginId: string, limit: number, status: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchGetSubMerchantUrl, token)
    const data = await this._http.post(url, {
      begin_id: beginId,
      limit: limit > 100 ? 100 : limit,
      status: status,
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
   * 卡券开放类目查询接口
   * @param wxCore
   */
  public static async getApplyProtocol(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getApplyProtocolUrl, token)
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
}

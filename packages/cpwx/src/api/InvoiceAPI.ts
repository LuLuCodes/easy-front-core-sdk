import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 电子发票相关接口
 */
export class InvoiceAPI {
  private static getUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/getinvoiceinfo?access_token=%s'
  private static updateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/updateinvoicestatus?access_token=%s'
  private static batchUpdateUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/updatestatusbatch?access_token=%s'
  private static batchGetUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/card/invoice/reimburse/getinvoiceinfobatch?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 查询电子发票
   * @param cpWXCore
   * @param cardId 发票id
   * @param encryptCode 加密code
   */
  public static async get(cpWXCore: CPWXCore, cardId: string, encryptCode: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
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
   * 更新发票状态
   * @param cpWXCore
   * @param cardId 发票id
   * @param encryptCode 加密code
   * @param reimburseStatus 发报销状态 INVOICE_REIMBURSE_INIT:发票初始状态，未锁定; INVOICE_REIMBURSE_LOCK:发票已锁定，无法重复提交报销;INVOICE_REIMBURSE_CLOSURE:发票已核销，从用户卡包中移除
   */
  public static async update(cpWXCore: CPWXCore, cardId: string, encryptCode: string, reimburseStatus: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateUrl, token)
    const data = await this._http.post(url, {
      card_id: cardId,
      encrypt_code: encryptCode,
      reimburse_status: reimburseStatus,
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
   * 批量更新发票状态
   * @param cpWXCore
   * @param openId 用户 openId
   * @param reimburseStatus 发报销状态 INVOICE_REIMBURSE_INIT:发票初始状态，未锁定; INVOICE_REIMBURSE_LOCK:发票已锁定，无法重复提交报销;INVOICE_REIMBURSE_CLOSURE:发票已核销，从用户卡包中移除
   * @param invoiceList 发票列表
              └  card_id 发票卡券的card_id
              └  encrypt_code 发票卡券的加密code，和card_id共同构成一张发票卡券的唯一标识
   */
  public static async batchUpdate(cpWXCore: CPWXCore, openId: string, reimburseStatus: string, invoiceList: Array<{ card_id: string; encrypt_code }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchUpdateUrl, token)
    const data = await this._http.post(url, {
      openid: openId,
      reimburse_status: reimburseStatus,
      invoice_list: invoiceList,
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
   * 批量查询电子发票
   * @param cpWXCore
   * @param itemList 发票列表
              └  card_id 发票id
              └  encrypt_code 加密code
   */
  public static async batchGet(cpWXCore: CPWXCore, itemList: Array<{ card_id: string; encrypt_code }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchGetUrl, token)
    const data = await this._http.post(url, {
      item_list: itemList,
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

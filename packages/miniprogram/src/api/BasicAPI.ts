import * as util from 'util'
import { MPCore } from '../MPCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * 小程序基础接口
 */
export class BasicAPI {
  private static code2SessionUrl: string = 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  private static getPaidUnionidByTransactionIdUrl: string = 'https://api.weixin.qq.com/wxa/getpaidunionid?access_token=%s&openid=%s&transaction_id=%s'
  private static getPaidUnionidByMchIdUrl: string = 'https://api.weixin.qq.com/wxa/getpaidunionid?access_token=%s&openid=%s&mch_id=%s&out_trade_no=%s'

  private static _http = Http.getInstance()

  /**
   * 登录凭证校验
   * @param mpCore
   * @param appId 小程序 appId
   * @param secret 小程序 appSecret
   * @param jsCode 登录时获取的 code
   */
  public static async code2Session(mpCore: MPCore, jsCode: string) {
    const { appId, appScrect } = mpCore.getApiConfig()
    const url = util.format(this.code2SessionUrl, appId, appScrect, jsCode)
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
   * 用户支付完成后，获取该用户的 UnionId，无需用户授权(微信支付订单号)
   * @param mpCore
   * @param openId 支付用户唯一标识
   * @param transactionId 微信支付订单号
   */
  public static async getPaidUnionidByTransactionId(mpCore: MPCore, openId: string, transactionId: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getPaidUnionidByTransactionIdUrl, token, openId, transactionId)
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
   * 用户支付完成后，获取该用户的 UnionId，无需用户授权(微信支付商户订单号和微信支付商户号)
   * @param mpCore
   * @param openId 支付用户唯一标识
   * @param mchId 微信支付商户号
   * @param outTradeNo 微信支付商户订单号
   */
  public static async getPaidUnionidByMchId(mpCore: MPCore, openId: string, mchId: string, outTradeNo: string) {
    const token = await mpCore.getAccessToken()
    const url = util.format(this.getPaidUnionidByMchIdUrl, token, openId, mchId, outTradeNo)
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

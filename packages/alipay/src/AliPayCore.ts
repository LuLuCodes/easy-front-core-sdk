import * as fs from 'fs'
import * as moment from 'moment'
import * as urlencode from 'urlencode'
import { Kit, Cryptogram, Http } from '@easy-front-core-sdk/kits'
import { GateWay, MethodType, GoodsType, SignType, Algorithm, NormalResponseCode } from './Enums'

/**应用配置
 * @param appId         应用ID
 * @param appPrivKey     应用私钥
 * @param alipayPubKey    支付宝公钥
 * @param appPrivKeyFile     应用私钥文件路径
 * @param alipayPubKeyFile    支付宝公钥文件路径
 * @param gatewayUrl      接口网关地址
 */
export interface IApiConfig {
  appId: string // 应用ID
  appPrivKey?: string // 应用私钥
  alipayPubKey?: string // 支付宝公钥
  appPrivKeyFile?: string // 应用私钥文件路径
  alipayPubKeyFile?: string // 支付宝公钥文件路径
  gatewayUrl?: GateWay // 接口网关地址
}

/**创建订单参数
 * @param body         对一笔交易的具体描述信息
 * @param subject     商品的标题/交易标题/订单标题/订单关键字等
 * @param out_trade_no    商户网站唯一订单号
 * @param total_amount     订单总金额，单位为元
 * @param timeout_express    该笔订单允许的最晚付款时间，逾期将关闭交易
 * @param time_expire      绝对超时时间，格式为yyyy-MM-dd HH:mm
 * @param auth_token      针对用户授权接口，获取用户相关数据时，用于标识用户授权关系
 * @param product_code      销售产品码
 * @param goods_type      商品主类型
 * @param passback_params     公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数
 * @param promo_params      优惠参数注：仅与支付宝协商后可用
 * @param extend_params     业务扩展参数
 * @param enable_pay_channels     可用渠道
 * @param disable_pay_channels      禁用渠道
 * @param quit_url      添加该参数后在h5支付收银台会出现返回按钮，可用于用户付款中途退出并返回到该参数指定的商户网站地址
 * @param store_id      商户门店编号
 * @param ext_user_info     外部指定买家
 */
export interface CreateOrderParams {
  body?: string
  subject: string
  out_trade_no: string
  total_amount: string | number
  timeout_express?: string
  time_expire?: string
  auth_token?: string
  product_code?: string
  goods_type?: GoodsType
  passback_params?: string
  promo_params?: string
  extend_params?: string
  enable_pay_channels?: string
  disable_pay_channels?: string
  quit_url?: string
  store_id?: string
  ext_user_info?: string
}

/**支付宝接口公共请求参数
 * @param app_id         支付宝分配给开发者的应用ID
 * @param method     接口名称
 * @param format    仅支持JSON
 * @param return_url     HTTP/HTTPS开头字符串
 * @param charset    请求使用的编码格式，如utf-8,gbk,gb2312等
 * @param sign_type      商户生成签名字符串所使用的签名算法类型
 * @param sign      商户请求参数的签名串
 * @param timestamp      发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"
 * @param version      调用的接口版本，固定为：1.0
 * @param notify_url     支付宝服务器主动通知商户服务器里指定的页面http/https路径。
 * @param biz_content      业务请求参数的集合，最大长度不限
 */
export interface PublicParams {
  app_id?: string
  method?: MethodType
  format?: string
  return_url?: string
  charset?: string
  sign_type?: SignType
  sign?: string
  timestamp?: string
  version?: string
  notify_url?: string
  biz_content?: string
}

export type APIParams = CreateOrderParams

export const ResponseMessage = {
  0: '请求成功',
  '-1': '异常',
  '-2': '签名错误',
  10000: '接口调用成功',
  20000: '服务不可用',
  20001: '授权权限不足',
  40001: '缺少必选参数',
  40002: '非法的参数',
  40004: '业务处理失败',
  40006: '权限不足',

  // 支付结果信息
  9000: '订单支付成功',
  8000: '正在处理中，支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
  4000: '订单支付失败',
  5000: '重复请求',
  6001: '用户中途取消',
  6002: '网络连接出错',
  6004: '支付结果未知（有可能已经支付成功），请查询商户订单列表中订单的支付状态',
}

export class AliPayCoreCoreFactory {
  private static CORE_MAP: Map<string, AliPayCore> = new Map<string, AliPayCore>()

  public static putCore(apiConfig: IApiConfig) {
    let alipayCore: AliPayCore = this.CORE_MAP.get(apiConfig.appId)
    if (alipayCore) {
      return alipayCore
    }
    alipayCore = new AliPayCore(apiConfig)
    this.CORE_MAP.set(apiConfig.appId, alipayCore)
    return alipayCore
  }

  public static getCore(appId: string) {
    let alipayCore: AliPayCore = this.CORE_MAP.get(appId)
    if (!alipayCore) {
      throw new Error('需事先调用 AliPayCoreCoreFactory.putCore(apiConfig: IApiConfig) 将 appId 对应的 config 对象存入后,才可以使用 AliPayCoreCoreFactory.getCore方法')
    }
    return alipayCore
  }

  public static removeCore(appId: string): boolean {
    return this.CORE_MAP.delete(appId)
  }
}

export class AliPayCore {
  private _apiConfig = null
  private _http = Http.getInstance()
  constructor(apiConfig: IApiConfig) {
    this._apiConfig = apiConfig
    if (this._apiConfig.appPrivKeyFile) {
      this._apiConfig.appPrivKey = fs.readFileSync(this._apiConfig.appPrivKeyFile)
    }
    if (this._apiConfig.alipayPubKeyFile) {
      this._apiConfig.alipayPubKey = fs.readFileSync(this._apiConfig.alipayPubKeyFile)
    }
  }

  private validateBasicParams(method: MethodType, publicParams: PublicParams): PublicParams {
    return {
      app_id: this._apiConfig.appId,
      method,
      format: 'JSON',
      return_url: publicParams.return_url,
      charset: publicParams.charset || 'utf-8',
      sign_type: publicParams.sign_type || SignType.RSA2,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      version: '1.0',
      notify_url: publicParams.notify_url,
      sign: '',
      biz_content: '',
    }
  }

  private getSignAlgorithm(signType: SignType): Algorithm {
    return Algorithm[signType]
  }

  private makeSign(privKey: string, params: PublicParams) {
    const signStr = Kit.makeSortStr(params, ['sign'])
    const algorithm = this.getSignAlgorithm(params.sign_type)
    if (algorithm === Algorithm.RSA2) {
      return Cryptogram.sha256WithRsaByEncode(signStr, privKey, params.charset)
    }
    if (algorithm === Algorithm.RSA) {
      return Cryptogram.sha1WithRsaByEncode(signStr, privKey, params.charset)
    }
  }

  private validateParams(method: MethodType, apiParams: APIParams, publicParams: PublicParams) {
    const validateBasicParams: PublicParams = this.validateBasicParams(method, publicParams)
    validateBasicParams.biz_content = JSON.stringify(apiParams)
    validateBasicParams.sign = this.makeSign(this._apiConfig.appPrivKey, validateBasicParams)
    return validateBasicParams
  }

  public createAppOrder(apiParams: CreateOrderParams, publicParams?: PublicParams): object {
    const params = this.validateParams(MethodType.CREATE_APP_ORDER, apiParams, publicParams)
    const { sign } = params
    const signStr = Kit.makeSortStr(params, ['sign'])
    const value = signStr
      .split('&')
      .reduce((acc, cur) => {
        const [k, v] = cur.split('=')
        return `${acc + k}=${encodeURIComponent(v)}&`
      }, '')
      .slice(0, -1)

    const data = `${value}&sign=${encodeURIComponent(sign)}`
    return { code: NormalResponseCode.OK, message: ResponseMessage[NormalResponseCode.OK], data }
  }
}

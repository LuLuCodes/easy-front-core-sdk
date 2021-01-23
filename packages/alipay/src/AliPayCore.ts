import * as fs from 'fs'
import * as moment from 'moment'
import { Kit, Cryptogram, Http } from '@easy-front-core-sdk/kits'
import { GateWay, MethodType, GoodsType, SignType, Algorithm, NormalResponseCode } from './Enums'

/**应用配置
 * @param appId         应用ID
 * @param appPrivKey     应用私钥
 * @param appPrivKeyFile     应用私钥文件路径
 * @param appPubKey    应用公钥
 * @param appPubKeyFile    应用公钥文件路径
 * @param alipayPubKey    支付宝公钥
 * @param alipayPubKeyFile    支付宝公钥文件路径
 * @param alipayRootCert    支付宝根证书
 * @param alipayRootCertFile    支付宝根证书路径
 * @param appCertSn   应用公钥证书 SN
 * @param appRootCertSn   支付宝根证书 SN
 * @param gatewayUrl      接口网关地址
 */
export interface IApiConfig {
  appId: string // 应用ID
  appPrivKey?: string // 应用私钥
  appPrivKeyFile?: string // 应用私钥文件路径
  appPubKey?: string // 应用公钥
  appPubKeyFile?: string // 应用公钥文件路径
  alipayPubKey?: string // 支付宝公钥
  alipayPubKeyFile?: string // 支付宝公钥文件路径
  alipayRootCert?: string // 支付宝根证书
  alipayRootCertFile?: string // 支付宝根证书路径
  appCertSn?: string // 应用公钥证书 SN
  alipayRootCertSn?: string // 支付宝根证书 SN
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
  charset?: 'utf8' | 'ascii' | 'latin1'
  sign_type?: SignType
  sign?: string
  timestamp?: string
  version?: string
  notify_url?: string
  biz_content?: string
  app_cert_sn?: string
  alipay_root_cert_sn?: string
}

/**查询订单参数
 * @param out_trade_no         订单支付时传入的商户订单号,和支付宝交易号不能同时为空
 * @param trade_no     支付宝交易号，和商户订单号不能同时为空
 * @param org_pid    银行间联模式下有用，其它场景请不要使用
 */
export interface QueryOrderParams {
  out_trade_no?: string
  trade_no?: string
  org_pid?: string
}

/**取消订单
 * @param out_trade_no         订单支付时传入的商户订单号,和支付宝交易号不能同时为空
 * @param trade_no     支付宝交易号，和商户订单号不能同时为空
 */
export interface CancelOrderParams {
  out_trade_no?: string // 订单支付时传入的商户订单号,和支付宝交易号不能同时为空
  trade_no?: string // 支付宝交易号，和商户订单号不能同时为空
}

/**异步通知参数
 * @param notify_time     通知的发送时间。格式为yyyy-MM-dd HH:mm:ss
 * @param notify_type     通知的类型
 * @param notify_id       通知校验ID
 * @param app_id          支付宝分配给开发者的应用Id
 * @param charset         编码格式，如utf-8、gbk、gb2312等
 * @param version         调用的接口版本，固定为：1.0
 * @param sign_type       签名类型
 * @param trade_no        支付宝交易凭证号
 * @param out_trade_no    原支付请求的商户订单号
 * @param sign            签名
 * @param [key: string]   可选参数
 */
export interface NotifyParams {
  notify_time: string
  notify_type: string
  notify_id: string
  app_id: string
  charset: string
  version: string
  sign_type: SignType
  trade_no: string
  out_trade_no: string
  sign: string
  [key: string]: string | number
}

/**统一收单交易关闭接口
 * @param out_trade_no     订单支付时传入的商户订单号,和支付宝交易号不能同时为空
 * @param trade_no     支付宝交易号，和商户订单号不能同时为空
 * @param operator_id       卖家端自定义的的操作员 ID
 */
export interface TradeCloseParams {
  out_trade_no?: string
  trade_no?: string
  operator_id?: string
}

/**统一收单交易退款接口
 * @param out_trade_no        订单支付时传入的商户订单号,和支付宝交易号不能同时为空
 * @param trade_no            支付宝交易号，和商户订单号不能同时为空
 * @param refund_amount       需要退款的金额
 * @param refund_currency     订单退款币种信息
 * @param refund_reason       退款的原因说明
 * @param out_request_no      标识一次退款请求
 * @param operator_id         商户的操作员编号
 * @param store_id            商户的门店编号
 * @param terminal_id         商户的终端编号
 * @param goods_detail        退款包含的商品列表信息
 * @param refund_royalty_parameters     退分账明细信息
 * @param org_pid             银行间联模式下有用，其它场景请不要使用
 */
export interface TradeRefundParams {
  out_trade_no?: string
  trade_no?: string
  refund_amount?: number
  refund_currency?: string
  refund_reason?: string
  out_request_no?: string
  operator_id?: string
  store_id?: string
  terminal_id?: string
  goods_detail?: Map<string, string | number>[]
  refund_royalty_parameters?: Map<string, string | number>[]
  org_pid?: string
}

/**统一收单交易退款查询
 * @param out_trade_no        订单支付时传入的商户订单号,和支付宝交易号不能同时为空
 * @param trade_no            支付宝交易号，和商户订单号不能同时为空
 * @param out_request_no      请求退款接口时，传入的退款请求号
 * @param org_pid             银行间联模式下有用，其它场景请不要使用
 */
export interface TradeRefundQueryParams {
  out_trade_no?: string
  trade_no?: string
  out_request_no: string
  org_pid?: string
}

/**查询对账单下载地址
 * @param bill_type        账单类型
 * @param bill_date        账单时间
 */
export interface BillQueryParams {
  bill_type: string // 账单类型
  bill_date: string // 账单时间
}

/**交易预创建接口
 * @param out_trade_no        商户订单号
 * @param seller_id           卖家支付宝用户ID
 * @param total_amount        订单总金额
 * @param discountable_amount     可打折金额
 * @param subject             订单标题
 * @param goods_detail        订单包含的商品列表信息
 * @param body                对交易或商品的描述
 * @param operator_id         商户操作员编号
 * @param store_id            商户门店编号
 * @param disable_pay_channels    禁用渠道
 * @param enable_pay_channels     可用渠道，用户只能在指定渠道范围内支付
 * @param terminal_id         商户机具终端编号
 * @param extend_params       业务扩展参数
 * @param timeout_express     该笔订单允许的最晚付款时间
 * @param settle_info         描述结算信息
 * @param merchant_order_no   商户原始订单号
 * @param business_params     商户传入业务信息
 * @param qr_code_timeout_express     该笔订单允许的最晚付款时间
 */
export interface TradePrecreateParams {
  out_trade_no: string
  seller_id?: string
  total_amount: number
  discountable_amount?: number
  subject: string
  goods_detail?: Map<string, string | number>[]
  body?: string
  operator_id?: string
  store_id?: string
  disable_pay_channels?: string
  enable_pay_channels?: string
  terminal_id?: string
  extend_params?: string
  timeout_express?: string
  settle_info?: any
  merchant_order_no?: string
  business_params?: string
  qr_code_timeout_express?: string
}

/**统一收单交易结算接口
 * @param out_trade_no        结算请求流水号
 * @param trade_no            支付宝订单号
 * @param royalty_parameters      分账明细信息
 * @param operator_id             操作员id
 */
export interface TradeSettleParams {
  out_request_no: string
  trade_no: string
  royalty_parameters: any
  operator_id?: string
}

/**单笔转账到支付宝账户接口
 * @param out_biz_no            商户转账唯一订单号
 * @param trans_amount          订单总金额
 * @param product_code          业务产品码
 * @param biz_scene             描述特定的业务场景
 * @param order_title           转账业务的标题
 * @param original_order_id     原支付宝业务单号
 * @param payee_info            收款方信息
 * @param remark                业务备注
 * @param business_params       转账业务请求的扩展参数

 */
export interface UniTransferParams {
  out_biz_no: string
  trans_amount: number
  product_code: string
  biz_scene?: string
  order_title?: string
  original_order_id?: string
  payee_info: any
  remark?: string
  business_params?: string
}

/**查询转账订单接口
 * @param out_biz_no        商户转账唯一订单号
 * @param order_id          支付宝转账单据号

 */
export interface TransOrderQueryParams {
  out_biz_no?: string
  order_id?: string
}

// App支付同步通知状态码
export enum PaymentResponseCode {
  SUCCESS = '9000',
  PROCESSING = '8000',
  FAILURE = '4000',
  REPEAT_REQ = '5000',
  USER_CANCEL = '6001',
  NETWORK_ERROR = '6002',
  UNKNOW = '6004',
}
export type VerifyPamentResult = string | PaymentResult
export interface VerifyPamentParams {
  memo: string // 描述信息
  result: VerifyPamentResult // 处理结果(类型为json结构字符串)
  resultStatus: PaymentResponseCode // 结果码(类型为字符串)
}

// App支付同步通知参数
export interface TradeAppPayResponse {
  code: PaymentResponseCode
  msg: string
  app_id: string
  out_trade_no: string
  trade_no: string
  total_amount: number
  seller_id: string
  charset: string
  timestamp: string
}

export interface PaymentResult {
  alipay_trade_app_pay_response: TradeAppPayResponse
  sign: string
  sign_type: SignType
}

export type APIParams =
  | CreateOrderParams
  | QueryOrderParams
  | CancelOrderParams
  | TradeCloseParams
  | TradeRefundParams
  | TradeRefundQueryParams
  | BillQueryParams
  | TradePrecreateParams
  | TradeSettleParams
  | UniTransferParams
  | TransOrderQueryParams

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

export enum APIList {
  'alipay.trade.query' = '订单查询',
  'alipay.trade.refund' = '交易退款',
  'alipay.trade.cancel' = '取消订单',
  'alipay.trade.precreate' = '预创建订单',
  'alipay.trade.close' = '关闭交易',
  'alipay.trade.create' = '创建交易',
  'alipay.trade.order.settle' = '交易结算',
  'alipay.trade.fastpay.refund.query' = '交易退款查询',
  'alipay.trade.app.pay' = '生成创建订单所需参数',
  'alipay.fund.trans.uni.transfer' = '单笔转账到支付宝账户接口',
  'alipay.data.dataservice.bill.downloadurl.query' = '查询账单下载地址接口',
  'async.notify' = '异步通知', // 自定义
}

export class AliPayCoreCoreFactory {
  private static CORE_MAP: Map<string, AliPayCore> = new Map<string, AliPayCore>()

  public static putCore(apiConfig: IApiConfig) {
    let aliPayCore: AliPayCore = this.CORE_MAP.get(apiConfig.appId)
    if (aliPayCore) {
      return aliPayCore
    }
    aliPayCore = new AliPayCore(apiConfig)
    this.CORE_MAP.set(apiConfig.appId, aliPayCore)
    return aliPayCore
  }

  public static getCore(appId?: string) {
    let aliPayCore: AliPayCore = null
    if (appId) {
      aliPayCore = this.CORE_MAP.get(appId)
    } else {
      const keys = [...this.CORE_MAP.keys()]
      if (keys[0]) {
        aliPayCore = this.CORE_MAP.get(keys[0])
      }
    }
    if (!aliPayCore) {
      throw new Error('需事先调用 AliPayCoreCoreFactory.putCore(apiConfig: IApiConfig) 将 appId 对应的 config 对象存入后,才可以使用 AliPayCoreCoreFactory.getCore方法')
    }
    return aliPayCore
  }

  public static removeCore(appId: string): boolean {
    return this.CORE_MAP.delete(appId)
  }
}

export class AliPayCore {
  private _apiConfig: IApiConfig = null
  private _http = Http.getInstance()
  constructor(apiConfig: IApiConfig) {
    this._apiConfig = apiConfig
    if (this._apiConfig.appPrivKeyFile) {
      this._apiConfig.appPrivKey = fs.readFileSync(this._apiConfig.appPrivKeyFile, 'ascii')
    }
    if (this._apiConfig.appPubKeyFile) {
      this._apiConfig.appPubKey = fs.readFileSync(this._apiConfig.appPubKeyFile, 'ascii')
    }
    if (this._apiConfig.alipayPubKeyFile) {
      this._apiConfig.alipayPubKey = fs.readFileSync(this._apiConfig.alipayPubKeyFile, 'ascii')
    }

    if (this._apiConfig.alipayRootCertFile) {
      this._apiConfig.alipayRootCert = fs.readFileSync(this._apiConfig.alipayRootCertFile, 'ascii')
    }

    this._apiConfig.appPrivKey = this.formatKey(this._apiConfig.appPrivKey, 'RSA PRIVATE KEY')
    this._apiConfig.alipayPubKey = this.formatKey(this._apiConfig.alipayPubKey, 'PUBLIC KEY')
    this._apiConfig.appCertSn = Kit.getSN(this._apiConfig.appPubKey, false)
    this._apiConfig.alipayRootCertSn = Kit.getSN(this._apiConfig.alipayRootCert, true)
  }
  // 格式化 key
  private formatKey(key: string, type: string): string {
    const item = key.split('\n').map((val) => val.trim())

    // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的第一行
    if (item[0].includes(type)) {
      item.shift()
    }

    // 删除包含 `RSA PRIVATE KEY / PUBLIC KEY` 等字样的最后一行
    if (item[item.length - 1].includes(type)) {
      item.pop()
    }

    return `-----BEGIN ${type}-----\n${item.join('')}\n-----END ${type}-----`
  }

  /**
   *  获取新的 apiConfig
   */
  public getApiConfig(): IApiConfig {
    return this._apiConfig
  }

  private validateBasicParams(method: MethodType, publicParams: PublicParams): PublicParams {
    return {
      app_id: this._apiConfig.appId,
      method,
      format: 'JSON',
      return_url: publicParams.return_url,
      charset: publicParams.charset || 'utf8',
      sign_type: publicParams.sign_type || SignType.RSA2,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      version: '1.0',
      notify_url: publicParams.notify_url,
      sign: '',
      biz_content: '',
      app_cert_sn: this._apiConfig.appCertSn,
      alipay_root_cert_sn: this._apiConfig.alipayRootCertSn,
    }
  }

  private getSignAlgorithm(signType: SignType): Algorithm {
    return Algorithm[signType]
  }

  private makeSign(privKey: string | Buffer, params: PublicParams, omit = ['sign']) {
    const signStr = Kit.makeSortStr(params, omit)
    const algorithm = this.getSignAlgorithm(params.sign_type)
    if (algorithm === Algorithm.RSA2) {
      return Cryptogram.sha256WithRsa(signStr, privKey, params.charset)
    }
    if (algorithm === Algorithm.RSA) {
      return Cryptogram.sha1WithRsa(signStr, privKey, params.charset)
    }
  }

  private validateParams(method: MethodType, apiParams: APIParams, publicParams: PublicParams) {
    const validateBasicParams: PublicParams = this.validateBasicParams(method, publicParams)
    validateBasicParams.biz_content = JSON.stringify(apiParams)
    validateBasicParams.sign = this.makeSign(this._apiConfig.appPrivKey, validateBasicParams)
    return validateBasicParams
  }

  private getResponseType(response: any): string {
    const respType: string = Object.keys(APIList)
      .map((name) => name.replace(/\./g, '_'))
      .find((api) => `${api}_response` in response)
    if (respType) {
      return `${respType}_response`
    }
    throw new Error(`Not Found responseType: ${String(response.msg)}`)
  }

  private verifySign(respSign: string, respData: any, omit: string[], options: { sign_type: SignType; charset: 'utf8' | 'ascii' | 'latin1' }): boolean {
    const resp = Kit.makeSortStr(respData, omit)
    const algorithm = this.getSignAlgorithm(options.sign_type)
    if (algorithm === Algorithm.RSA2) {
      return Cryptogram.sha256WithRsaVerify(this._apiConfig.alipayPubKey, respSign, resp, options.charset)
    }
    if (algorithm === Algorithm.RSA) {
      return Cryptogram.sha1WithRsaVerify(this._apiConfig.alipayPubKey, respSign, resp, options.charset)
    }
  }

  private makeRequest(type: MethodType, apiParams: APIParams, publicParams: PublicParams): string {
    const params = this.validateParams(type, apiParams, publicParams)
    const { sign } = params
    const signStr = Kit.makeSortStr(params, ['sign'])
    const value = signStr
      .split('&')
      .reduce((acc, cur) => {
        const [k, v] = cur.split('=')
        return `${acc + k}=${encodeURIComponent(v)}&`
      }, '')
      .slice(0, -1)

    return `${this._apiConfig.gatewayUrl}?${value}&sign=${encodeURIComponent(sign)}`
  }

  private makeResponse(data: any, publicParams: PublicParams): any {
    const respType = this.getResponseType(data)
    const respSign = data.sign
    const respData = data[respType]
    if (!respSign) {
      throw new Error('缺少签名')
    }
    const validateSuccess = this.verifySign(respSign, respData, ['sign', 'sign_type'], { sign_type: publicParams.sign_type, charset: publicParams.charset })
    if (!validateSuccess) {
      return { code: NormalResponseCode.SIGNATURE_ERROR, message: ResponseMessage[NormalResponseCode.SIGNATURE_ERROR], data: respData }
    }
    return { code: respData.code, message: ResponseMessage[respData.code], data: respData }
  }

  public createAppOrder(apiParams: CreateOrderParams, publicParams: PublicParams): object {
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

  public createWebOrder(apiParams: CreateOrderParams, publicParams: PublicParams): object {
    const params = this.validateParams(MethodType.CREATE_WEB_ORDER, apiParams, publicParams)
    const { sign } = params
    const signStr = Kit.makeSortStr(params, ['sign'])
    const value = signStr
      .split('&')
      .reduce((acc, cur) => {
        const [k, v] = cur.split('=')
        return `${acc}${k}=${encodeURIComponent(v)}&`
      }, '')
      .slice(0, -1)
    const data = `${this._apiConfig.gatewayUrl}?${value}&sign=${encodeURIComponent(sign)}`
    return { code: NormalResponseCode.OK, message: ResponseMessage[NormalResponseCode.OK], data }
  }

  public createPageOrder(apiParams: CreateOrderParams, publicParams: PublicParams): object {
    const params = this.validateParams(MethodType.CREATE_PAGE_ORDER, apiParams, publicParams)
    const { sign } = params
    const signStr = Kit.makeSortStr(params, ['sign'])
    const value = signStr
      .split('&')
      .reduce((acc, cur) => {
        const [k, v] = cur.split('=')
        return `${acc + k}=${encodeURIComponent(v)}&`
      }, '')
      .slice(0, -1)
    const data = `${this._apiConfig.gatewayUrl}?${value}&sign=${encodeURIComponent(sign)}`
    return { code: NormalResponseCode.OK, message: ResponseMessage[NormalResponseCode.OK], data }
  }

  public async queryOrder(apiParams: QueryOrderParams, publicParams: PublicParams) {
    const url = this.makeRequest(MethodType.QUERY_ORDER, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async cancelOrder(apiParams: CancelOrderParams, publicParams: PublicParams) {
    const url = this.makeRequest(MethodType.CANCEL_ORDER, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public verifyPayment(params: VerifyPamentParams) {
    const data = typeof params.result === 'string' ? <PaymentResult>JSON.parse(params.result) : params.result
    const { alipay_trade_app_pay_response, sign, sign_type } = data
    const validateSuccess = this.verifySign(sign, alipay_trade_app_pay_response, ['sign', 'sign_type'], { sign_type: sign_type, charset: 'utf8' })
    if (!validateSuccess) {
      return { code: NormalResponseCode.SIGNATURE_ERROR, message: ResponseMessage[NormalResponseCode.SIGNATURE_ERROR], data: alipay_trade_app_pay_response }
    }
    return { code: alipay_trade_app_pay_response.code, message: ResponseMessage[alipay_trade_app_pay_response.code], data: alipay_trade_app_pay_response }
  }

  public makeNotifyResponse(params: NotifyParams) {
    const { async_notify_response, sign, sign_type } = params
    const validateSuccess = this.verifySign(sign, async_notify_response, ['sign', 'sign_type'], { sign_type: sign_type, charset: 'utf8' })
    const code = validateSuccess ? NormalResponseCode.OK : NormalResponseCode.SIGNATURE_ERROR
    return { code, message: ResponseMessage[code], data: async_notify_response }
  }

  public async tradeClose(apiParams: TradeCloseParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.TRADE_CLOSE, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async tradeRefund(apiParams: TradeRefundParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.TRADE_REFUND, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async tradeRefundQuery(apiParams: TradeRefundQueryParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.TRADE_REFUND_QUERY, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async billDownloadQuery(apiParams: BillQueryParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.BILL_DOWNLOAD_QUERY, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async tradePrecreate(apiParams: TradePrecreateParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.TRADE_PRECREATE, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async tradeSettle(apiParams: TradeSettleParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.TRADE_SETTLE, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async uniTransfer(apiParams: UniTransferParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.FUND_TRANS_UNI_TRANSFER, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }

  public async transOrderQuery(apiParams: TransOrderQueryParams, publicParams?: PublicParams) {
    const url = this.makeRequest(MethodType.FUND_TRANS_ORDER_QUERY, apiParams, publicParams)
    const data = await this._http.get(url)
    return this.makeResponse(data, publicParams)
  }
}

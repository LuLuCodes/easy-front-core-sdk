export enum GateWay {
  ALIPAY_GETWAY = 'https://openapi.alipay.com/gateway.do',
  ALIPAY_DEV_GETWAY = 'https://openapi.alipaydev.com/gateway.do',
}

export enum GoodsType {
  VIRTUAL = 0,
  PARTICALITY = 1,
}

export enum MethodType {
  QUERY_ORDER = 'alipay.trade.query',
  CREATE_APP_ORDER = 'alipay.trade.app.pay',
  CREATE_WEB_ORDER = 'alipay.trade.wap.pay',
  CREATE_PAGE_ORDER = 'alipay.trade.page.pay',
  CANCEL_ORDER = 'alipay.trade.cancel',
  TRADE_CLOSE = 'alipay.trade.close',
  TRADE_SETTLE = 'alipay.trade.order.settle',
  TRADE_REFUND = 'alipay.trade.refund',
  TRADE_PRECREATE = 'alipay.trade.precreate',
  TRADE_REFUND_QUERY = 'alipay.trade.fastpay.refund.query',
  BILL_DOWNLOAD_QUERY = 'alipay.data.dataservice.bill.downloadurl.query',
  FUND_TRANS_UNI_TRANSFER = 'alipay.fund.trans.uni.transfer',
  FUND_TRANS_COMMON_QUERY = 'alipay.fund.trans.common.query',
  FUND_TRANS_ORDER_QUERY = 'alipay.fund.trans.order.query',
  BILL_DOWNLOAD_URL_QUERY = 'alipay.data.dataservice.bill.downloadurl.query',

  // self define
  VERIFY_PAYMENT = 'verify.payment.status',
  NOTIFY_RESPONSE = 'notify.response',
}

export enum PayChannel {
  balance = 'balance',
  moneyFund = 'moneyFund',
  coupon = 'coupon',
  pcredit = 'pcredit',
  pcreditpayInstallment = 'pcreditpayInstallment',
  creditCard = 'creditCard',
  creditCardExpress = 'creditCardExpress',
  creditCardCartoon = 'creditCardCartoon',
  credit_group = 'credit_group',
  debitCardExpress = 'debitCardExpress',
  mcard = 'mcard',
  pcard = 'pcard',
  promotion = 'promotion',
  voucher = 'voucher',
  point = 'point',
  mdiscount = 'mdiscount',
  bankPay = 'bankPay',
  cartoon = 'cartoon',
  honeyPay = 'honeyPay',
}
export enum SignType {
  RSA2 = 'RSA2',
  RSA = 'RSA',
}

export enum Algorithm {
  RSA = 'RSA-SHA1',
  RSA2 = 'RSA-SHA256',
}

export enum NormalResponseCode {
  OK = 0,
  EXCEPTION = -1,
  SIGNATURE_ERROR = -2,
  SUCCESS = 10000,
  UNAVALIABLE = 20000,
  INSUFFICIENT_AUTHORIZATION = 20001,
  MISSING_REQUIRED_ARGS = 40001,
  INVALID_ARGS = 40002,
  PROCESSING_FAILURE = 40004,
  PERMISSION_DENIED = 40006,
}

/**
 * @description 微信支付接口域名
 */
export enum WXPAY_DOMAIN {
  /**
   *  中国国内
   */
  CHINA = 'https://api.mch.weixin.qq.com',
  /**
   *  中国国内(备用域名)
   */
  CHINA2 = 'https://api2.mch.weixin.qq.com',
  /**
   *  东南亚
   */
  HK = 'https://apihk.mch.weixin.qq.com',
  /**
   *  其它
   */
  US = 'https://apius.mch.weixin.qq.com',
  /**
   * 获取公钥
   */
  FRAUD = 'https://fraud.mch.weixin.qq.com',
  /**
   *  活动
   */
  ACTION = 'https://action.weixin.qq.com',
}

/**
 * @description 微信支付交易类型
 */
export enum WXPAY_TRADE_TYPE {
  /**
   * 微信公众号支付或者小程序支付
   */
  JSAPI = 'JSAPI',
  /**
   * 微信扫码支付
   */
  NATIVE = 'NATIVE',
  /**
   * 微信APP支付
   */
  APP = 'APP',
  /**
   * 付款码支付
   */
  MICROPAY = 'MICROPAY',
  /**
   * H5支付
   */
  MWEB = 'MWEB',
}

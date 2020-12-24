import * as fs from 'fs'
import * as urlencode from 'urlencode'
import { Kit, Cryptogram, Http } from '@easy-front-core-sdk/kits'
import { SIGN_TYPE, SIGN_KEY_TYPE, REQUEST_METHOD } from './Enums'

/**商户号配置
 * @param mchId         商户号
 * @param apiScrect     商户API密钥
 * @param api3Screct    商户APIv3密钥
 * @param serialNo      证书序列号
 * @param certPath      key.pem 证书文件路径
 * @param key           key.pem 证书内容
 * @param platSerialNo  微信平台序列号
 */
export interface IApiConfig {
  mchId: string
  apiScrect: string
  api3Screct: string
  serialNo: string
  certPath?: string
  key?: Buffer
  platSerialNo?: string
}

export class WXPayCoreFactory {
  private static CORE_MAP: Map<string, WXPayCore> = new Map<string, WXPayCore>()

  public static putCore(apiConfig: IApiConfig) {
    let wxpayCore: WXPayCore = this.CORE_MAP.get(apiConfig.mchId)
    if (wxpayCore) {
      return wxpayCore
    }
    wxpayCore = new WXPayCore(apiConfig)
    this.CORE_MAP.set(apiConfig.mchId, wxpayCore)
    return wxpayCore
  }

  public static getCore(mchId?: string) {
    let wxpayCore: WXPayCore = null
    if (mchId) {
      wxpayCore = this.CORE_MAP.get(mchId)
    } else {
      const keys = [...this.CORE_MAP.keys()]
      if (keys[0]) {
        wxpayCore = this.CORE_MAP.get(keys[0])
      }
    }
    if (!wxpayCore) {
      throw new Error('需事先调用 WXPayCoreFactory.putCore(apiConfig: IApiConfig) 将 mchId 对应的 config 对象存入后,才可以使用 WXPayCoreFactory.getCore方法')
    }
    return wxpayCore
  }

  public static removeCore(mchId: string): boolean {
    return this.CORE_MAP.delete(mchId)
  }
}

export class WXPayCore {
  public static FIELD_SIGN = 'sign'
  public static FIELD_SIGN_TYPE = 'sign_type'
  private _apiConfig = null
  private _http = Http.getInstance()
  constructor(apiConfig: IApiConfig) {
    this._apiConfig = apiConfig
    if (this._apiConfig.certPath) {
      this._apiConfig.key = fs.readFileSync(this._apiConfig.certPath)
    }
  }

  /**
   * 构建签名参数
   * @param {Array<string>} data 待构建签名的参数
   * @returns {string}           返回待签名字符串
   */
  private buildSignMessage(data: Array<string>): string {
    if (!data || data.length <= 0) {
      return null
    }
    let sign = ''
    data.forEach((item) => {
      sign = sign.concat(item).concat('\n')
    })
    return sign
  }

  /**
   * 构建请求签名参数
   * @param method {REQUEST_METHOD} Http 请求方式
   * @param url 请求接口 /v3/certificates
   * @param timestamp 获取发起请求时的系统当前时间戳
   * @param nonceStr 随机字符串
   * @param body 请求报文主体
   */
  private buildReqSignMessage(method: REQUEST_METHOD, url: string, timestamp: string, nonceStr: string, body: string): string {
    return this.buildSignMessage([method, url, timestamp, nonceStr, body])
  }

  /**
   * v3 创建签名
   * @param {string} data   需要参与签名的参数
   * @param {Buffer} key    key.pem 证书
   * @returns {string}      返回签名结果
   */
  private createSignByStr(data: string, key: Buffer): string {
    if (!data) {
      throw new Error('参与签名的参数不能为空,请检查')
    }
    return Cryptogram.sha256WithRsa(data, key)
  }

  /**
   * 获取授权认证信息
   *
   * @param mchId     商户号
   * @param serialNo  商户API证书序列号
   * @param nonceStr  请求随机串
   * @param timestamp 时间戳
   * @param signature 签名值
   * @param authType  认证类型，目前为WECHATPAY2-SHA256-RSA2048
   */
  private getAuthorization(mchId: string, serialNo: string, nonceStr: string, timestamp: string, signature: string, authType: string): string {
    let map: Map<string, string> = new Map()
    map.set('mchid', mchId)
    map.set('serial_no', serialNo)
    map.set('nonce_str', nonceStr)
    map.set('timestamp', timestamp)
    map.set('signature', signature)
    return authType.concat(' ').concat(this.createLinkString(map, ',', false, true))
  }

  /**
   * 拼接参数
   * @param map     待拼接的 Map 数据
   * @param connStr 连接符
   * @param encode  是否 urlencode
   * @param quotes  是否 ""
   */
  private createLinkString(map: Map<string, string>, connStr: string, encode: boolean, quotes: boolean): string {
    // 排序
    let arrayObj = Array.from(map)
    arrayObj.sort((a: any, b: any) => {
      return a[0].localeCompare(b[0])
    })
    let content: string = ''
    for (let i = 0; i < arrayObj.length; i++) {
      let key = arrayObj[i][0]
      let value = arrayObj[i][1]
      // 拼接时，不包括最后一个&字符
      if (i == arrayObj.length - 1) {
        if (quotes) {
          content = content
            .concat(key)
            .concat('=')
            .concat('"')
            .concat(encode ? urlencode.encode(value) : value)
            .concat('"')
        } else {
          content = content
            .concat(key)
            .concat('=')
            .concat(encode ? urlencode.encode(value) : value)
        }
      } else {
        if (quotes) {
          content = content
            .concat(key)
            .concat('=')
            .concat('"')
            .concat(encode ? urlencode.encode(value) : value)
            .concat('"')
            .concat(connStr)
        } else {
          content = content
            .concat(key)
            .concat('=')
            .concat(encode ? urlencode.encode(value) : value)
            .concat(connStr)
        }
      }
    }
    return content
  }

  /**
   * 构建接口所需的 Authorization
   *
   * @param method    {REQUEST_METHOD} 请求方法
   * @param urlSuffix 可通过 WxApiType 来获取，URL挂载参数需要自行拼接
   * @param mchId     商户Id
   * @param serialNo  商户 API 证书序列号
   * @param key       商户key.pem 证书
   * @param body      接口请求参数
   */
  private async buildAuthorization(method: REQUEST_METHOD, urlSuffix: string, mchId: string, serialNo: string, key: Buffer, body: string): Promise<string> {
    let timestamp: string = parseInt((Date.now() / 1000).toString()).toString()

    let authType: string = 'WECHATPAY2-SHA256-RSA2048'
    let nonceStr: string = Kit.generateStr()

    // 构建签名参数
    let buildSignMessage: string = this.buildReqSignMessage(method, urlSuffix, timestamp, nonceStr, body)
    // 生成签名
    let signature: string = this.createSignByStr(buildSignMessage, key)
    // 根据平台规则生成请求头 authorization
    return this.getAuthorization(mchId, serialNo, nonceStr, timestamp, signature, authType)
  }

  /**
   * 获取请求头
   * @param authorization 授权信息
   * @param serialNumber  证书序列号
   */
  private getHeaders(authorization: string): Object {
    return {
      Authorization: authorization,
      Accept: 'application/json',
      'Content-type': 'application/json',
    }
  }

  /**
   * 微信支付 Api-v3 get 请求
   * @param urlPrefix     请求接口前缀，可通过 WXPAY_DOMAIN 来获取
   * @param urlSuffix     请求接口后缀，可通过 WXPAY_API_URL 来获取
   * @param params        请求参数
   */
  public async get(urlPrefix: string, urlSuffix: string, params?: Map<string, string>): Promise<any> {
    if (params && params.size > 0) {
      urlSuffix = urlSuffix.concat('?').concat(this.createLinkString(params, '&', true, false))
    }
    let authorization = await this.buildAuthorization(REQUEST_METHOD.GET, urlSuffix, this._apiConfig.mchId, this._apiConfig.serialNo, this._apiConfig.key, '')

    return await this._http.getToResponse(urlPrefix.concat(urlSuffix), {
      headers: this.getHeaders(authorization),
    })
  }

  /**
   * 微信支付 Api-v3 post 请求
   * @param urlPrefix     请求接口前缀，可通过 WXPAY_DOMAIN 来获取
   * @param urlSuffix     请求接口后缀，可通过 WXPAY_API_URL 来获取
   * @param data          接口请求参数
   */
  public async post(urlPrefix: string, urlSuffix: string, data: string): Promise<any> {
    let authorization = await this.buildAuthorization(REQUEST_METHOD.POST, urlSuffix, this._apiConfig.mchId, this._apiConfig.serialNo, this._apiConfig.key, data)

    return await this._http.postToResponse(urlPrefix.concat(urlSuffix), data, {
      headers: this.getHeaders(authorization),
    })
  }

  /**
   * 微信支付 Api-v3 put 请求
   * @param urlPrefix     请求接口前缀，可通过 WXPAY_DOMAIN 来获取
   * @param urlSuffix     请求接口后缀，可通过 WXPAY_API_URL 来获取
   * @param data          接口请求参数
   */
  public async put(urlPrefix: string, urlSuffix: string, data: string): Promise<any> {
    let authorization = await this.buildAuthorization(REQUEST_METHOD.PUT, urlSuffix, this._apiConfig.mchId, this._apiConfig.serialNo, this._apiConfig.key, data)

    return await this._http.postToResponse(urlPrefix.concat(urlSuffix), data, {
      headers: this.getHeaders(authorization),
    })
  }

  /**
   * 微信支付 Api-v3 delete 请求
   * @param urlPrefix     请求接口前缀，可通过 WXPAY_DOMAIN 来获取
   * @param urlSuffix     请求接口后缀，可通过 WXPAY_API_URL 来获取
   */
  public async delete(urlPrefix: string, urlSuffix: string): Promise<any> {
    let authorization = await this.buildAuthorization(REQUEST_METHOD.DELETE, urlSuffix, this._apiConfig.mchId, this._apiConfig.serialNo, this._apiConfig.key, '')

    return await this._http.deleteToResponse(urlPrefix.concat(urlSuffix), {
      headers: this.getHeaders(authorization),
    })
  }

  /**
   * 微信支付 Api-v3 upload 请求
   * @param urlPrefix     请求接口前缀，可通过 WxDmainType 来获取
   * @param urlSuffix     请求接口后缀，可通过 WxApiType 来获取
   * @param filePath      需要上传的文件路径
   * @param data          请求参数
   */
  public async upload(urlPrefix: string, urlSuffix: string, filePath: string, data: string): Promise<any> {
    let authorization = await this.buildAuthorization(REQUEST_METHOD.UPLOAD, urlSuffix, this._apiConfig.mchId, this._apiConfig.serialNo, this._apiConfig.key, data)

    let headers = this.getHeaders(authorization)
    headers['Content-type'] = 'multipart/form-data'
    return await this._http.uploadToResponse(urlPrefix.concat(urlSuffix), filePath, data, {
      headers,
    })
  }

  /**
   * v3 创建签名
   *
   * @param {Array<string>} data  需要参与签名的参数
   * @returns {string}            返回签名结果
   */
  public createSign(data: Array<string>): string {
    return this.createSignByStr(this.buildSignMessage(data), this._apiConfig.key)
  }

  /**
   * v3 证书和报文解密
   * @param ciphertext
   * @param associated_data
   * @param nonce
   */
  public dencryptCiphertext(ciphertext: string, associated_data: string, nonce: string) {
    return Cryptogram.aes256gcmDecrypt(this._apiConfig.api3Screct, nonce, associated_data, ciphertext)
  }

  /**
   * v3 验证签名
   * @param signature   待验证的签名
   * @param body        应答主体
   * @param nonce       随机串
   * @param timestamp   时间戳
   * @param publicKey   平台公钥
   */
  public verifySignature(signature: string, body: string, nonce: string, timestamp: string, publicKey: Buffer): boolean {
    let buildSignMessage: string = this.buildRepSignMessage(timestamp, nonce, body)
    return Cryptogram.sha256WithRsaVerify(publicKey, signature, buildSignMessage)
  }

  /**
   * v3 验证签名
   * @param headers     http 请求头
   * @param body        应答主体
   * @param publicKey   平台公钥
   */
  public verifySignatureByHeaders(headers: any, body: string, publicKey: Buffer): boolean {
    let timestamp = headers['wechatpay-timestamp']
    let nonce = headers['wechatpay-nonce']
    let signature = headers['wechatpay-signature']
    return this.verifySignature(signature, body, nonce, timestamp, publicKey)
  }

  /**
   * 敏感信息加密
   * @param publicKey   平台公钥
   * @param 需要加密的数据
   */
  public static privateInfoEncrypt(publicKey: Buffer, data: string) {
    return Cryptogram.publicEncrypt(
      {
        key: Buffer.from(publicKey),
        padding: 4, // crypto.constants.RSA_PKCS1_OAEP_PADDING
      },
      data
    )
  }

  /**
   * 敏感信息解密
   * @param 商户key.pem 证书(商户私钥)
   * @param 需要加密的数据
   */
  public static privateInfoDecrypt(publicKey: Buffer, data: string) {
    return Cryptogram.privateDecrypt(
      {
        key: Buffer.from(publicKey),
        padding: 4, // crypto.constants.RSA_PKCS1_OAEP_PADDING
      },
      data
    )
  }

  /**
   * 构建应答签名参数
   * @param timestamp 应答时间戳
   * @param nonceStr 应答随机串
   * @param body 应答报文主体
   */
  public buildRepSignMessage(timestamp: string, nonceStr: string, body: string): string {
    return this.buildSignMessage([timestamp, nonceStr, body])
  }

  // 微信垃圾，v3部分接口不支持，还要兼容v2
  /**
   * v2 生成带有签名的 xml 数据
   * @param data
   * @param key
   * @param signType
   */
  public static generateSignedXml(data: object, key: string, signType: SIGN_TYPE): Promise<any> {
    let clonedData = JSON.parse(JSON.stringify(data))
    // 添加签名 sign
    clonedData[this.FIELD_SIGN] = this.generateSignature(data, key, signType)
    return new Promise(function (resolve, reject) {
      Kit.obj2xml(clonedData)
        .then(function (xmlStr) {
          resolve(xmlStr)
        })
        .catch(function (err) {
          reject(err)
        })
    })
  }

  /**
   * v2 生成签名
   * @param data
   * @param key api key
   * @param signTypeParam 签名类型
   */
  public static generateSignature(data: any, key: string, signTypeParam: SIGN_TYPE, signKeyType = SIGN_KEY_TYPE.KEY): string {
    let signType = signTypeParam || SIGN_TYPE.SIGN_TYPE_MD5
    if (signType !== SIGN_TYPE.SIGN_TYPE_MD5 && signType !== SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
      throw new Error('Invalid signType: ' + signType)
    }
    let combineStr = ''
    let sortArray = Object.keys(data).sort()
    for (let i = 0; i < sortArray.length; ++i) {
      let key = sortArray[i]
      if (key !== this.FIELD_SIGN && data[key]) {
        let value = String(data[key])
        if (value.length > 0) {
          combineStr = combineStr + key + '=' + value + '&'
        }
      }
    }
    if (combineStr.length === 0) {
      throw new Error('There is no data to generate signature')
    } else {
      if (signKeyType === SIGN_KEY_TYPE.KEY) {
        combineStr = combineStr + 'key=' + key
      } else {
        if (signType !== SIGN_TYPE.SIGN_TYPE_MD5) {
          throw new Error('work wx generate signature require the use of md5')
        }
        combineStr = combineStr + 'secret=' + key
      }

      if (signType === SIGN_TYPE.SIGN_TYPE_MD5) {
        return Cryptogram.md5(combineStr).toUpperCase()
      } else if (signType === SIGN_TYPE.SIGN_TYPE_HMACSHA256) {
        return Cryptogram.hmacsha256(combineStr, key).toUpperCase()
      } else {
        throw new Error('Invalid signType: ' + signType)
      }
    }
  }
}

import { CPWXCore, IApiConfig } from './CPWXCore'
import { JsApiType } from './Enums'
import { Cryptogram } from '@easy-front-core-sdk/kits'
import { parseString } from 'xml2js'
import { MsgCrypto } from './MsgCrypto'

/**
 * @description 处理企业微信消息以及事件
 */
export class CPWeChat {
  /**
   * JSSDK签名
   * @param cpWXCore
   * @param nonce_str 随机字符串
   * @param timestamp 时间戳
   * @param url 当前网页的URL， 不包含#及其后面部分
   * @param type QyJsApiType
   * @param jsapi_ticket jsapi_ticket
   */
  public static async jssdkSignature(cpWXCore: CPWXCore, nonce_str: string, timestamp: string, url: string, type: JsApiType, jsapi_ticket?: string): Promise<string> {
    let jsTicket = jsapi_ticket || (await cpWXCore.getTicket(type))
    let str = 'jsapi_ticket=' + jsTicket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url
    return Cryptogram.sha1(str)
  }

  /**
   *  验证成为开发者
   *  @param wxCore
   *  @param signature
   *  @param timestamp
   *  @param nonce
   *  @param echostr
   */
  public static checkSignature(cpWXCore: CPWXCore, signature: string, timestamp: string, nonce: string, echostr: string): string {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [cpWXCore.getApiConfig().token, timestamp, nonce].sort().join('')
    //对传入的字符串进行加密
    let tempSignature = Cryptogram.sha1(tempStr)
    //校验签名
    if (tempSignature === signature) {
      return echostr
    } else {
      return '签名异常'
    }
  }

  /**
   *  处理消息
   *  @param msgAdapter
   *  @param msgXml
   *  @param msgSignature
   *  @param timestamp
   *  @param nonce
   */
  public static handleMsg(cpWXCore: CPWXCore, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async function (err, res) {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        let result = res.xml
        let cryptoKit: MsgCrypto
        const apiCofig: IApiConfig = cpWXCore.getApiConfig()
        cryptoKit = new MsgCrypto(apiCofig, msgSignature || '', timestamp || '', nonce || '')
        //对加密数据解密
        result = cryptoKit.decryptMsg(result.Encrypt)
      })
    })
  }
}

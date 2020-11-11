import { WXCore, ApiConfig } from './WXCore'
import { JsApiType } from './Enums'
import { Cryptogram, MsgCrypto } from '@easy-front-core-sdk/kits'
import { parseString } from 'xml2js'

export class WeChat {
  /**
   * JSSDK签名
   * @param wxCore
   * @param nonce_str
   * @param timestamp
   * @param url
   * @param jsapi_ticket
   */
  public static async jssdkSignature(wxCore: WXCore, nonce_str: string, timestamp: string, url: string, jsapi_ticket?: string): Promise<string> {
    let jsTicket = jsapi_ticket || (await wxCore.getTicket(JsApiType.JSAPI))
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
  public static checkSignature(wxCore: WXCore, signature: string, timestamp: string, nonce: string, echostr: string): string {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [wxCore.getApiConfig().token, timestamp, nonce].sort().join('')
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
   *  处理微信推送过来的消息
   *  @param wxCore
   *  @param msgXml
   *  @param msgSignature
   *  @param timestamp
   *  @param nonce
   */
  public static handleMsg(wxCore: WXCore, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async function (err, res) {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        let result = res.xml
        const apiCofig: ApiConfig = wxCore.getApiConfig()
        //判断消息加解密方式
        if (apiCofig.encodingAesKey) {
          const cryptoKit = new MsgCrypto(apiCofig, msgSignature || '', timestamp || '', nonce || '')
          //对加密数据解密
          result = cryptoKit.decryptMsg(result.Encrypt)
        }
      })
    })
  }
}

import { MPCore, IApiConfig } from './MPCore'
import { Cryptogram } from '@easy-front-core-sdk/kits'
import { MsgCrypto } from './MsgCrypto'

/**
 * @description 处理小程序消息以及事件
 */
export class MP {
  /**
   *  验证成为开发者
   *  @param wxCore
   *  @param signature
   *  @param timestamp
   *  @param nonce
   *  @param echostr
   */
  public static checkSignature(mpCore: MPCore, signature: string, timestamp: string, nonce: string, echostr: string): boolean {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = [mpCore.getApiConfig().token, timestamp, nonce].sort().join('')
    //对传入的字符串进行加密
    let tempSignature = Cryptogram.sha1(tempStr)
    //校验签名
    return tempSignature === signature
  }

  /**
   *  处理消息
   *  @param msgAdapter
   *  @param encrypt
   *  @param signature
   *  @param timestamp
   *  @param nonce
   */
  public static handleMsg(mpCore: MPCore, encrypt: string, signature?: string, timestamp?: string, nonce?: string): any {
    let cryptoKit: MsgCrypto
    const apiCofig: IApiConfig = mpCore.getApiConfig()
    cryptoKit = new MsgCrypto(apiCofig, signature || '', timestamp || '', nonce || '')
    //对加密数据解密
    let result = cryptoKit.decryptMsg(encrypt)
    return result
  }
}

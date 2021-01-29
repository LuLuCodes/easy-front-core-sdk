import { OpenCPWXCore, IApiConfig, Suite } from './OpenCPWXCore'
import { MsgCrypto, MsgCryptoConfig } from './MsgCrypto'
import { Cryptogram } from '@easy-front-core-sdk/kits'
import { parseString } from 'xml2js'

import { BaseMsg } from './entity/message/BaseMsg'
import { InNotDefinedMsg } from './entity/message/input/InNotDefinedMsg'
import { InSuiteTicket } from './entity/message/input/InSuiteTicket'

import { OutTextMsg } from './entity/message/output/OutTextMsg'
import { OutMsg } from './entity/message/output/OutMsg'

import { InMsgParser } from './InMsgParser'
import { MsgAdapter } from './MsgAdapter'

export interface MsgParseRes {
  inMsg: BaseMsg
  outMsg: string
}
export class OpenCPWX {
  private msgAdapter = new MsgAdapter()
  /**
   *  服务商验签
   *  @param openCPWXCore
   *  @param signature
   *  @param timestamp
   *  @param nonce
   *  @param echostr
   */
  public static checkSignature(core: OpenCPWXCore | Suite, signature: string, timestamp: string, nonce: string, echostr: string): string {
    //将 token、timestamp、nonce 三个参数进行字典序排序，并拼接成一个字符串
    let tempStr = ''
    const decode_echostr = decodeURIComponent(echostr)
    if (core instanceof OpenCPWXCore) {
      tempStr = [core.getApiConfig().token, timestamp, nonce, decode_echostr].sort().join('')
    } else {
      tempStr = [core.token, timestamp, nonce, decode_echostr].sort().join('')
    }
    //对传入的字符串进行加密
    let tempSignature = Cryptogram.sha1(tempStr)
    //校验签名
    if (tempSignature !== signature) {
      throw new Error('签名异常')
    }
    let cryptoKit: MsgCrypto = null
    let cryptoConfig: MsgCryptoConfig = null
    if (core instanceof OpenCPWXCore) {
      const apiCofig: IApiConfig = core.getApiConfig()
      cryptoConfig = {
        receiveId: apiCofig.corpid,
        token: apiCofig.token,
        encodingAesKey: apiCofig.encodingAesKey,
      }
    } else {
      cryptoConfig = {
        receiveId: core.suite_id,
        token: core.token,
        encodingAesKey: core.encodingAesKey,
      }
    }
    return cryptoKit.decrypt(echostr)
  }

  /**
   *  处理微信推送过来的消息
   *  @param openCPWXCore
   *  @param msgXml
   *  @param msgSignature
   *  @param timestamp
   *  @param nonce
   */
  public static handleMsg(core: OpenCPWXCore | Suite, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string): Promise<MsgParseRes> {
    return new Promise(function (resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async function (err, res) {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        let result = res.xml
        let cryptoKit: MsgCrypto = null
        let cryptoConfig: MsgCryptoConfig = null
        if (core instanceof OpenCPWXCore) {
          const apiCofig: IApiConfig = core.getApiConfig()
          cryptoConfig = {
            receiveId: apiCofig.corpid,
            token: apiCofig.token,
            encodingAesKey: apiCofig.encodingAesKey,
          }
        } else {
          cryptoConfig = {
            receiveId: core.suite_id,
            token: core.token,
            encodingAesKey: core.encodingAesKey,
          }
        }
        cryptoKit = new MsgCrypto(cryptoConfig, msgSignature || '', timestamp || '', nonce || '')
        //对加密数据解密
        result = cryptoKit.decryptMsg(result.Encrypt)

        let inMsg: BaseMsg = InMsgParser.parse(result)
        let responseMsg: string
        let outMsg: OutMsg | string
        // 处理接收的消息
        if (inMsg instanceof InSuiteTicket) {
          outMsg = await this.msgAdapter.processInSuiteTicketMsg(<InSuiteTicket>inMsg)
        } else if (inMsg instanceof InNotDefinedMsg) {
          outMsg = await this.msgAdapter.processIsNotDefinedMsg(<InNotDefinedMsg>inMsg)
        }

        // 处理发送的消息
        if (outMsg instanceof OutTextMsg) {
          let outTextMsg = <OutTextMsg>outMsg
          if (outTextMsg.getContent.trim()) {
            responseMsg = outTextMsg.toXml()
          } else {
            responseMsg = 'success'
          }
        } else if (typeof outMsg === 'string') {
          responseMsg = outMsg
        }
        responseMsg = cryptoKit.encryptMsg(responseMsg)
        //返回给微信服务器
        resolve({ inMsg, outMsg: responseMsg })
      })
    })
  }
}

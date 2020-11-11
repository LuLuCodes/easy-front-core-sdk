import { WXCore, ApiConfig } from './WXCore'
import { JsApiType } from './Enums'
import { Cryptogram, MsgCrypto } from '@easy-front-core-sdk/kits'
import { parseString } from 'xml2js'

import { InMsg } from './entity/message/input/InMsg'
import { InTextMsg } from './entity/message/input/InTextMsg'
import { InImageMsg } from './entity/message/input/InImageMsg'

import { InLinkMsg } from './entity/message/input/InLinkMsg'
import { InLocationMsg } from './entity/message/input/InLocationMsg'
import { InShortVideoMsg } from './entity/message/input/InShortVideoMsg'
import { InVideoMsg } from './entity/message/input/InVideoMsg'
import { InVoiceMsg } from './entity/message/input/InVoiceMsg'
import { InNotDefinedMsg } from './entity/message/input/InNotDefinedMsg'

import { InSpeechRecognitionResults } from './entity/message/input/InSpeechRecognitionResults'
import { InFollowEvent } from './entity/message/input/event/InFollowEvent'
import { InLocationEvent } from './entity/message/input/event/InLocationEvent'
import { InMenuEvent } from './entity/message/input/event/InMenuEvent'
import { InQrCodeEvent } from './entity/message/input/event/InQrCodeEvent'
import { InTemplateMsgEvent } from './entity/message/input/event/InTemplateMsgEvent'

import { OutMsg } from './entity/message/output/OutMsg'
import { OutTextMsg } from './entity/message/output/OutTextMsg'
import { OutImageMsg } from './entity/message/output/OutImageMsg'
import { OutMusicMsg } from './entity/message/output/OutMusicMsg'
import { OutNewsMsg } from './entity/message/output/OutNewsMsg'
import { OutVideoMsg } from './entity/message/output/OutVideoMsg'
import { OutVoiceMsg } from './entity/message/output/OutVoiceMsg'

import { InMsgParser } from './InMsgParser'
import { IMsgAdapter } from './MsgAdapter'

export class WeChat {
  /**
   * JSSDK签名
   * @param wxCore
   * @param nonce_str
   * @param timestamp
   * @param url
   * @param jsapi_ticket
   */
  public static async jssdkSignature(InMsgParser, wxCore: WXCore, nonce_str: string, timestamp: string, url: string, jsapi_ticket?: string): Promise<string> {
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
  public static handleMsg(msgAdapter: IMsgAdapter, wxCore: WXCore, msgXml: string, msgSignature?: string, timestamp?: string, nonce?: string): Promise<string> {
    return new Promise(function (resolve, reject) {
      parseString(msgXml, { explicitArray: false }, async function (err, res) {
        if (err) {
          reject(`xml 数据解析错误:${err}`)
          console.debug(err)
          return
        }
        let result = res.xml
        let cryptoKit: MsgCrypto
        const apiCofig: ApiConfig = wxCore.getApiConfig()
        //判断消息加解密方式
        if (apiCofig.encodingAesKey) {
          cryptoKit = new MsgCrypto(apiCofig, msgSignature || '', timestamp || '', nonce || '')
          //对加密数据解密
          result = cryptoKit.decryptMsg(result.Encrypt)
        }

        let inMsg: InMsg = InMsgParser.parse(result)
        let responseMsg: string
        let outMsg: OutMsg | string

        // 处理接收的消息
        if (inMsg instanceof InTextMsg) {
          outMsg = await msgAdapter.processInTextMsg(<InTextMsg>inMsg)
        } else if (inMsg instanceof InImageMsg) {
          outMsg = await msgAdapter.processInImageMsg(<InImageMsg>inMsg)
        } else if (inMsg instanceof InLinkMsg) {
          outMsg = await msgAdapter.processInLinkMsg(<InLinkMsg>inMsg)
        } else if (inMsg instanceof InLocationMsg) {
          outMsg = await msgAdapter.processInLocationMsg(<InLocationMsg>inMsg)
        } else if (inMsg instanceof InShortVideoMsg) {
          outMsg = await msgAdapter.processInShortVideoMsg(<InShortVideoMsg>inMsg)
        } else if (inMsg instanceof InVideoMsg) {
          outMsg = await msgAdapter.processInVideoMsg(<InVideoMsg>inMsg)
        } else if (inMsg instanceof InVoiceMsg) {
          outMsg = await msgAdapter.processInVoiceMsg(<InVoiceMsg>inMsg)
        } else if (inMsg instanceof InSpeechRecognitionResults) {
          outMsg = await msgAdapter.processInSpeechRecognitionResults(<InSpeechRecognitionResults>inMsg)
        } else if (inMsg instanceof InFollowEvent) {
          outMsg = await msgAdapter.processInFollowEvent(<InFollowEvent>inMsg)
        } else if (inMsg instanceof InLocationEvent) {
          outMsg = await msgAdapter.processInLocationEvent(<InLocationEvent>inMsg)
        } else if (inMsg instanceof InMenuEvent) {
          outMsg = await msgAdapter.processInMenuEvent(<InMenuEvent>inMsg)
        } else if (inMsg instanceof InQrCodeEvent) {
          outMsg = await msgAdapter.processInQrCodeEvent(<InQrCodeEvent>inMsg)
        } else if (inMsg instanceof InTemplateMsgEvent) {
          outMsg = await msgAdapter.processInTemplateMsgEvent(<InTemplateMsgEvent>inMsg)
        } else if (inMsg instanceof InNotDefinedMsg) {
          outMsg = await msgAdapter.processIsNotDefinedMsg(<InNotDefinedMsg>inMsg)
        }

        // 处理发送的消息
        if (outMsg instanceof OutTextMsg) {
          let outTextMsg = <OutTextMsg>outMsg
          if (outTextMsg.getContent.trim()) {
            responseMsg = outTextMsg.toXml()
          } else {
            responseMsg = 'success'
          }
        } else if (outMsg instanceof OutImageMsg) {
          responseMsg = (<OutImageMsg>outMsg).toXml()
        } else if (outMsg instanceof OutMusicMsg) {
          responseMsg = (<OutMusicMsg>outMsg).toXml()
        } else if (outMsg instanceof OutNewsMsg) {
          responseMsg = (<OutNewsMsg>outMsg).toXml()
        } else if (outMsg instanceof OutVideoMsg) {
          responseMsg = (<OutVideoMsg>outMsg).toXml()
        } else if (outMsg instanceof OutVoiceMsg) {
          responseMsg = (<OutVoiceMsg>outMsg).toXml()
        } else if (typeof outMsg === 'string') {
          responseMsg = outMsg
        }
        if (apiCofig.encodingAesKey) {
          responseMsg = cryptoKit.encryptMsg(responseMsg)
        }
        //返回给微信服务器
        resolve(responseMsg)
      })
    })
  }
}

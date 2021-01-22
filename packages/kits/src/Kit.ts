/**
 * @description 常用的工具库
 */
import { parseString, Builder } from 'xml2js'
import * as uuid from 'uuid'
import * as crypto from 'crypto'
import bignumber_js_1 from 'bignumber.js'
const x509_1 = require('@fidm/x509')

export class Kit {
  /**
   * Make salt
   * @param len 长度
   */
  public static makeSalt(len: number): string {
    return crypto.randomBytes(len).toString('base64')
  }

  /**
   * Encrypt password
   * @param password 密码
   * @param salt 密码盐
   */
  public static encryptPassword(password: string, salt: string): string {
    if (!password || !salt) {
      return ''
    }
    const tempSalt = Buffer.from(salt, 'base64')
    return (
      // 10000 代表迭代次数 16代表长度
      crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
    )
  }

  /**
   * 随机生成字符串
   */
  public static generateStr(): string {
    return uuid.v4().replace(/\-/g, '')
  }

  /**
   * xml 字符串转换成对象
   * @param xmlStr
   */
  public static xml2obj(xmlStr: string): Promise<any> {
    return new Promise(function (resolve, reject) {
      parseString(xmlStr, function (err, result) {
        if (err) {
          reject(err)
        } else {
          let data = result['xml']
          let obj: any = {}
          Object.keys(data).forEach(function (key) {
            if (data[key].length > 0) {
              obj[key] = data[key][0]
            }
          })
          resolve(obj)
        }
      })
    })
  }

  /**
   * 普通对象转换成 xml 字符串
   * @param obj
   */
  public static obj2xml(obj: Object): Promise<any> {
    return new Promise(function (resolve, reject) {
      let builder = new Builder({ cdata: true, rootName: 'xml' })
      try {
        let xmlStr = builder.buildObject(obj)
        resolve(xmlStr)
      } catch (err) {
        reject(err)
      }
    })
  }

  /**
   * 将json对象转换成排序字符串
   * @param obj
   */
  public static makeSortStr(params: object, omit = []) {
    return Object.keys(params)
      .sort()
      .filter((key) => params[key] && omit.indexOf(key) === -1)
      .map((key) => {
        const value = typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key]
        return `${String(key)}=${String(value)}`
      })
      .join('&')
      .trim()
  }

  /** 从上传的证书内容或Buffer读取序列号 */
  public static getSN(fileData: string | Buffer, isRoot: boolean = false): string {
    if (typeof fileData == 'string') {
      fileData = Buffer.from(fileData)
    }
    if (isRoot) {
      return this.getRootCertSN(fileData)
    }
    const certificate = x509_1.Certificate.fromPEM(fileData)
    return this.getCertSN(certificate)
  }

  /** 读取序列号 */
  public static getCertSN(certificate: any): string {
    const { issuer, serialNumber } = certificate
    const principalName = issuer.attributes
      .reduceRight((prev, curr) => {
        const { shortName, value } = curr
        const result = `${prev}${shortName}=${value},`
        return result
      }, '')
      .slice(0, -1)
    const decimalNumber = new bignumber_js_1(serialNumber, 16).toString(10)
    const SN = crypto
      .createHash('md5')
      .update(principalName + decimalNumber, 'utf8')
      .digest('hex')
    return SN
  }
  /** 读取根证书序列号 */
  public static getRootCertSN(rootContent: Buffer): string {
    const certificates = x509_1.Certificate.fromPEMs(rootContent)
    let rootCertSN = ''
    certificates.forEach((item) => {
      if (item.signatureOID.startsWith('1.2.840.113549.1.1')) {
        const SN = this.getCertSN(item)
        if (rootCertSN.length === 0) {
          rootCertSN += SN
        } else {
          rootCertSN += `_${SN}`
        }
      }
    })
    return rootCertSN
  }
}

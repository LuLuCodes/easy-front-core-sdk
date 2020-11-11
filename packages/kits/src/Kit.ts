/**
 * @description 常用的工具库
 */
import { parseString, Builder } from 'xml2js'
import * as uuid from 'uuid'
import * as crypto from 'crypto'

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
}

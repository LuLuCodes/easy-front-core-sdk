/**
 * @description 常用加密解密算法
 */
import * as crypto from 'crypto'

export class Cryptogram {
  /**
   * AES-128-CBC 加密方法
   * @param key  加密key
   * @param iv   向量
   * @param data 需要加密的数据
   */
  public static aes128cbcEncrypt(key: Buffer, iv: Buffer, data: string): string {
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
    let crypted = cipher.update(data, 'utf8', 'binary')
    crypted += cipher.final('binary')
    crypted = Buffer.from(crypted, 'binary').toString('base64')
    return crypted
  }

  /**
   * AES-128-CBC     解密方法
   * @param key      解密的key
   * @param iv       向量
   * @param crypted  密文
   */
  public static aes128cbcDecrypt(key: Buffer, iv: Buffer, crypted: string): string {
    crypted = Buffer.from(crypted, 'base64').toString('binary')
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    let decoded = decipher.update(crypted, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    return decoded
  }

  /**
   * AES-256-ECB 加密方法
   * @param key  加密key
   * @param iv   向量
   * @param data 需要加密的数据
   */
  public static aes256ecbEncrypt(key: Buffer, iv: Buffer, data: string): string {
    let cipher = crypto.createCipheriv('aes-256-ecb', key, iv)
    let crypted = cipher.update(data, 'utf8', 'binary')
    crypted += cipher.final('binary')
    crypted = Buffer.from(crypted, 'binary').toString('base64')
    return crypted
  }

  /**
   * AES-256-ECB     解密方法
   * @param key      解密的key
   * @param iv       向量
   * @param crypted  密文
   */
  public static aes256ecbDecrypt(key: Buffer, iv: Buffer, crypted: string) {
    crypted = Buffer.from(crypted, 'base64').toString('binary')
    let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    let decoded = decipher.update(crypted, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    return decoded
  }

  /**
   * hmacsha256 加密
   * @param data
   * @param key
   */
  public static hmacsha256(data: string, key: string): string {
    return crypto.createHmac('sha256', key).update(data, 'utf8').digest('hex')
  }

  /**
   * sha256 加密
   * @param data
   */
  public static sha256(data: string): string {
    return this.hash(data, 'sha256')
  }

  /**
   * sha256 加密
   * @param data
   */
  public static sha256x(data: crypto.BinaryLike) {
    return this.hashx(data, 'sha256')
  }

  /**
   * sha1加密
   * @param data
   */
  public static sha1(data: string): string {
    return this.hash(data, 'sha1')
  }

  /**
   * md5 加密
   * @param data
   */
  public static md5(data: string): string {
    return this.hash(data, 'md5')
  }

  public static hash(data: string, algorithm: string) {
    return crypto.createHash(algorithm).update(data, 'utf8').digest('hex')
  }

  public static hashx(data: crypto.BinaryLike, algorithm: string) {
    return crypto.createHash(algorithm).update(data).digest('hex')
  }

  /**
   * SHA256withRSA
   * @param data 待加密字符
   * @param privatekey 私钥key
   */
  public static sha256WithRsa(data: string, privatekey: string | Buffer, encode?: 'utf8' | 'ascii' | 'latin1'): string {
    if (encode) {
      return crypto
        .createSign('RSA-SHA256')
        .update(data, <crypto.CharacterEncoding>encode)
        .sign(privatekey, 'base64')
    } else {
      return crypto.createSign('RSA-SHA256').update(data).sign(privatekey, 'base64')
    }
  }

  /**
   * SHA1WithRsa
   * @param data 待加密字符
   * @param privatekey 私钥key
   */
  public static sha1WithRsa(data: string, privatekey: string | Buffer, encode?: 'utf8' | 'ascii' | 'latin1'): string {
    if (encode) {
      return crypto
        .createSign('RSA-SHA1')
        .update(data, <crypto.CharacterEncoding>encode)
        .sign(privatekey, 'base64')
    } else {
      return crypto.createSign('RSA-SHA1').update(data).sign(privatekey, 'base64')
    }
  }

  /**
   * SHA256withRSA 验证签名
   * @param publicKey 公钥key
   * @param signature 待验证的签名串
   * @param data 需要验证的字符串
   */
  public static sha256WithRsaVerify(publicKey: string | Buffer, signature: string, data: string, encode?: 'utf8' | 'ascii' | 'latin1') {
    if (encode) {
      return crypto
        .createVerify('RSA-SHA256')
        .update(data, <crypto.CharacterEncoding>encode)
        .verify(publicKey, signature, 'base64')
    } else {
      return crypto.createVerify('RSA-SHA256').update(data).verify(publicKey, signature, 'base64')
    }
  }

  /**
   * SHA1withRSA 验证签名
   * @param publicKey 公钥key
   * @param signature 待验证的签名串
   * @param data 需要验证的字符串
   */
  public static sha1WithRsaVerify(publicKey: string | Buffer, signature: string, data: string, encode?: 'utf8' | 'ascii' | 'latin1') {
    if (encode) {
      return crypto
        .createVerify('RSA-SHA1')
        .update(data, <crypto.CharacterEncoding>encode)
        .verify(publicKey, signature, 'base64')
    } else {
      return crypto.createVerify('RSA-SHA1').update(data).verify(publicKey, signature, 'base64')
    }
  }

  /**
   * AEAD_AES_256_GCM 解密
   * @param key
   * @param nonce
   * @param associatedData
   * @param ciphertext
   */
  public static aes256gcmDecrypt(key: string, nonce: string, associatedData: string, ciphertext: string): string {
    let ciphertextBuffer = Buffer.from(ciphertext, 'base64')
    let authTag = ciphertextBuffer.slice(ciphertextBuffer.length - 16)
    let data = ciphertextBuffer.slice(0, ciphertextBuffer.length - 16)
    let decipherIv = crypto.createDecipheriv('aes-256-gcm', key, nonce)
    decipherIv.setAuthTag(Buffer.from(authTag))
    decipherIv.setAAD(Buffer.from(associatedData))
    let decryptStr = decipherIv.update(data, null, 'utf8')
    decipherIv.final()
    return decryptStr
  }

  /**
   * RSA公钥加密
   */
  public static publicEncrypt(key: crypto.RsaPublicKey | crypto.RsaPrivateKey | crypto.KeyLike, data: string) {
    return crypto.publicEncrypt(key, Buffer.from(data))
  }

  /**
   * RSA私钥加密
   */
  public static privateDecrypt(private_key: crypto.RsaPrivateKey | crypto.KeyLike, data: string) {
    return crypto.privateDecrypt(private_key, Buffer.from(data))
  }
}

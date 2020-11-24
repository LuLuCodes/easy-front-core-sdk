import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 企业微信 API 接口
 */
export class BasicAPI {
  private static getApiDomainIpUrl = 'https://qyapi.weixin.qq.com/cgi-bin/get_api_domain_ip?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取企业微信API域名IP段
   * @param cpWXCore
   */
  public static async getApiDomainIp(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getApiDomainIpUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

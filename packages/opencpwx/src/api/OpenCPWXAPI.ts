import * as util from 'util'
import { OpenCPWXSuite, OpenCPWXCore } from '../OpenCPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { AccessTokenRefresh } from './AccessTokenDecorator'

/**
 * @description 企业微信开发平台 API
 */
export class OpenCPWXAPI {
  private static getPreAuthCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_pre_auth_code?suite_access_token=%s'
  private static setSessionInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/set_session_info?suite_access_token=%s'
  private static getPermanentCodeUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_permanent_code?suite_access_token=%s'
  private static getAuthInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_auth_info?suite_access_token=%s'
  private static getAdminListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/get_admin_list?suite_access_token=%s'
  private static searchContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/search?provider_access_token=%s'
  private static batchSearchContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/batchsearch?provider_access_token=%s'
  private static uploadUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/service/media/upload?provider_access_token=%s&type=%s'
  private static contactIdTranslateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/id_translate?provider_access_token=%s'
  private static getBatchResultUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/batch/getresult?provider_access_token=%s&jobid=%s'
  private static sortContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/service/contact/sort?provider_access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取预授权码
   * @param suite
   */
  @AccessTokenRefresh()
  public static async getPreAuthCode(suite: OpenCPWXSuite) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getPreAuthCodeUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 设置授权配置
   * @param suite
   * @param preAuthCode 预授权码
   * @param authType 授权类型：0 正式授权， 1 测试授权。 默认值为0。注意，请确保应用在正式发布后的授权类型为“正式授权”
   * @param appId 允许进行授权的应用id，如1、2、3，不填或者填空数组都表示允许授权套件内所有应用（仅旧的多应用套件可传此参数，新开发者可忽略）
   */

  @AccessTokenRefresh()
  public static async setSessionInfo(suite: OpenCPWXSuite, preAuthCode: string, authType = 0, appId?: Array<number>) {
    const token = await suite.getAccessToken()
    const url = util.format(this.setSessionInfoUrl, token)
    const data = await this._http.post(url, {
      pre_auth_code: preAuthCode,
      session_info: {
        appid: appId,
        auth_type: authType,
      },
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取企业永久授权码
   * @param suite
   * @param authCode 临时授权码
   */
  @AccessTokenRefresh()
  public static async getPermanentCode(suite: OpenCPWXSuite, authCode: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getPermanentCodeUrl, token)
    const data = await this._http.post(url, {
      auth_code: authCode,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取企业授权信息
   * @param suite
   * @param authCorpId 授权方corpid
   * @param permanentCode 永久授权码
   */
  @AccessTokenRefresh()
  public static async getAuthInfo(suite: OpenCPWXSuite, authCorpId: string, permanentCode: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getAuthInfoUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      permanent_code: permanentCode,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取应用的管理员列表
   * @param suite
   * @param authCorpId 授权方corpid
   * @param agentId 授权方安装的应用agentid
   */
  @AccessTokenRefresh()
  public static async getAdminList(suite: OpenCPWXSuite, authCorpId: string, agentId: string) {
    const token = await suite.getAccessToken()
    const url = util.format(this.getAdminListUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      agentid: agentId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 通讯录单个搜索
   * @param cpWXCore
   * @param authCorpId 授权方corpid
   * @param queryWord 搜索关键词
   * @param queryType 查询类型 1：查询用户，返回用户userid列表 2：查询部门，返回部门id列表。 不填该字段或者填0代表同时查询部门跟用户
   * @param agentId 应用id
   * @param offset 查询的偏移量
   * @param limit 查询返回的最大数量，最多为50
   */
  @AccessTokenRefresh()
  public static async searchContact(cpWXCore: OpenCPWXCore, authCorpId: string, queryWord: string, queryType: 0, agentId?: string, offset?: number, limit?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.searchContactUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      query_word: queryWord,
      query_type: queryType,
      agentid: agentId,
      offset: offset,
      limit: limit,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 通讯录批量搜索
   * @param cpWXCore
   * @param authCorpId 授权方corpid
   * @param queryRequestList 索请求列表,每次搜索列表数量不超过50
   * @param agentId 应用id
   */
  @AccessTokenRefresh()
  public static async batchSearchContact(
    cpWXCore: OpenCPWXCore,
    authCorpId: string,
    queryRequestList: Array<{
      query_word: string
      query_type?: number
      offset?: number
      limit?: number
    }>,
    agentId?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.batchSearchContactUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      query_request_list: queryRequestList,
      agentid: agentId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 上传临时素材
   * @param cpWXCore
   * @param mediaType 媒体文件类型
   * @param filePath 文件路径
   * @param accessToken AccessToken
   */
  @AccessTokenRefresh()
  public static async upload(cpWXCore: OpenCPWXCore, mediaType: string, filePath: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.uploadUrl, token, mediaType)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 异步通讯录id转译
   * @param cpWXCore
   * @param authCorpId 授权方corpid
   * @param mediaIdList 需要转译的文件的media_id列表
   * @param outputFileName 转译完打包的文件名，不需带后缀
   */
  @AccessTokenRefresh()
  public static async contactIdTranslate(cpWXCore: OpenCPWXCore, authCorpId: string, mediaIdList: Array<string>, outputFileName?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.contactIdTranslateUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      media_id_list: mediaIdList,
      output_file_name: outputFileName,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取异步任务结果
   * @param cpWXCore
   * @param jobId 异步任务id
   */
  @AccessTokenRefresh()
  public static async getBatchResult(cpWXCore: OpenCPWXCore, jobId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getBatchResultUrl, token, jobId)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 通讯录userid排序
   * @param cpWXCore
   * @param authCorpId 授权方corpid
   * @param userIdList 要排序的userid列表，最多支持1000个
   * @param sortType 排序方式 0：根据姓名拼音升序排列，返回用户userid列表 1：根据姓名拼音降排列，返回用户userid列表
   */
  @AccessTokenRefresh()
  public static async sortContact(cpWXCore: OpenCPWXCore, authCorpId: string, userIdList: Array<string>, sortType?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.sortContactUrl, token)
    const data = await this._http.post(url, {
      auth_corpid: authCorpId,
      useridlist: userIdList,
      sort_type: sortType,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode && data.errcode !== 40014) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

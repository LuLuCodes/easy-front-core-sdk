import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { OauthAPI } from './OauthAPI'

/**
 * @description OA数据接口
 */
export class OADataAPI {
  private static getDialRecordUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/dial/get_dial_record?access_token=%s'
  private static getCheckInDataUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/checkin/getcheckindata?access_token=%s'
  private static getCheckInoptionUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/checkin/getcheckinoption?access_token=%s'
  private static getTemplateDetailUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/gettemplatedetail?access_token=%s'
  private static submitApprovalUrl = 'https://qyapi.weixin.qq.com/cgi-bin/oa/applyevent?access_token=%s'
  private static getBatchApprovalInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/oa/getapprovalinfo?access_token='
  private static getApprovalDetailUrl = 'https://qyapi.weixin.qq.com/cgi-bin/oa/getapprovaldetail?access_token=%s'
  private static getOpenApprovalDataUrl = 'https://qyapi.weixin.qq.com/cgi-bin/corp/getopenapprovaldata?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取打卡数据
   * @param cpWXCore
   * @param checkInType 打卡类型。1：上下班打卡；2：外出打卡；3：全部打卡
   * @param startTime 获取打卡记录的开始时间。Unix时间戳
   * @param endTime 获取打卡记录的结束时间。Unix时间戳
   * @param userIdList 需要获取打卡记录的用户列表
   */
  public static async getCheckInData(cpWXCore: CPWXCore, checkInType: number, startTime: number, endTime: number, userIdList: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getCheckInDataUrl, token)
    const data = await this._http.post(url, {
      opencheckindatatype: checkInType,
      starttime: startTime,
      endtime: endTime,
      useridlist: userIdList,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取打卡规则
   * @param cpWXCore
   * @param datetime 需要获取规则的日期当天0点的Unix时间戳
   * @param userIdList 需要获取打卡规则的用户列表
   */
  public static async getCheckInoption(cpWXCore: CPWXCore, datetime: number, userIdList: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getCheckInoptionUrl, token)
    const data = await this._http.post(url, {
      datetime: datetime,
      useridlist: userIdList,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取审批模板详情
   * @param cpWXCore
   * @param templateId 模板的唯一标识id
   */
  public static async getTemplateDetail(cpWXCore: CPWXCore, templateId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getTemplateDetailUrl, token)
    const data = await this._http.post(url, {
      template_id: templateId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 提交审批申请
   * @param cpWXCore
   * @param approval 申请json
   */
  public static async submitApproval(cpWXCore: CPWXCore, approval: any) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.submitApprovalUrl, token)
    const data = await this._http.post(url, approval)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 批量获取审批单号
   * @param cpWXCore
   * @param startTime 审批单提交的时间范围，开始时间，UNix时间戳
   * @param endTime 审批单提交的时间范围，结束时间，Unix时间戳
   * @param cursor 分页查询游标，默认为0，后续使用返回的next_cursor进行分页拉取
   * @param size 一次请求拉取审批单数量，默认值为100，上限值为100
   * @param filters 筛选条件，可对批量拉取的审批申请设置约束条件，支持设置多个条件
              └    key 筛选类型，包括：
                    template_id - 模板类型/模板id；
                    creator - 申请人；
                    department - 审批单提单者所在部门；
                    sp_status - 审批状态。
                    注意:  仅“部门”支持同时配置多个筛选条件。不同类型的筛选条件之间为“与”的关系，同类型筛选条件之间为“或”的关系
              └    value 筛选值，对应为：
                    template_id-模板id；
                    creator-申请人userid ；
                    department-所在部门id；
                    sp_status-审批单状态（1-审批中；2-已通过；3-已驳回；4-已撤销；6-通过后撤销；7-已删除；10-已支付）
   */
  public static async getBatchApprovalInfo(
    cpWXCore: CPWXCore,
    startTime: number,
    endTime: number,
    cursor = 0,
    size = 100,
    filters?: Array<{ key: 'template_id' | 'creator' | 'department' | 'sp_status'; value?: number | string }>
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getBatchApprovalInfoUrl, token)
    const data = await this._http.post(url, {
      starttime: startTime,
      endtime: endTime,
      cursor,
      size,
      filters,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取审批申请详情
   * @param cpWXCore
   * @param spNO 审批单编号
   */
  public static async getApprovalDetail(cpWXCore: CPWXCore, spNO: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getApprovalDetailUrl, token)
    const data = await this._http.post(url, {
      sp_no: spNO,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 查询自建应用审批单当前状态
   * @param cpWXCore
   * @param thirdNo 开发者发起申请时定义的审批单号
   */
  public static async getOpenApprovalData(cpWXCore: CPWXCore, thirdNo: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getOpenApprovalDataUrl, token)
    const data = await this._http.post(url, {
      thirdNo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取公费电话拨打记录
   * @param cpWXCore
   * @param startTime 查询的起始时间戳
   * @param endTime 查询的结束时间戳
   * @param offset 分页查询的偏移量
   * @param limit 分页查询的每页大小,默认为100条，如该参数大于100则按100处理
   */
  public static async getDialRecord(cpWXCore: CPWXCore, startTime: number, endTime: number, offset = 0, limit: 100) {
    if (offset < 0) {
      offset = 0
    }

    if (limit < 1 || limit > 100) {
      offset = 100
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getDialRecordUrl, token)
    const data = await this._http.post(url, {
      start_time: startTime,
      end_time: endTime,
      offset: offset,
      limit: limit,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }
}

import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 数据统计接口
 */
export class DatacubeAPI {
  private static getUserSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getusersummary?access_token=%s'
  private static getUserCumulateUrl: string = 'https://api.weixin.qq.com/datacube/getusercumulate?access_token=%s'
  private static getArticleSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getarticlesummary?access_token=%s'
  private static getArticleTotalUrl: string = 'https://api.weixin.qq.com/datacube/getarticletotal?access_token=%s'
  private static getUserReadUrl: string = 'https://api.weixin.qq.com/datacube/getuserread?access_token=%s'
  private static getUserReadHourUrl: string = 'https://api.weixin.qq.com/datacube/getuserreadhour?access_token=%s'
  private static getUserShareUrl: string = 'https://api.weixin.qq.com/datacube/getusershare?access_token=%s'
  private static getUserShareHourUrl: string = 'https://api.weixin.qq.com/datacube/getusersharehour?access_token=%s'

  private static getUpStreamMsgUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsg?access_token=%s'
  private static getUpStreamMsgHourUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsghour?access_token=%s'
  private static getUpStreamMsgWeekMsgUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgweek?access_token=%s'
  private static getUpStreamMsgMonthUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgmonth?access_token=%s'
  private static getUpStreamMsgDistUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdist?access_token=%s'
  private static getUpStreamMsgDistWeekUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdistweek?access_token=%s'
  private static getUpStreamMsgDistMonthUrl: string = 'https://api.weixin.qq.com/datacube/getupstreammsgdistmonth?access_token=%s'
  private static getInterFaceSummaryUrl: string = 'https://api.weixin.qq.com/datacube/getinterfacesummary?access_token=%s'
  private static getInterFaceSummaryHourUrl: string = 'https://api.weixin.qq.com/datacube/getinterfacesummaryhour?access_token=%s'

  private static _http = Http.getInstance()

  public static async getData(wxCore: WXCore, url: string, beginDate: string, endDate: string) {
    const token = await wxCore.getAccessToken()
    const cur_url = util.format(url, token)
    const data = await this._http.post(cur_url, {
      begin_date: beginDate,
      end_date: endDate,
    })
    if (data) {
      if (data.errcode) {
        throw new Error(data.errmsg)
      }
      return data
    } else {
      throw new Error('接口异常')
    }
  }

  /**
   * 获取用户增减数据 最大时间跨度：7天
   * @param wxCore
   * @param beginDate 获取数据的起始日期
   * @param endDate 获取数据的结束日期
   */
  public static async getUserSummary(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserSummaryUrl, beginDate, endDate)
  }
  /**
   * 获取累计用户数据 最大时间跨度：7天
   * @param wxCore
   * @param beginDate 获取数据的起始日期
   * @param endDate 获取数据的结束日期
   */
  public static async getUserCumulate(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserCumulateUrl, beginDate, endDate)
  }

  /**
   * 获取图文群发每日数据，最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getArticleSummary(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getArticleSummaryUrl, beginDate, endDate)
  }

  /**
   * 获取图文群发总数据，最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getArticleTotal(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getArticleTotalUrl, beginDate, endDate)
  }

  /**
   * 获取图文统计数据 最大跨度3天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUserRead(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserReadUrl, beginDate, endDate)
  }

  /**
   * 获取图文统计分时数据 最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUserReadHour(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserReadHourUrl, beginDate, endDate)
  }

  /**
   * 获取图文分享转发数据 最大跨度7天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUserShare(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserShareUrl, beginDate, endDate)
  }

  /**
   * 获取图文分享转发分时数据 最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUserShareHour(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUserShareHourUrl, beginDate, endDate)
  }

  /**
   * 获取消息发送概况数据 最大跨度7天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsg(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgUrl, beginDate, endDate)
  }

  /**
   * 获取消息分送分时数据 最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgHour(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgHourUrl, beginDate, endDate)
  }

  /**
   * 获取消息发送周数据 最大跨度30天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgWeekMsg(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgWeekMsgUrl, beginDate, endDate)
  }

  /**
   * 获取消息发送月数据 最大跨度30天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgMonth(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgMonthUrl, beginDate, endDate)
  }

  /**
   * 获取消息发送分布数据 最大跨度15天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgDist(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgDistUrl, beginDate, endDate)
  }

  /**
   * 获取消息发送分布周数据 最大跨度30天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgDistWeek(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgDistWeekUrl, beginDate, endDate)
  }
  /**
   * 获取消息发送分布月数据 最大跨度30天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getUpStreamMsgDistMonth(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getUpStreamMsgDistMonthUrl, beginDate, endDate)
  }

  /**
   * 获取接口分析数据 最大跨度30天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getInterFaceSummary(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getInterFaceSummaryUrl, beginDate, endDate)
  }

  /**
   * 获取接口分析分时数据 最大跨度1天
   * @param wxCore
   * @param beginDate
   * @param endDate
   */
  public static async getInterFaceSummaryHour(wxCore: WXCore, beginDate: string, endDate: string) {
    return this.getData(wxCore, this.getInterFaceSummaryHourUrl, beginDate, endDate)
  }
}

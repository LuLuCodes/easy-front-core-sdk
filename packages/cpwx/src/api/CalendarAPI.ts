import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 日程接口
 */
export class CalendarAPI {
  private static addCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/add?access_token=%s'
  private static updateCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/update?access_token=%s'
  private static getCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/get?access_token=%s'
  private static delCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/calendar/del?access_token=%s'
  private static addScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/add?access_token=%s'
  private static updateScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/update?access_token=%s'
  private static getScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/get?access_token=%s'
  private static delScheduleUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/del?access_token=%s'
  private static getScheduleByCalendarUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/schedule/get_by_calendar?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建日历
   * @param cpWXCore
   * @param organizer 指定的组织者userid
   * @param readonly 日历组织者对日历是否只读权限（即不可编辑日历，不可在日历上添加日程，仅可作为组织者删除日历）。0-否；1-是。默认为1，即只读
   * @param setAsDefault 是否将该日历设置为组织者的默认日历。0-否；1-是。默认为0，即不设为默认日历
   * @param summary 日历标题。1 ~ 128 字符
   * @param color 日历在终端上显示的颜色，RGB颜色编码16进制表示，例如：”#0000FF” 表示纯蓝色
   * @param description 日历描述。0 ~ 512 字符
   * @param shares 日历共享成员列表。最多2000人
              └  userid 日历共享成员的id
              └  readonly 共享成员对日历是否只读权限（即不可编辑日历，不可在日历上添加日程，仅可以退出日历）。0-否；1-是。默认为1，即只读
   */
  public static async addCalendar(
    cpWXCore: CPWXCore,
    organizer: string,
    readonly = 1,
    setAsDefault = 0,
    summary: string,
    color: string,
    description?: string,
    shares?: Array<{ userid: string; readonly: 0 | 1 }>
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addCalendarUrl, token)
    const data = await this._http.post(url, {
      calendar: {
        organizer: organizer,
        readonly,
        set_as_default: setAsDefault,
        summary,
        color,
        description,
        shares,
      },
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
   * 更新日历
   * @param cpWXCore
   * @param calId 日历ID
   * @param readonly 日历组织者对日历是否只读权限（即不可编辑日历，不可在日历上添加日程，仅可作为组织者删除日历）。0-否；1-是。默认为1，即只读
   * @param setAsDefault 是否将该日历设置为组织者的默认日历。0-否；1-是。默认为0，即不设为默认日历
   * @param summary 日历标题。1 ~ 128 字符
   * @param color 日历在终端上显示的颜色，RGB颜色编码16进制表示，例如：”#0000FF” 表示纯蓝色
   * @param description 日历描述。0 ~ 512 字符
   * @param shares 日历共享成员列表。最多2000人
              └  userid 日历共享成员的id
              └  readonly 共享成员对日历是否只读权限（即不可编辑日历，不可在日历上添加日程，仅可以退出日历）。0-否；1-是。默认为1，即只读
   */
  public static async updateCalendar(
    cpWXCore: CPWXCore,
    calId: string,
    readonly = 1,
    summary: string,
    color: string,
    description?: string,
    shares?: Array<{ userid: string; readonly: 0 | 1 }>
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateCalendarUrl, token)
    const data = await this._http.post(url, {
      calendar: {
        cal_id: calId,
        readonly,
        summary,
        color,
        description,
        shares,
      },
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
   * 获取日历
   * @param cpWXCore
   * @param calIdList 日历ID列表。一次最多可获取1000条
   */
  public static async getCalendar(cpWXCore: CPWXCore, calIdList: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getCalendarUrl, token)
    const data = await this._http.post(url, {
      cal_id_list: calIdList,
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
   * 删除日历
   * @param cpWXCore
   * @param calId 日历ID
   */
  public static async delCalendar(cpWXCore: CPWXCore, calId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getCalendarUrl, token)
    const data = await this._http.post(url, {
      cal_id: calId,
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
   * 创建日程
   * @param cpWXCore
   * @param organizer 组织者
   * @param startTime 日程开始时间，Unix时间戳
   * @param endTime 日程结束时间，Unix时间戳
   * @param attendees 日程参与者列表。最多支持2000人
              └  userid 日历共享成员的id
   * @param summary 日程标题。0 ~ 128 字符。不填会默认显示为“新建事件”
   * @param description 日程描述。0 ~ 512 字符
   * @param reminders 提醒相关信息
              └  is_remind 是否需要提醒。0-否；1-是
              └  remind_before_event_secs 日程开始（start_time）前多少秒提醒，当is_remind为1时有效。
                  例如： 300表示日程开始前5分钟提醒。目前仅支持以下数值：
                    0 - 事件开始时
                    300 - 事件开始前5分钟
                    900 - 事件开始前15分钟
                    3600 - 事件开始前1小时
                    86400 - 事件开始前1天
              └  is_repeat 是否重复日程。0-否；1-是
              └  repeat_type 重复类型，当is_repeat为1时有效。目前支持如下类型：
                    0 - 每日
                    1 - 每周
                    2 - 每月
                    5 - 每年
                    7 - 工作日
   * @param location 日程地址。0 ~ 128 字符
   * @param calId 日程所属日历ID
   */
  public static async addSchedule(
    cpWXCore: CPWXCore,
    organizer: string,
    startTime: number,
    endTime: number,
    attendees?: Array<{ userid: string }>,
    summary?: string,
    description?: string,
    reminders?: { is_remind: 0 | 1; remind_before_event_secs: 0 | 300 | 900 | 3600 | 86400; is_repeat: 0 | 1; repeat_type: 0 | 1 | 2 | 5 | 7 },
    location?: string,
    calId?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addScheduleUrl, token)
    const data = await this._http.post(url, {
      schedule: {
        organizer: organizer,
        start_time: startTime,
        end_time: endTime,
        attendees: attendees,
        summary: summary,
        description: description,
        reminders: reminders,
        location: location,
        cal_id: calId,
      },
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
   * 更新日程
   * @param cpWXCore
   * @param organizer 组织者
   * @param scheduleId 日程ID
   * @param startTime 日程开始时间，Unix时间戳
   * @param endTime 日程结束时间，Unix时间戳
   * @param attendees 日程参与者列表。最多支持2000人
              └  userid 日历共享成员的id
   * @param summary 日程标题。0 ~ 128 字符。不填会默认显示为“新建事件”
   * @param description 日程描述。0 ~ 512 字符
   * @param reminders 提醒相关信息
              └  is_remind 是否需要提醒。0-否；1-是
              └  remind_before_event_secs 日程开始（start_time）前多少秒提醒，当is_remind为1时有效。
                  例如： 300表示日程开始前5分钟提醒。目前仅支持以下数值：
                    0 - 事件开始时
                    300 - 事件开始前5分钟
                    900 - 事件开始前15分钟
                    3600 - 事件开始前1小时
                    86400 - 事件开始前1天
              └  is_repeat 是否重复日程。0-否；1-是
              └  repeat_type 重复类型，当is_repeat为1时有效。目前支持如下类型：
                    0 - 每日
                    1 - 每周
                    2 - 每月
                    5 - 每年
                    7 - 工作日
   * @param location 日程地址。0 ~ 128 字符
   * @param calId 日程所属日历ID
   */
  public static async updateSchedule(
    cpWXCore: CPWXCore,
    organizer: string,
    scheduleId: string,
    startTime: number,
    endTime: number,
    attendees?: Array<{ userid: string }>,
    summary?: string,
    description?: string,
    reminders?: { is_remind: 0 | 1; remind_before_event_secs: 0 | 300 | 900 | 3600 | 86400; is_repeat: 0 | 1; repeat_type: 0 | 1 | 2 | 5 | 7 },
    location?: string,
    calId?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateScheduleUrl, token)
    const data = await this._http.post(url, {
      schedule: {
        organizer: organizer,
        schedule_id: scheduleId,
        start_time: startTime,
        end_time: endTime,
        attendees: attendees,
        summary: summary,
        description: description,
        reminders: reminders,
        location: location,
        cal_id: calId,
      },
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
   * 获取日程
   * @param cpWXCore
   * @param scheduleIdList 日程ID列表。一次最多拉取1000条
   */
  public static async getSchedule(cpWXCore: CPWXCore, scheduleIdList: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getScheduleUrl, token)
    const data = await this._http.post(url, {
      schedule_id_list: scheduleIdList,
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
   * 删除日程
   * @param cpWXCore
   * @param scheduleId 日程ID
   */
  public static async delSchedule(cpWXCore: CPWXCore, scheduleId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getScheduleUrl, token)
    const data = await this._http.post(url, {
      schedule_id: scheduleId,
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
   * 获取日历下的日程列表
   * @param cpWXCore
   * @param calId 日历ID
   * @param offset 分页，偏移量, 默认为0
   * @param limit 分页，预期请求的数据量，默认为500，取值范围 1 ~ 1000
   */
  public static async getScheduleByCalendar(cpWXCore: CPWXCore, calId: string, offset = 0, limit = 500) {
    if (offset < 0) {
      offset = 2
    }
    if (limit < 1) {
      limit = 500
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getScheduleByCalendarUrl, token)
    const data = await this._http.post(url, {
      cal_id: calId,
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

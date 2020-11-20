import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 会议室接口
 */
export class MeetingRoomAPI {
  private static addMeetingRoomUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/add?access_token=%s'
  private static getMeetingRoomListUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/list?access_token=%s'
  private static editMeetingRoomUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/edit?access_token=%s'
  private static delMeetingRoomUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/del?access_token=%s'
  private static getBookInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/get_booking_info?access_token=%s'
  private static bookMeetingRoomUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/book?access_token=%s'
  private static cancelBookMeetingRoomUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/oa/meetingroom/cancel_book?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 添加会议室
   * @param cpWXCore
   * @param name 会议室名称，最多30个字符
   * @param capacity 会议室所能容纳的人数
   * @param city 会议室所在城市
   * @param building 	会议室所在楼宇
   * @param floor 会议室所在楼层
   * @param equipment 会议室支持的设备列表,参数详细含义见附录
   * @param coordinate 会议室所在建筑经纬度,可通过腾讯地图坐标拾取器获取
              └  latitude 会议室所在建筑纬度
              └  longitude 会议室所在建筑经度
   */
  public static async createSpace(
    cpWXCore: CPWXCore,
    name: string,
    capacity: number,
    city?: string,
    building?: string,
    floor?: string,
    equipment?: Array<number>,
    coordinate?: { latitude: number; longitude: number }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addMeetingRoomUrl, token)
    const data = await this._http.post(url, {
      name,
      capacity,
      city,
      building,
      floor,
      equipment,
      coordinate,
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
   * 查询会议室
   * @param cpWXCore
   * @param city 会议室所在城市
   * @param building 	会议室所在楼宇
   * @param floor 会议室所在楼层
   * @param equipment 会议室支持的设备列表,参数详细含义见附录
   */
  public static async getMeetingRoomList(cpWXCore: CPWXCore, city?: string, building?: string, floor?: string, equipment?: Array<number>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getMeetingRoomListUrl, token)
    const data = await this._http.post(url, {
      city,
      building,
      floor,
      equipment,
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
   * 编辑会议室
   * @param cpWXCore
   * @param meetingRoomId	是	会议室的id
   * @param name 会议室名称，最多30个字符
   * @param capacity 会议室所能容纳的人数
   * @param city 会议室所在城市
   * @param building 	会议室所在楼宇
   * @param floor 会议室所在楼层
   * @param equipment 会议室支持的设备列表,参数详细含义见附录
   * @param coordinate 会议室所在建筑经纬度,可通过腾讯地图坐标拾取器获取
              └  latitude 会议室所在建筑纬度
              └  longitude 会议室所在建筑经度
   */
  public static async editMeetingRoom(
    cpWXCore: CPWXCore,
    meetingRoomId: number,
    name: string,
    capacity: number,
    city?: string,
    building?: string,
    floor?: string,
    equipment?: Array<number>,
    coordinate?: { latitude: number; longitude: number }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.editMeetingRoomUrl, token)
    const data = await this._http.post(url, {
      meetingroom_id: meetingRoomId,
      name,
      capacity,
      city,
      building,
      floor,
      equipment,
      coordinate,
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
   * 删除会议室
   * @param cpWXCore
   * @param meetingRoomId	是	会议室的id
   */
  public static async delMeetingRoom(cpWXCore: CPWXCore, meetingRoomId: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delMeetingRoomUrl, token)
    const data = await this._http.post(url, {
      meetingroom_id: meetingRoomId,
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
   * 查询会议室的预定信息
   * @param cpWXCore
   * @param meetingRoomId	是	会议室的id
   * @param startTime 查询预定的起始时间，默认为当前时间
   * @param endTime 查询预定的结束时间， 默认为明日0时
   * @param city 会议室所在城市
   * @param building 	会议室所在楼宇
   * @param floor 会议室所在楼层
   */
  public static async getBookInfo(cpWXCore: CPWXCore, meetingRoomId?: number, startTime?: number, endTime?: number, city?: string, building?: string, floor?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getBookInfoUrl, token)
    const data = await this._http.post(url, {
      meetingroom_id: meetingRoomId,
      start_time: startTime,
      end_time: endTime,
      city,
      building,
      floor,
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
   * 预定会议室
   * @param cpWXCore
   * @param meetingRoomId	是	会议室的id
   * @param startTime 预定开始时间
   * @param endTime 预定结束时间
   * @param booker	是	预定人的userid
   * @param attendees	否	参与人的userid列表
   * @param subject	否	会议主题
   */
  public static async bookMeetingRoom(cpWXCore: CPWXCore, meetingRoomId: number, startTime: number, endTime: number, booker: string, attendees?: Array<string>, subject?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.bookMeetingRoomUrl, token)
    const data = await this._http.post(url, {
      meetingroom_id: meetingRoomId,
      start_time: startTime,
      end_time: endTime,
      booker,
      attendees,
      subject,
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
   * 取消预定会议室
   * @param cpWXCore
   * @param meeting_id 会议的id
   * @param keep_schedule 是否保留日程，0-同步删除 1-保留
   */
  public static async cancelBookMeetingRoom(cpWXCore: CPWXCore, meetingId: number, keep_schedule?: 0 | 1) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.cancelBookMeetingRoomUrl, token)
    const data = await this._http.post(url, {
      meeting_id: meetingId,
      keep_schedule: keep_schedule,
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

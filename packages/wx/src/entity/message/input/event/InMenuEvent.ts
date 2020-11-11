import { InEventMsg } from './InEventMsg'
import { ScanCodeInfo } from './ScanCodeInfo'

export class InMenuEvent extends InEventMsg {
  // 点击菜单拉取消息时的事件推送： CLICK
  public static EVENT_INMENU_CLICK: string = 'CLICK'
  // 点击菜单跳转链接时的事件推送： VIEW
  public static EVENT_INMENU_VIEW: string = 'VIEW'
  // scancode_push：扫码推事件
  public static EVENT_INMENU_SCANCODE_PUSH: string = 'scancode_push'
  // scancode_waitmsg：扫码推事件且弹出“消息接收中”提示框
  public static EVENT_INMENU_scancode_waitmsg: string = 'scancode_waitmsg'
  // pic_sysphoto：弹出系统拍照发图
  public static EVENT_INMENU_PIC_SYSPHOTO: string = 'pic_sysphoto'
  // pic_photo_or_album：弹出拍照或者相册发图，先推送菜单事件，再推送图片消息
  public static EVENT_INMENU_PIC_PHOTO_OR_ALBUM: string = 'pic_photo_or_album'
  // pic_weixin：弹出微信相册发图器
  public static EVENT_INMENU_PIC_WEIXIN: string = 'pic_weixin'
  // location_select：弹出地理位置选择器
  public static EVENT_INMENU_LOCATION_SELECT: string = 'location_select'
  // media_id：下发消息（除文本消息）
  public static EVENT_INMENU_MEDIA_ID: string = 'media_id'
  // view_limited：跳转图文消息URL
  public static EVENT_INMENU_VIEW_LIMITED: string = 'view_limited'
  // view_miniprogram：点击菜单跳转小程序的事件推送
  public static EVENT_INMENU_VIEW_MINIPROGRAM: string = 'view_miniprogram'

  private eventKey: string
  private scanCodeInfo: ScanCodeInfo

  constructor(toUserName: string, fromUserName: string, createTime: number, event: string) {
    super(toUserName, fromUserName, createTime, event)
  }

  public get getEventKey(): string {
    return this.eventKey
  }

  public set setEventKey(eventKey: string) {
    this.eventKey = eventKey
  }

  public get getScanCodeInfo(): ScanCodeInfo {
    return this.scanCodeInfo
  }

  public set setScanCodeInfo(scanCodeInfo: ScanCodeInfo) {
    this.scanCodeInfo = scanCodeInfo
  }
}

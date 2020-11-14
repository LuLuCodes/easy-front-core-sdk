/**
 * @description 常用枚举
 */

export enum ScopeEnum {
  SNSAPI_BASE = 'snsapi_base',
  SNSAPI_USERINFO = 'snsapi_userinfo',
}

export enum Lang {
  ZH_CN = 'zh_CN',
  ZH_TW = 'zh_TW',
  EN = 'en',
}

export enum JsApiType {
  JSAPI = 'jsapi',
  WX_CARD = 'wx_card',
}

export enum CheckAction {
  DNS = 'dns',
  PING = 'ping',
  ALL = 'all',
}

export enum CheckOperator {
  CHINANET = 'CHINANET',
  UNICOM = 'UNICOM',
  CAP = 'CAP',
  DEFAULT = 'DEFAULT',
}

export enum MessageStatus {
  SEND_SUCCESS = 'SEND_SUCCESS',
  SENDING = 'SENDING',
  SEND_FAIL = 'SEND_FAIL',
  DELETE = 'DELETE',
}

/**
 * 上传临时素材的格式、大小限制与公众平台官网一致
 * 图片（image）: 2M，支持PNG\JPEG\JPG\GIF格式
 * 语音（voice）：2M，播放长度不超过60s，支持AMR\MP3格式
 * 视频（video）：10MB，支持MP4格式
 * 缩略图（thumb）：64KB，支持JPG格式
 */
export enum MediaType {
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  THUMB = 'thumb',
  NEWS = 'news',
}

/**ORC 类型
 *
 */
export enum OCRType {
  // 银行卡 OCR 识别
  BANKCARD = 'https://api.weixin.qq.com/cv/ocr/bankcard?access_token=%s',
  // 营业执照 OCR 识别
  BUSINESSLICENSE = 'https://api.weixin.qq.com/cv/ocr/bizlicense?access_token=%s',
  // 驾驶证 OCR 识别
  DRIVERLICENSE = 'https://api.weixin.qq.com/cv/ocr/drivinglicense?access_token=%s',
  // 身份证 OCR 识别
  IDCARD = 'https://api.weixin.qq.com/cv/ocr/idcard?access_token=%s',
  // 通用印刷体 OCR 识别
  PRINTEDTEXT = 'https://api.weixin.qq.com/cv/ocr/comm?access_token=%s',
  // 行驶证 OCR 识别
  VEHICLELICENSE = 'https://api.weixin.qq.com/cv/ocr/driving?access_token=%s',
}

export enum ImgProcessingType {
  // 图片智能裁剪
  AICROP = 'https://api.weixin.qq.com/cv/img/aicrop?access_token=%s',
  // 条码/二维码识别
  QRCODE = 'https://api.weixin.qq.com/cv/img/qrcode?access_token=%s',
  // 图片高清化
  SUPERRESOLUTION = 'https://api.weixin.qq.com/cv/img/superresolution?access_token=%s',
}

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

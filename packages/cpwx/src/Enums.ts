/**
 * 将通讯录和外部联系人作为系统级应用，方便管理access_toekn
 */
export enum SYSTEM_AGENT_ID {
  ADDRESS_BOOK = 'ADDRESS_BOOK', // 通讯录
  EXTERNAL_CONTACT = 'EXTERNAL_CONTACT', // 外部联系人
  WE_DRIVE = 'WE_DRIVE', // 微盘
}

export enum MediaType {
  IMAGE = 'image',
  VOICE = 'voice',
  VIDEO = 'video',
  FILE = 'file',
}

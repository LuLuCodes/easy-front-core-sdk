export enum MiniProgramMediaType {
  VOICE = 1,
  IMG = 2,
}

export enum MiniProgramCustomerMsgType {
  TEXT,
  IMAGE,
  LINK,
  MINIPROGRAMPAGE,
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

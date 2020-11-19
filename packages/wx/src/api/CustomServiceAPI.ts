import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { Article } from '../entity/message/output/Article'
import { MenuMsg } from '../entity/message/output/MenuMsg'

/**
 * @description 客服消息
 */
export class CustomServiceAPI {
  private static getKfListUrl: string = 'https://api.weixin.qq.com/cgi-bin/customservice/getkflist?access_token=%s'
  private static addKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/add?access_token=%s'
  private static inviteUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/inviteworker?access_token=%s'
  private static updateKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/update?access_token=%s'
  private static uploadKfHeadImgUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/uploadheadimg?access_token=%s&kf_account=%s'
  private static delKfAccountUrl: string = 'https://api.weixin.qq.com/customservice/kfaccount/del?access_token=%s&kf_account=%s'
  private static getOnlineUrl: string = 'https://api.weixin.qq.com/cgi-bin/customservice/getonlinekflist?access_token=%s'
  private static customMessageUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token=%s'
  private static typingUrl: string = 'https://api.weixin.qq.com/cgi-bin/message/custom/typing?access_token=%s'

  private static createSessionUrl: string = 'https://api.weixin.qq.com/customservice/kfsession/create?access_token=%s'
  private static closeSessionUrl: string = 'https: //api.weixin.qq.com/customservice/kfsession/close?access_token=%s'
  private static getSessionUrl: string = 'https://api.weixin.qq.com/customservice/kfsession/getsession?access_token=%s&openid=%s'
  private static getSessionListUrl: string = 'https://api.weixin.qq.com/customservice/kfsession/getsessionlist?access_token=%s&kf_account=%s'
  private static getWaitCaseUrl: string = 'https://api.weixin.qq.com/customservice/kfsession/getwaitcase?access_token=%s'

  private static getMsgRecordUrl: string = 'https://api.weixin.qq.com/customservice/msgrecord/getmsglist?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取所有客服账号
   * @param wxCore
   */
  public static async getKfList(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getKfListUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 添加客服帐号
   * @param wxCore
   * @param response
   * @param kf_account 完整客服账号，格式为：账号前缀@公众号微信
   * @param nickname 客服昵称，最长6个汉字或12个英文字符
   * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
   */
  public static async addKfAccount(wxCore: WXCore, kf_account: string, nickname: string, password?: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addKfAccountUrl, token)
    let map = new Map()
    map.set('kf_account', kf_account)
    map.set('nickname', nickname)
    if (password) {
      map.set('password', password)
    }

    const data = await this._http.post(url, JSON.stringify(map))
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 邀请绑定客服帐号
   * @param wxCore
   * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
   * @param inviteWx 接收绑定邀请的客服微信号
   */
  public static async inviteWorker(wxCore: WXCore, kf_account: string, inviteWx: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.inviteUrl, token)
    const data = await this._http.post(url, {
      kf_account: kf_account,
      invite_wx: inviteWx,
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
   * 设置客服信息
   * @param wxCore
   * @param response
   * @param kf_account
   * @param nickname
   * @param password 客服账号登录密码，格式为密码明文的32位加密MD5值。该密码仅用于在公众平台官网的多客服功能中使用，若不使用多客服功能，则不必设置密码
   */
  public static async updateKfAccount(wxCore: WXCore, kf_account: string, nickname: string, password?: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateKfAccountUrl, token)
    let map = new Map()
    map.set('kf_account', kf_account)
    map.set('nickname', nickname)
    if (password) {
      map.set('password', password)
    }
    const data = await this._http.post(url, JSON.stringify(map))
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 设置客服帐号的头像
   * @param wxCore
   * @param response
   * @param kf_account
   * @param filePath 头像图片文件必须是jpg格式，推荐使用640*640大小的图片以达到最佳效果
   */
  public static async uploadKfAccountHeadImg(wxCore: WXCore, kf_account: string, filePath: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.uploadKfHeadImgUrl, token, kf_account)
    const data = await this._http.upload(url, filePath)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除客服帐号
   * @param wxCore
   * @param response
   * @param kf_account
   */
  public static async delKfAccount(wxCore: WXCore, kf_account: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.delKfAccountUrl, token, kf_account)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取在线客服
   * @param wxCore
   */
  public static async getOnlineKfList(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getOnlineUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 发送客服消息
   * @param wxCore
   * @param response
   * @param json 各种消息的JSON数据包
   * @param kf_account 以某个客服帐号来发消息
   */
  public static async sendMsg(wxCore: WXCore, msgObj: any, kf_account?: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.customMessageUrl, token)
    if (kf_account) {
      msgObj.customservice = {
        kf_account: kf_account,
      }
    }

    const data = await this._http.post(url, msgObj)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 发送文本客服消息
   * @param wxCore
   * @param response
   * @param openId
   * @param text
   */
  public static async sendText(wxCore: WXCore, openId: string, text: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'text',
        text: {
          content: text,
        },
      },
      kf_account
    )
  }

  /**
   * 发送图片消息
   * @param wxCore
   * @param response
   * @param openId
   * @param text
   */
  public static async sendImage(wxCore: WXCore, openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'image',
        image: {
          media_id: media_id,
        },
      },
      kf_account
    )
  }

  /**
   * 发送语音消息
   * @param wxCore
   * @param response
   * @param openId
   * @param media_id
   */
  public static async sendVoice(wxCore: WXCore, openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'voice',
        voice: {
          media_id: media_id,
        },
      },
      kf_account
    )
  }

  /**
   * 发送视频消息
   * @param wxCore
   * @param response
   * @param openId
   * @param media_id
   * @param title
   * @param description
   */
  public static async sendVideo(wxCore: WXCore, openId: string, media_id: string, title: string, description: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'video',
        video: {
          media_id: media_id,
          title: title,
          description: description,
        },
      },
      kf_account
    )
  }

  /**
   * 发送音乐消息
   * @param wxCore
   * @param response
   * @param openId
   * @param title
   * @param description
   * @param musicurl
   * @param hqmusicurl
   * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
   */
  public static async sendMusic(
    wxCore: WXCore,
    openId: string,
    title: string,
    description: string,
    musicurl: string,
    hqmusicurl: string,
    thumb_media_id: string,
    kf_account?: string
  ) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'music',
        music: {
          title: title,
          description: description,
          musicurl: musicurl,
          hqmusicurl: hqmusicurl,
          thumb_media_id: thumb_media_id,
        },
      },
      kf_account
    )
  }

  /**
   * 发送图文消息
   * @param wxCore
   * @param response
   * @param openId
   * @param articles
   * @param accessToken
   */
  public static async sendNews(wxCore: WXCore, openId: string, articles: Article[], kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'news',
        news: {
          articles: articles,
        },
      },
      kf_account
    )
  }

  /**
   * 发送图文消息（点击跳转到图文消息页面）
   * @param wxCore
   * @param response
   * @param openId
   * @param media_id
   * @param accessToken
   */
  public static async sendMpNews(wxCore: WXCore, openId: string, media_id: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'mpnews',
        mpnews: {
          media_id: media_id,
        },
      },
      kf_account
    )
  }

  /**
   * 发送菜单消息
   * @param wxCore
   * @param response
   * @param openId
   * @param head_content
   * @param list
   * @param tail_content
   */
  public static async sendMenu(wxCore: WXCore, openId: string, head_content: string, list: MenuMsg[], tail_content: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'msgmenu',
        msgmenu: {
          head_content: head_content,
          list: list,
          tail_content: tail_content,
        },
      },
      kf_account
    )
  }

  /**
   * 发送卡券
   * @param wxCore
   * @param response
   * @param openId
   * @param card_id
   */
  public static async sendCoupon(wxCore: WXCore, openId: string, card_id: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'wxcard',
        wxcard: {
          card_id: card_id,
        },
      },
      kf_account
    )
  }

  /**
   * 发送小程序卡片（要求小程序与公众号已关联）
   * @param wxCore
   * @param openId
   * @param title
   * @param appid
   * @param pagepath
   * @param thumb_media_id 缩略图/小程序卡片图片的媒体ID，小程序卡片图片建议大小为520*416
   */
  public static async sendMiniProgramPage(wxCore: WXCore, openId: string, title: string, appid: string, pagepath: string, thumb_media_id: string, kf_account?: string) {
    return this.sendMsg(
      wxCore,
      {
        touser: openId,
        msgtype: 'miniprogrampage',
        miniprogrampage: {
          title: title,
          appid: appid,
          pagepath: pagepath,
          thumb_media_id: thumb_media_id,
        },
      },
      kf_account
    )
  }

  /**
   * 客服输入状态
   * @param wxCore
   * @param response
   * @param openId
   * @param command "Typing"：对用户下发“正在输入"状态,"CancelTyping"：取消对用户的”正在输入"状态
   */
  public static async sendTyping(wxCore: WXCore, openId: string, command: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.typingUrl, token)
    const data = await this._http.post(url, {
      touser: openId,
      command: command,
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
   * 创建会话
   * @param wxCore
   * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
   * @param openid
   */
  public static async createSession(wxCore: WXCore, kf_account: string, openid: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createSessionUrl, token)
    const data = await this._http.post(url, {
      kf_account,
      openid,
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
   * 关闭会话
   * @param wxCore
   * @param kf_account 完整客服帐号，格式为：帐号前缀@公众号微信号
   * @param openid
   */
  public static async closeSession(wxCore: WXCore, kf_account: string, openid: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.closeSessionUrl, token)
    const data = await this._http.post(url, {
      kf_account,
      openid,
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
   * 获取会话状态
   * @param wxCore
   * @param openid
   */
  public static async getSession(wxCore: WXCore, openid: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getSessionUrl, token, openid)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取客服会话列表
   * @param wxCore
   * @param kf_account
   */
  public static async getSessionList(wxCore: WXCore, kf_account: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getSessionListUrl, token, kf_account)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取未接入会话列表
   * @param wxCore
   */
  public static async getWaitCase(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getWaitCaseUrl, token)
    const data = await this._http.get(url)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 获取聊天记录
   * @param wxCore
   * @param starttime	起始时间，unix时间戳
   * @param endtime	结束时间，unix时间戳，每次查询时段不能超过24小时
   * @param msgid	消息id顺序从小到大，从1开始
   * @param number	每次获取条数，最多10000条
   */
  public static async getMsgRecord(wxCore: WXCore, starttime: number, endtime: number, msgid: number, num: number) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMsgRecordUrl, token)
    const data = await this._http.post(url, {
      starttime,
      endtime,
      msgid,
      number: num,
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

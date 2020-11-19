import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 外部联系人管理接口
 */
export class ExContactAPI {
  private static getFollowUserListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_follow_user_list?access_token=%s'
  private static addContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_contact_way?access_token=%s'
  private static updateContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/update_contact_way?access_token=%s'
  private static getContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_contact_way?access_token=%s'
  private static delContactWayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/del_contact_way?access_token=%s'
  private static getUserListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/list?access_token=%s&userid=%s'
  private static getUserInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get?access_token=%s&external_userid=%s'
  private static getBatchUserInfoUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/batch/get_by_user?access_token=%s'
  private static updateRemarkUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/remark?access_token=%s'
  private static getCorpTagListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_corp_tag_list?access_token=%s'
  private static addCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_corp_tag?access_token=%s'
  private static editCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/edit_corp_tag?access_token=%s'
  private static delCorpTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/del_corp_tag?access_token=%s'
  private static markTagUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/mark_tag?access_token=%s'
  private static getGroupChatListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/list?access_token=%s'
  private static getGroupChatUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/get?access_token=%s'
  private static addMsgTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/add_msg_template?access_token=%s'
  private static getGroupMsgResultUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_group_msg_result?access_token=%s'
  private static sendWelcomeMsgUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/send_welcome_msg?access_token=%s'
  private static addGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/add?access_token=%s'
  private static editGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/edit?access_token=%s'
  private static getGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/get?access_token=%s'
  private static delGroupWelcomeTemplateUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/group_welcome_template/del?access_token=%s'
  private static getUnAssignedListUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_unassigned_list?access_token=%s'
  private static getTransferResultUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_transfer_result?access_token=ACCESS_TOKEN'
  private static transferContactUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/transfer?access_token=%s'
  private static transferGroupChatUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/transfer?access_token=%s'
  private static getUserBehaviorDataUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/get_user_behavior_data?access_token=%s'
  private static getGroupChatStatisticUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/statistic?access_token=%s'
  private static getGroupChatStatisticByDayUrl = 'https://qyapi.weixin.qq.com/cgi-bin/externalcontact/groupchat/statistic_group_by_day?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 获取配置了客户联系功能的成员列表
   * @param cpWXCore
   */
  public static async getFollowUserList(cpWXCore: CPWXCore) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getFollowUserListUrl, token)
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
   * 配置客户联系「联系我」方式
   * @param cpWXCore
   * @param type 联系方式类型,1-单人, 2-多人
   * @param scene 场景，1-在小程序中联系，2-通过二维码联系，3-在线问诊
   * @param style 在小程序中联系时使用的控件样式
   * @param remark 联系方式的备注信息，用于助记，不超过30个字符
   * @param skipVerify 外部客户添加时是否无需验证，默认为true
   * @param state 自定义的state参数
   * @param user 使用该联系方式的用户userID列表，在type为1时为必填，且只能有一个
   * @param party 使用该联系方式的部门id列表，只在type为2时有效
   * @param is_temp 是否临时会话模式，true表示使用临时会话模式，默认为false
   * @param expires_in 临时会话二维码有效期，以秒为单位。该参数仅在is_temp为true时有效，默认7天
   * @param chat_expires_in 临时会话有效期，以秒为单位。该参数仅在is_temp为true时有效，默认为添加好友后24小时
   * @param unionid 可进行临时会话的客户unionid，该参数仅在is_temp为true时有效，如不指定则不进行限制
   * @param conclusions 结束语，会话结束时自动发送给客户，可参考“结束语定义”，仅在is_temp为true时有效
   */
  public static async addContactWay(
    cpWXCore: CPWXCore,
    type: number,
    scene: number,
    style?: number,
    remark?: string,
    skipVerify?: boolean,
    state?: string,
    user?: Array<string>,
    party?: Array<string>,
    isTemp?: boolean,
    expiresIn?: number,
    chatExpiresIn?: number,
    unionid?: string,
    conclusions?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addContactWayUrl, token)
    const data = await this._http.post(url, {
      type: type,
      scene: scene,
      style: style,
      remark: remark,
      skip_verify: skipVerify,
      state: state,
      user: user,
      party: party,
      is_temp: isTemp,
      expires_in: expiresIn,
      chat_expires_in: chatExpiresIn,
      unionid,
      conclusions,
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
   * 更新企业已配置的「联系我」方式
   * @param cpWXCore
   * @param configId 企业联系方式的配置id
   * @param style 样式，只针对“在小程序中联系”的配置生效
   * @param remark 联系方式的备注信息，不超过30个字符，将覆盖之前的备注
   * @param skipVerify 外部客户添加时是否无需验证
   * @param state 企业自定义的state参数，用于区分不同的添加渠道
   * @param user 使用该联系方式的用户列表，将覆盖原有用户列表
   * @param party 使用该联系方式的部门列表，将覆盖原有部门列表，只在配置的type为2时有效
   * @param expires_in 临时会话二维码有效期，以秒为单位。该参数仅在is_temp为true时有效，默认7天
   * @param chat_expires_in 临时会话有效期，以秒为单位。该参数仅在is_temp为true时有效，默认为添加好友后24小时
   * @param unionid 可进行临时会话的客户unionid，该参数仅在is_temp为true时有效，如不指定则不进行限制
   * @param conclusions 结束语，会话结束时自动发送给客户，可参考“结束语定义”，仅在is_temp为true时有效
   */
  public static async updateContactWay(
    cpWXCore: CPWXCore,
    configId: string,
    style?: number,
    remark?: string,
    skipVerify?: boolean,
    state?: string,
    user?: Array<string>,
    party?: Array<string>,
    expiresIn?: number,
    chatExpiresIn?: number,
    unionid?: string,
    conclusions?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateContactWayUrl, token)
    const data = await this._http.post(url, {
      config_id: configId,
      style: style,
      remark: remark,
      skip_verify: skipVerify,
      state: state,
      user: user,
      party: party,
      expires_in: expiresIn,
      chat_expires_in: chatExpiresIn,
      unionid,
      conclusions,
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
   * 获取企业已配置的「联系我」方式
   * @param cpWXCore
   * @param configId 联系方式的配置id
   */
  public static async getContactWay(cpWXCore: CPWXCore, configId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getContactWayUrl, token)
    const data = await this._http.post(url, {
      config_id: configId,
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
   * 删除企业已配置的「联系我」方式
   * @param cpWXCore
   * @param configId 联系方式的配置id
   */
  public static async delContactWay(cpWXCore: CPWXCore, configId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delContactWayUrl, token)
    const data = await this._http.post(url, {
      config_id: configId,
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
   * 获取客户列表
   * @param cpWXCore
   * @param userId 企业成员的userid
   */
  public static async getUserList(cpWXCore: CPWXCore, userId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserListUrl, token, userId)
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
   * 获取客户详情
   * @param cpWXCore
   * @param externalUserId 外部联系人的userid
   */
  public static async getUserInfo(cpWXCore: CPWXCore, externalUserId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserInfoUrl, token, externalUserId)
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
   * 批量获取客户详情
   * @param cpWXCore
   * @param userId 企业成员的userid，字符串类型
   * @param cursor 用于分页查询的游标，字符串类型，由上一次调用返回，首次调用可不填
   * @param limit 返回的最大记录数，整型，最大值100，默认值50，超过最大值时取最大值
   */

  public static async getBatchUserInfo(cpWXCore: CPWXCore, userId: string, cursor?: string, limit?: number) {
    if (!limit || limit < 0 || limit > 100) {
      limit = 50
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getBatchUserInfoUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      cursor,
      limit,
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
   * 修改客户备注信息
   * @param cpWXCore
   * @param userId
   * @param externalUserId
   * @param remark
   * @param description
   * @param remarkCompany
   * @param remarkMobiles
   * @param remarkPicMediaid
   */
  public static async updateRemark(
    cpWXCore: CPWXCore,
    userId: string,
    externalUserId: string,
    remark?: string,
    description?: string,
    remarkCompany?: string,
    remarkMobiles?: Array<string>,
    remarkPicMediaid?: string
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.updateRemarkUrl, token, externalUserId)
    const data = await this._http.post(url, {
      userid: userId,
      external_userid: externalUserId,
      remark: remark,
      description: description,
      remark_company: remarkCompany,
      remark_mobiles: remarkMobiles,
      remark_mediaid: remarkPicMediaid,
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
   * 获取企业标签库
   * @param cpWXCore
   * @param tagId
   */
  public static async getCorpTagList(cpWXCore: CPWXCore, tagId?: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getCorpTagListUrl, token)
    const data = await this._http.post(url, {
      tag_id: tagId,
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
   * 添加企业客户标签
   * @param cpWXCore
   * @param groupId 标签组id
   * @param groupName 标签组名称
   * @param order 标签组次序值
   * @param tag 标签列表
   */
  public static async addCorpTag(cpWXCore: CPWXCore, groupId?: string, groupName?: string, order?: number, tag?: Array<{ name: string; order?: number }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addCorpTagUrl, token)
    const data = await this._http.post(url, {
      group_id: groupId,
      group_name: groupName,
      order: order,
      tag: tag,
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
   * 编辑企业客户标签
   * @param cpWXCore
   * @param id 标签或标签组的id列表
   * @param name 新的标签或标签组名称
   * @param order 标签/标签组的次序值
   */
  public static async editCorpTag(cpWXCore: CPWXCore, id: string, name?: string, order?: number) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.editCorpTagUrl, token)
    const data = await this._http.post(url, {
      id: id,
      name: name,
      order: order,
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
   * 删除企业客户标签
   * @param cpWXCore
   * @param tagId 标签的id列表
   * @param groupId 标签组的id列表
   */
  public static async delCorpTag(cpWXCore: CPWXCore, tagId?: Array<string>, groupId?: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delCorpTagUrl, token)
    const data = await this._http.post(url, {
      tag_id: tagId,
      group_id: groupId,
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
   * 编辑客户企业标签
   * @param cpWXCore
   * @param userId 添加外部联系人的userid
   * @param externalUserId 外部联系人userid
   * @param addTag 要标记的标签列表
   * @param removeTag 要移除的标签列表
   */
  public static async markTag(cpWXCore: CPWXCore, userId: string, externalUserId: string, addTag?: Array<string>, removeTag?: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.markTagUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      external_userid: externalUserId,
      add_tag: addTag,
      remove_tag: removeTag,
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
   * 获取客户群列表
   * @param cpWXCore
   * @param offset 分页，偏移量
   * @param limit 分页，预期请求的数据量，取值范围 1 ~ 1000
   * @param statusFilter 群状态过滤。0 - 普通列表 1 - 离职待继承 2 - 离职继承中 3 - 离职继承完成
   * @param ownerFilter 群主过滤。如果不填，表示获取全部群主的数据
   */
  public static async getGroupChatList(
    cpWXCore: CPWXCore,
    offset: number,
    limit: number,
    statusFilter = 0,
    ownerFilter?: { userid_list: Array<string>; partyid_list: Array<string> }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupChatListUrl, token)
    const data = await this._http.post(url, {
      status_filter: statusFilter,
      owner_filter: ownerFilter,
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

  /**
   * 获取客户群详情
   * @param cpWXCore
   * @param chatId 客户群ID
   */
  public static async getGroupChat(cpWXCore: CPWXCore, chatId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupChatUrl, token)
    const data = await this._http.post(url, {
      chat_id: chatId,
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
   * 添加企业群发消息任务
   * @param cpWXCore
   * @param chat_type	群发任务的类型，默认为single，表示发送给客户，group表示发送给客户群
   * @param externalUserId 客户的外部联系人id列表，不可与sender同时为空，最多可传入1万个客户
   * @param sender 发送企业群发消息的成员userid，不可与external_userid同时为空
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   */
  public static async addMsgTemplate(
    cpWXCore: CPWXCore,
    chatType: 'single' | 'group' = 'single',
    externalUserId?: Array<string>,
    sender?: string,
    text?: {
      content: string
    },
    image?: {
      media_id?: string
      pic_url?: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addMsgTemplateUrl, token)
    const data = await this._http.post(url, {
      chat_type: chatType,
      external_userid: externalUserId,
      sender: sender,
      text: text,
      image: image,
      link: link,
      miniprogram: miniprogram,
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
   * 获取企业群发消息发送结果
   * @param cpWXCore
   * @param msgId 群发消息的id
   */
  public static async getGroupMsgResult(cpWXCore: CPWXCore, msgId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupMsgResultUrl, token)
    const data = await this._http.post(url, {
      msgid: msgId,
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
   * 发送新客户欢迎语
   * @param cpWXCore
   * @param welcomeCode 通过添加外部联系人事件推送给企业的发送欢迎语的凭证，有效期为20秒
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   */
  public static async sendWelcomeMsg(
    cpWXCore: CPWXCore,
    welcomeCode: string,
    text?: {
      content: string
    },
    image?: {
      media_id?: string
      pic_url?: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.sendWelcomeMsgUrl, token)
    const data = await this._http.post(url, {
      welcome_code: welcomeCode,
      text: text,
      image: image,
      link: link,
      miniprogram: miniprogram,
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
   * 添加群欢迎语素材
   * @param cpWXCore
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息

   */
  public static async addGroupWelcomeTemplate(
    cpWXCore: CPWXCore,
    text?: {
      content: string
    },
    image?: {
      media_id?: string
      pic_url?: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addGroupWelcomeTemplateUrl, token)
    const data = await this._http.post(url, {
      text: text,
      image: image,
      link: link,
      miniprogram: miniprogram,
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
   * 编辑群欢迎语素材
   * @param cpWXCore
   * @param templateId 群欢迎语的素材id
   * @param text 文本消息
   * @param image 图片消息
   * @param link 链接消息
   * @param miniprogram 小程序消息
   */
  public static async editGroupWelcomeTemplate(
    cpWXCore: CPWXCore,
    templateId: string,
    text?: {
      content: string
    },
    image?: {
      media_id?: string
      pic_url?: string
    },
    link?: {
      title: string
      url: string
      picurl?: string
      desc?: string
    },
    miniprogram?: {
      title: string
      pic_media_id: string
      appid: string
      page: string
    }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.editGroupWelcomeTemplateUrl, token)
    const data = await this._http.post(url, {
      template_id: templateId,
      text: text,
      image: image,
      link: link,
      miniprogram: miniprogram,
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
   * 获取群欢迎语素材
   * @param cpWXCore
   * @param templateId 群欢迎语的素材id
   */
  public static async getGroupWelcomeTemplate(cpWXCore: CPWXCore, templateId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupWelcomeTemplateUrl, token)
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
   * 删除群欢迎语素材
   * @param cpWXCore
   * @param templateId 群欢迎语的素材id
   */
  public static async delGroupWelcomeTemplate(cpWXCore: CPWXCore, templateId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delGroupWelcomeTemplateUrl, token)
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
   * 外部联系人再分配
   * @param cpWXCore
   * @param externalUserId 外部联系人的userid，注意不是企业成员的帐号
   * @param handOverUserId 离职成员的userid
   * @param takeOverUserId 接替成员的userid
   * @param transferSuccessMsg 接替成员的userid
   */
  public static async transferContact(cpWXCore: CPWXCore, externalUserId: string, handOverUserId: string, takeOverUserId: string, transferSuccessMsg?: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.transferContactUrl, token)
    const data = await this._http.post(url, {
      external_userid: externalUserId,
      handover_userid: handOverUserId,
      takeover_userid: takeOverUserId,
      transfer_success_msg: transferSuccessMsg,
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
   * 获取离职成员的客户列表
   * @param cpWXCore
   * @param pageId
   * @param pageSize
   * @param cursor
   */
  public static async getUnAssignedList(cpWXCore: CPWXCore, pageId?: number, pageSize?: number, cursor?: string) {
    if (!pageId || pageId < 0) {
      pageId = 0
    }
    if (!pageSize || pageSize < 0) {
      pageId = 100
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUnAssignedListUrl, token)
    const data = await this._http.post(url, {
      page_id: pageId,
      page_size: pageSize,
      cursor,
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
   * 查询客户接替结果
   * @param cpWXCore
   * @param externalUserId 外部联系人的userid，注意不是企业成员的帐号
   * @param handOverUserId 离职成员的userid
   * @param takeOverUserId 接替成员的userid
   */
  public static async getTransferResult(cpWXCore: CPWXCore, externalUserId: string, handOverUserId: string, takeOverUserId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getTransferResultUrl, token)
    const data = await this._http.post(url, {
      external_userid: externalUserId,
      handover_userid: handOverUserId,
      takeover_userid: takeOverUserId,
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
   * 离职成员的群再分配
   * @param cpWXCore
   * @param chatIdList 需要转群主的客户群ID列表
   * @param newOwner 新群主ID
   */
  public static async transferGroupChat(cpWXCore: CPWXCore, chatIdList: Array<string>, newOwner: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.transferGroupChatUrl, token)
    const data = await this._http.post(url, {
      chat_id_list: chatIdList,
      new_owner: newOwner,
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
   * 获取联系客户统计数据
   * @param cpWXCore
   * @param startTime 数据起始时间
   * @param endTime 数据结束时间
   * @param userId 用户ID列表
   * @param partyId 部门ID列表
   */
  public static async getUserBehaviorData(cpWXCore: CPWXCore, startTime: number, endTime: number, userId?: Array<string>, partyId?: Array<number>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getUserBehaviorDataUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      partyid: partyId,
      start_time: startTime,
      end_time: endTime,
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
   * 获取客户群统计数据(按群主聚合的方式)
   * @param cpWXCore
   * @param dayBeginTime 起始日期的时间戳，填当天的0时0分0秒（否则系统自动处理为当天的0分0秒）。取值范围：昨天至前180天。
   * @param dayEndTime 结束日期的时间戳，填当天的0时0分0秒（否则系统自动处理为当天的0分0秒）。取值范围：昨天至前180天。
                       如果不填，默认同 day_begin_time（即默认取一天的数据）
   * @param ownerFilter 群主过滤，如果不填，表示获取全部群主的数据
   * @param orderBy 排序方式。1 - 新增群的数量 2 - 群总数 3 - 新增群人数 4 - 群总人数
   * @param orderAsc 是否升序。0-否；1-是。默认降序
   * @param offset 分页，偏移量, 默认为0
   * @param limit 分页，预期请求的数据量，默认为500，取值范围 1 ~ 1000

   */
  public static async getGroupChatStatistic(
    cpWXCore: CPWXCore,
    dayBeginTime: number,
    dayEndTime: number,
    ownerFilter?: {
      userid_list?: Array<string>
      partyid_list?: Array<number>
    },
    orderBy?: number,
    orderAsc?: number,
    offset?: number,
    limit?: number
  ) {
    if (!orderBy || orderBy < 1 || orderBy > 4) {
      orderBy = 1
    }
    if (!orderAsc || orderBy < 0 || orderBy > 1) {
      orderBy = 0
    }
    if (!offset || offset < 0) {
      orderBy = 0
    }
    if (!limit || limit < 1 || limit > 1000) {
      orderBy = 500
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupChatStatisticUrl, token)
    const data = await this._http.post(url, {
      day_begin_time: dayBeginTime,
      day_end_time: dayEndTime,
      owner_filter: ownerFilter,
      order_by: orderBy,
      order_asc: orderAsc,
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

  /**
   * 获取客户群统计数据(按自然日聚合的方式)
   * @param cpWXCore
   * @param dayBeginTime 起始日期的时间戳，填当天的0时0分0秒（否则系统自动处理为当天的0分0秒）。取值范围：昨天至前180天。
   * @param dayEndTime 结束日期的时间戳，填当天的0时0分0秒（否则系统自动处理为当天的0分0秒）。取值范围：昨天至前180天。
                       如果不填，默认同 day_begin_time（即默认取一天的数据）
   * @param ownerFilter 群主过滤，如果不填，表示获取全部群主的数据
   */
  public static async getGroupChatStatisticByDay(
    cpWXCore: CPWXCore,
    dayBeginTime: number,
    dayEndTime: number,
    ownerFilter?: {
      userid_list?: Array<string>
      partyid_list?: Array<number>
    }
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getGroupChatStatisticByDayUrl, token)
    const data = await this._http.post(url, {
      day_begin_time: dayBeginTime,
      day_end_time: dayEndTime,
      owner_filter: ownerFilter,
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

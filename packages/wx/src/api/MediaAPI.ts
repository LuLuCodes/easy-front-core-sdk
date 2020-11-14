import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'
import { MediaType } from '../Enums'

export class MediaArticles {
  // 标题
  private title: string
  // 图文消息的封面图片素材id（必须是永久mediaID）
  private thumb_media_id: string
  // 作者
  private author: string | undefined
  // 图文消息的摘要，仅有单图文消息才有摘要，多图文此处为空
  private digest: string | undefined
  // 是否显示封面，0为false，即不显示，1为true，即显示
  private show_cover_pic: boolean
  // 图文消息的具体内容，支持HTML标签，必须少于2万字符，小于1M，且此处会去除JS
  private content: string
  // 图文消息的原文地址，即点击“阅读原文”后的URL
  private content_source_url: string
  // 是否打开评论，0不打开，1打开
  private need_open_comment: number | undefined
  // 是否粉丝才可评论，0所有人可评论，1粉丝才可评论
  private only_fans_can_comment: number | undefined

  constructor(
    title: string,
    thumb_media_id: string,
    show_cover_pic: boolean,
    content: string,
    content_source_url: string,
    author?: string,
    digest?: string,
    need_open_comment?: number,
    only_fans_can_comment?: number
  ) {
    this.title = title
    this.thumb_media_id = thumb_media_id
    this.author = author
    this.digest = digest
    this.show_cover_pic = show_cover_pic
    this.content = content
    this.content_source_url = content_source_url
    this.need_open_comment = need_open_comment
    this.only_fans_can_comment = only_fans_can_comment
  }
}

/**
 * @description 素材管理
 */
export class MediaAPI {
  private static uploadUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/upload?access_token=%s&type=%s'
  private static getMediaUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/get?access_token=%s&media_id=%s'
  private static getJssdkMediaUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/get/jssdk?access_token=%s'
  private static addNewsUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=%s'
  private static updateNewsUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/update_news?access_token=%s'
  private static uploadImgUrl: string = 'https://api.weixin.qq.com/cgi-bin/media/uploadimg?access_token=%s'
  private static getMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=%s'
  private static delMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/del_material?access_token=%s'
  private static addMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/add_material?access_token=%s&type=%s'
  private static getMaterialCountUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token=%s'
  private static batchGetMaterialUrl: string = 'https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token=%s'

  private static _http = Http.getInstance()
  /**
   * 新增临时素材
   * @param wxCore
   * @param filePath
   * @param mediaType
   */
  public static async uploadMedia(wxCore: WXCore, filePath: string, mediaType: MediaType) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.uploadUrl, token, mediaType)
    const data = await this._http.upload(url, filePath)
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
   * 获取临时素材
   * @param wxCore
   * @param mediaId
   */
  public static async getMedia(wxCore: WXCore, mediaId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMediaUrl, token, mediaId)
    const data = await this._http.get(url)
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
   * 高清语音素材获取接口
   * 公众号可以使用本接口获取从JSSDK的uploadVoice接口上传的临时语音素材，格式为speex，16K采样率。
   * 该音频比上文的临时素材获取接口（格式为amr，8K采样率）更加清晰，适合用作语音识别等对音质要求较高的业务。
   * @param wxCore
   * @param mediaId
   */
  public static async getJssdkMedia(wxCore: WXCore, mediaId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getJssdkMediaUrl, token, mediaId)
    const data = await this._http.get(url)
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
   * 新增永久图文素材
   * @param wxCore
   * @param mediaId
   */
  public static async addNews(wxCore: WXCore, mediaArticles: MediaArticles[]) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addNewsUrl, token)

    const data = await this._http.post(url, {
      articles: mediaArticles,
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
   * 修改永久图文素材
   * @param wxCore
   * @param mediaId 要修改的图文消息的id
   * @param index 要更新的文章在图文消息中的位置（多图文消息时，此字段才有意义），第一篇为0
   * @param mediaArticles
   */
  public static async updateNews(wxCore: WXCore, mediaId: string, index: number, mediaArticles: MediaArticles) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updateNewsUrl, token)

    const data = await this._http.post(url, {
      media_id: mediaId,
      index: index,
      articles: mediaArticles,
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
   * 上传图文消息内的图片获取URL
   * 本接口所上传的图片不占用公众号的素材库中图片数量的5000个的限制。
   * 图片仅支持jpg/png格式，大小必须在1MB以下。
   * @param wxCore
   * @param filePath
   */
  public static async uploadImg(wxCore: WXCore, filePath: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.uploadImgUrl, token)
    const data = await this._http.upload(url, filePath)
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
   * 新增其他类型永久素材
   * 如果是添加视频请使用 addVideoMaterial
   * @param wxCore
   * @param filePath
   * @param mediaType
   */
  public static async addMaterial(wxCore: WXCore, filePath: string, mediaType: MediaType) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addMaterialUrl, token, mediaType)
    const data = await this._http.upload(url, filePath)
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
   * 新增 video 类型永久素材
   * @param wxCore
   * @param filePath
   * @param title
   * @param introduction
   */
  public static async addVideoMaterial(wxCore: WXCore, filePath: string, title: string, introduction: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addMaterialUrl, token, MediaType.VIDEO)
    const data = await this._http.upload(
      url,
      filePath,
      JSON.stringify({
        title: title,
        introduction: introduction,
      })
    )
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
   * 获取永久素材
   * @param wxCore
   * @param mediaId
   */
  public static async getMaterial(wxCore: WXCore, mediaId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMaterialUrl, token)
    const data = await this._http.post(url, {
      media_id: mediaId,
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
   * 删除永久素材
   * @param wxCore
   * @param mediaId
   */
  public static async delMaterial(wxCore: WXCore, mediaId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.delMaterialUrl, token)
    const data = await this._http.post(url, {
      media_id: mediaId,
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
   * 获取素材总数
   * @param wxCore
   */
  public static async getMaterialCount(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMaterialCountUrl, token)
    const data = await this._http.get(url)
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
   * 获取素材列表
   * @param wxCore
   * @param mediaType 素材的类型，图片（image）、视频（video）、语音 （voice）、图文（news）
   * @param offset 从全部素材的该偏移位置开始返回，0表示从第一个素材 返回
   * @param count 返回素材的数量，取值在1到20之间
   */
  public static async batchGetMaterial(wxCore: WXCore, mediaType: MediaType, offset: number = 0, count: number = 1) {
    if (offset < 0) {
      offset = 0
    }
    if (count > 20) {
      count = 20
    }
    if (count < 1) {
      count = 1
    }
    const token = await wxCore.getAccessToken()
    const url = util.format(this.batchGetMaterialUrl, token)
    const data = await this._http.post(url, {
      type: mediaType,
      offset: offset,
      count: count,
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
}

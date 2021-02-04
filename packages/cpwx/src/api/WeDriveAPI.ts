import * as util from 'util'
import { CPWXCore } from '../CPWXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 微盘接口
 */
export class WeDriveAPI {
  private static createSpaceUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_create?access_token=%s'
  private static renameSpaceUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_rename?access_token=%s'
  private static dismissSpaceUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_dismiss?access_token=%s'
  private static getSpaceInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_info?access_token=%s'
  private static addSpaceAclUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_acl_add?access_token=%s'
  private static delSpaceAclUrl: string = 'https: //qyapi.weixin.qq.com/cgi-bin/wedrive/space_acl_del?access_token=%s'
  private static settingSpaceUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_setting?access_token=%s'
  private static getSpaceShareUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/space_share?access_token=%s'

  private static getFileListUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_list?access_token=%s'
  private static uploadFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_upload?access_token=%s'
  private static downloadFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_download?access_token=%s'
  private static createFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_create?access_token=%s'
  private static renameFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_rename?access_token=%s'
  private static moveFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_move?access_token=%s'
  private static deleteFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_delete?access_token=%s'
  private static getFileInfoUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_info?access_token=%s'

  private static addFileAclUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_acl_add?access_token=%s'
  private static delFileAclUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_acl_del?access_token=%s'
  private static settingFileUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_setting?access_token=%s'
  private static getFileShareUrl: string = 'https://qyapi.weixin.qq.com/cgi-bin/wedrive/file_share?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 新建空间
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceName 空间标题
   * @param authInfo 空间其他成员信息
              └  type 成员类型 1:个人 2:部门
              └  userid 成员userid,字符串
              └  departmentid 部门departmentid, 32位整型范围是[0, 2^32)
              └  auth 成员权限 1:可下载 2:可编辑 4:可预览（仅专业版企业可设置）
   */
  public static async createSpace(
    cpWXCore: CPWXCore,
    userId: string,
    spaceName: string,
    authInfo?: Array<{ type?: 1 | 2; userid?: string; departmentid?: string; auth: 1 | 2 | 4 }>
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createSpaceUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      space_name: spaceName,
      auth_info: authInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 重命名空间
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param spaceName 空间标题
   */
  public static async renameSpace(cpWXCore: CPWXCore, userId: string, spaceId: string, spaceName: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.renameSpaceUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      space_name: spaceName,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 解散空间
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   */
  public static async dismissSpace(cpWXCore: CPWXCore, userId: string, spaceId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.dismissSpaceUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取空间信息
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   */
  public static async getSpaceInfo(cpWXCore: CPWXCore, userId: string, spaceId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getSpaceInfoUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 添加成员/部门
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param authInfo 空间其他成员信息
              └  type 成员类型 1:个人 2:部门
              └  userid 成员userid,字符串
              └  departmentid 部门departmentid, 32位整型范围是[0, 2^32)
              └  auth 成员权限 1:可下载 2:可编辑 4:可预览（仅专业版企业可设置）
   */
  public static async addSpaceAcl(
    cpWXCore: CPWXCore,
    userId: string,
    spaceId: string,
    authInfo?: Array<{ type?: 1 | 2; userid?: string; departmentid?: string; auth: 1 | 2 | 4 }>
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addSpaceAclUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      auth_info: authInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 移除成员/部门
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param authInfo 空间其他成员信息
              └  type 成员类型 1:个人 2:部门
              └  userid 成员userid,字符串
              └  departmentid 部门departmentid, 32位整型范围是[0, 2^32)
   */
  public static async delSpaceAcl(cpWXCore: CPWXCore, userId: string, spaceId: string, authInfo?: Array<{ type?: 1 | 2; userid?: string; departmentid?: string }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delSpaceAclUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      auth_info: authInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 权限管理
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param enableWaterMark （本字段仅专业版企业可设置）启用水印。false:关 true:开 ;如果不填充此字段为保持原有状态
   * @param addMemberOnlyAdmin 仅管理员可增减空间成员和修改文件分享设置。false:关 true:开 ；如果不填充此字段为保持原有状态
   * @param enableShareUrl 启用成员邀请链接。false:关 true:开 ；如果不填充此字段为保持原有状态
   * @param shareUrlNoApprove 通过链接加入空间无需审批。false:关； true:开； 如果不填充此字段为保持原有状态
   * @param shareUrlNoApproveDefaultAuth 邀请链接默认权限。1:仅浏览（可下载）2:可编辑 4:可预览（仅专业版企业可设置）；如果不填充此字段为保持原有状态
   */
  public static async settingSpace(
    cpWXCore: CPWXCore,
    userId: string,
    spaceId: string,
    enableWaterMark?: boolean,
    addMemberOnlyAdmin?: boolean,
    enableShareUrl?: boolean,
    shareUrlNoApprove?: boolean,
    shareUrlNoApproveDefaultAuth?: boolean
  ) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.settingSpaceUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      enable_watermark: enableWaterMark,
      add_member_only_admin: addMemberOnlyAdmin,
      enable_share_url: enableShareUrl,
      share_url_no_approve: shareUrlNoApprove,
      share_url_no_approve_default_auth: shareUrlNoApproveDefaultAuth,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取邀请链接
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   */
  public static async getSpaceShare(cpWXCore: CPWXCore, userId: string, spaceId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getSpaceShareUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 获取文件列表
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param fatherId 当前目录的fileid,根目录时为空间spaceid
   * @param sortType 列表排序方式，1:名字升序； 2:名字降序；3:大小升序；4:大小降序；5:修改时间升序；6:修改时间降序
   * @param start 首次填0, 后续填上一次请求返回的next_start
   * @param limit 分批拉取最大文件数, 不超过1000
   */
  public static async getFileList(cpWXCore: CPWXCore, userId: string, spaceId: string, fatherId: string, sortType: 1 | 2 | 3 | 4 | 5 | 6, start = 0, limit = 1000) {
    if (start < 0) {
      start = 0
    }
    if (limit < 1) {
      limit = 1000
    }
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getFileListUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      fatherid: fatherId,
      sort_type: sortType,
      start,
      limit,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 上传文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param spaceId 空间id
   * @param fatherId 当前目录的fileid,根目录时为空间spaceid
   * @param fileName 文件名字
   * @param fileBase64Content 文件内容base64（注意：只需要填入文件内容的Base64，不需要添加任何如：”data:application/x-javascript;base64” 的数据类型描述信息）
   */
  public static async uploadFile(cpWXCore: CPWXCore, userId: string, spaceId: string, fatherId: string, fileName: string, fileBase64Content: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.uploadFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      spaceid: spaceId,
      fatherid: fatherId,
      file_name: fileName,
      file_base64_content: fileBase64Content,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 下载文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 文件fileid（只支持下载普通文件，不支持下载文件夹）
   */
  public static async downloadFile(cpWXCore: CPWXCore, userId: string, fileId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.downloadFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 新建文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fatherId 父目录fileid, 在根目录时为空间spaceid
   * @param fileType 文件类型, 1:文件夹
   * @param fileName 文件名字
   */
  public static async createFile(cpWXCore: CPWXCore, userId: string, fatherId: string, fileType: 1, fileName: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.createFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fatherid: fatherId,
      file_type: fileType,
      file_name: fileName,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 重命名文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId	是	文件fileid
   * @param newName	是	重命名后的文件名
   */
  public static async renameFile(cpWXCore: CPWXCore, userId: string, fileId: string, newName: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.renameFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
      new_name: newName,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 移动文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   * @param fatherId 当前目录的fileid,根目录时为空间spaceid
   * @param replace 如果移动到的目标目录与需要移动的文件重名时，是否覆盖。true:重名文件覆盖 false:重名文件进行冲突重命名处理（移动后文件名格式如xxx(1).txt xxx(1).doc等）
   */
  public static async moveFile(cpWXCore: CPWXCore, userId: string, fileId: Array<string>, fatherId: string, replace = false) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.moveFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
      fatherid: fatherId,
      replace,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 删除文件
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   */
  public static async deleteFile(cpWXCore: CPWXCore, userId: string, fileId: Array<string>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.deleteFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 文件信息
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   */
  public static async getFileInfo(cpWXCore: CPWXCore, userId: string, fileId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getFileInfoUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 新增指定人
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   * @param authInfo 空间其他成员信息
              └  type 成员类型 1:个人 2:部门
              └  userid 成员userid,字符串
              └  departmentid 部门departmentid, 32位整型范围是[0, 2^32)
              └  auth 成员权限 1:可下载 2:可编辑 4:可预览（仅专业版企业可设置）
   */
  public static async addFileAcl(cpWXCore: CPWXCore, userId: string, fileId: string, authInfo: Array<{ type: 1 | 2; userid?: string; departmentid?: string; auth: 1 | 2 | 4 }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.addFileAclUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
      auth_info: authInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 删除指定人
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   * @param authInfo 空间其他成员信息
              └  type 成员类型 1:个人 2:部门
              └  userid 成员userid,字符串
              └  departmentid 部门departmentid, 32位整型范围是[0, 2^32)
   */
  public static async delFileAcl(cpWXCore: CPWXCore, userId: string, fileId: string, authInfo: Array<{ type: 1 | 2; userid?: string; departmentid?: string }>) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.delFileAclUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
      auth_info: authInfo,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 分享设置
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   * @param auth_scope 权限范围：1:指定人 2:企业内 3:企业外
   * @param auth 成员权限 1:可下载 2:可编辑 4:可预览（仅专业版企业可设置）
   */
  public static async settingFile(cpWXCore: CPWXCore, userId: string, fileId: string, authScope: '1' | '2' | '3', auth: 1 | 2 | 4) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.settingFileUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
      auth_scope: authScope,
      auth,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }

  /**
   * 分享设置
   * @param cpWXCore
   * @param userId 操作者userid
   * @param fileId 	文件fileid
   */
  public static async getFileShare(cpWXCore: CPWXCore, userId: string, fileId: string) {
    const token = await cpWXCore.getAccessToken()
    const url = util.format(this.getFileShareUrl, token)
    const data = await this._http.post(url, {
      userid: userId,
      fileid: fileId,
    })
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    delete data.errcode
    delete data.errmsg
    return data
  }
}

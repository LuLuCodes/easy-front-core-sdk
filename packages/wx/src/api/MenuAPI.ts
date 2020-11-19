import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 菜单管理
 */
export class MenuAPI {
  private static createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=%s'
  private static getMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/get?access_token=%s'
  private static getCurrentSelfmenuInfoUrl = 'https://api.weixin.qq.com/cgi-bin/get_current_selfmenu_info?access_token=%s'
  private static deleteMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delete?access_token=%s'
  private static addConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/addconditional?access_token=%s'
  private static delConditionalUrl = 'https://api.weixin.qq.com/cgi-bin/menu/delconditional?access_token=%s'
  private static tryMatchUrl = 'https://api.weixin.qq.com/cgi-bin/menu/trymatch?access_token=%s'

  private static _http = Http.getInstance()
  /**
   * 创建菜单
   * @param wxCore
   * @param menuJson
   */
  public static async create(wxCore: WXCore, menuJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.createMenuUrl, token)
    const data = await this._http.post(url, menuJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 查询菜单
   * @param wxCore
   */
  public static async get(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getMenuUrl, token)
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
   * 查询自定义菜单
   * @param wxCore
   */
  public static async getCurrentSelfmenuInfo(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getCurrentSelfmenuInfoUrl, token)
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
   * 删除菜单
   * @param wxCore
   */
  public static async delete(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.deleteMenuUrl, token)
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
   * 添加个性化菜单
   * @param wxCore
   * @param menuJson
   */
  public static async addConditional(wxCore: WXCore, menuJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addConditionalUrl, token)
    const data = await this._http.post(url, menuJson)
    if (!data) {
      throw new Error('接口异常')
    }
    if (data.errcode) {
      throw new Error(data.errmsg)
    }
    return data
  }

  /**
   * 删除个性化菜单
   * @param wxCore
   * @param menuId
   */
  public static async deleteConditional(wxCore: WXCore, menuid: number) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.delConditionalUrl, token)
    const data = await this._http.post(url, {
      menuid,
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
   * 测试个性化菜单匹配结果
   * @param wxCore
   * @param openId
   */
  public static async tryMatch(wxCore: WXCore, openId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.tryMatchUrl, token)
    const data = await this._http.post(url, {
      user_id: openId,
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

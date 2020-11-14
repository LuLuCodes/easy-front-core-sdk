import * as util from 'util'
import { WXCore } from '../WXCore'
import { Http } from '@easy-front-core-sdk/kits'

/**
 * @description 微信门店接口
 */
export class PoiAPI {
  private static addPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/addpoi?access_token=%s'
  private static getPoiUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getpoi?access_token=%s'
  private static getPoiListUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/getpoilist?access_token=%s'
  private static updatePoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/updatepoi?access_token=%s'
  private static delPoiUrl: string = 'https://api.weixin.qq.com/cgi-bin/poi/delpoi?access_token=%s'
  private static getWxCategoryUrl: string = 'http://api.weixin.qq.com/cgi-bin/poi/getwxcategory?access_token=%s'

  private static _http = Http.getInstance()

  /**
   * 创建门店
   * @param wxCore
   * @param poiJson
   */
  public static async addPoi(wxCore: WXCore, poiJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.addPoiUrl, token)
    const data = await this._http.post(url, poiJson)
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
   * 查询门店信息
   * @param wxCore
   * @param poiId
   */
  public static async getPoi(wxCore: WXCore, poiId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getPoiUrl, token)
    const data = await this._http.post(url, {
      poi_id: poiId,
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
   * 查询门店列表
   * @param wxCore
   * @param begin 开始位置，0 即为从第一条开始查询
   * @param limit 返回数据条数，最大允许50，默认为20
   */
  public static async getPoiList(wxCore: WXCore, begin: number = 0, limit: number = 20) {
    if (limit <= 0 || limit > 50) {
      limit = 50
    }
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getPoiListUrl, token)
    const data = await this._http.post(url, {
      begin: begin,
      limit: limit,
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
   * 修改门店服务信息
   * @param wxCore
   * @param poiJson
   */
  public static async updatePoi(wxCore: WXCore, poiJson: any) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.updatePoiUrl, token)
    const data = await this._http.post(url, poiJson)
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
   * 删除门店
   * @param wxCore
   * @param poiId
   */
  public static async delPoi(wxCore: WXCore, poiId: string) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.delPoiUrl, token)
    const data = await this._http.post(url, {
      poi_id: poiId,
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
   * 门店类目表
   * @param wxCore
   */
  public static async getWxCategory(wxCore: WXCore) {
    const token = await wxCore.getAccessToken()
    const url = util.format(this.getWxCategoryUrl, token)
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
}

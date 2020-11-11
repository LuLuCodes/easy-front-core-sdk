import { AxiosHttp } from './AxiosHttp'
/**
 * @description 网络请求工具
 */

export interface IHttpInstance {
  get(url: string, options?: any): Promise<any>
  post(url: string, data?: any, options?: any): Promise<any>
  put(url: string, data: string, options?: any): Promise<any>
  delete(url: string, options?: any): Promise<any>
  postWithCert(url: string, data: string, certFileContent: Buffer, passphrase: string): Promise<any>
  upload(url: string, filePath: string, params?: string): Promise<any>
}

export class Http {
  private static instance: IHttpInstance = new AxiosHttp()

  public static getInstance(): IHttpInstance {
    return this.instance
  }
}

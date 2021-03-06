import { AxiosHttp } from './AxiosHttp'
/**
 * @description 网络请求工具
 */

export interface IHttpInstance {
  get(url: string, options?: any): Promise<any>
  getToResponse(url: string, options?: any): Promise<any>
  post(url: string, data: any, options?: any): Promise<any>
  postToResponse(url: string, data: any, options?: any): Promise<any>
  put(url: string, data: any, options?: any): Promise<any>
  putToResponse(url: string, data: any, options?: any): Promise<any>
  patch(url: string, data: any, options?: any): Promise<any>
  patchToResponse(url: string, data: any, options?: any): Promise<any>
  delete(url: string, options?: any): Promise<any>
  deleteToResponse(url: string, options?: any): Promise<any>
  postWithCert(url: string, data: any, certFileContent: Buffer, passphrase: string): Promise<any>
  upload(url: string, filePath: string, params?: any): Promise<any>
  uploadToResponse(url: string, filePath: string, params?: any, options?: any): Promise<any>
}

export class Http {
  private static instance: IHttpInstance = new AxiosHttp()

  public static getInstance(): IHttpInstance {
    return this.instance
  }
}

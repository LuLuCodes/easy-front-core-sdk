import { ErrorMsg } from './ErrorMsg'
export const AccessTokenRefresh = (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]) {
    let result = await originalMethod.apply(this, args)
    if (!result) {
      throw new Error('接口异常(网络异常)')
    }
    if (result.errcode === 40014 || result.errcode === 42001 || result.errcode === 42009 || result.errcode === 40082) {
      // access token 失效后重新获取
      await args[0].refreshAccessToken()
      result = await originalMethod.apply(this, args)
    }
    if (result.errcode) {
      console.error(`${propertyKey} error info: ${JSON.stringify(result)}`)
      const errmsg = ErrorMsg[result.errcode]
      if (errmsg) {
        throw new Error(errmsg)
      } else {
        throw new Error('接口异常(未知错误)')
      }
    }
    delete result.errcode
    delete result.errmsg
    return result
  }
  return descriptor
}

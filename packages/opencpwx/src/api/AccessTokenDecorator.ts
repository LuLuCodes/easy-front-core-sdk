export const AccessTokenRefresh = (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]) {
    let result = await originalMethod.apply(this, args)
    if (!result) {
      throw new Error('接口异常')
    }
    if (result.errcode) {
      console.error(`${propertyKey} error: ${JSON.stringify(result)}`)
      if (result.errcode === 40014 || result.errcode === 42001 || result.errcode === 42009 || result.errcode === 40082) {
        // access token 失效后重新获取
        await args[0].refreshAccessToken()
        result = await originalMethod.apply(this, args)
      } else {
        throw new Error(result.errmsg)
      }
    }
    delete result.errcode
    delete result.errmsg
    return result
  }
  return descriptor
}

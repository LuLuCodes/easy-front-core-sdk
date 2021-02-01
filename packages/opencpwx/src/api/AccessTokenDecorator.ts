export const AccessTokenRefresh = (): MethodDecorator => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value
  descriptor.value = async function (...args: any[]) {
    let result = await originalMethod.apply(this, args)
    if (result.errcode === 40014) {
      // access token 失效后重新获取
      args[0].refreshAccessToken()
    }
    result = await originalMethod.apply(this, args)
    return result
  }
  return descriptor
}

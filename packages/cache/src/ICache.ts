/**
 * @author qian.qing
 * @description 缓存接口
 */

export interface ICache {
  get(key: string): Promise<string>
  set(key: string, value: string): Promise<void>
  del(...keys: string[]): Promise<void>
}

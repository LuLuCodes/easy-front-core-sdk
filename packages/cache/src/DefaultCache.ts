/**
 * @author qian.qing
 * @description 默认的缓存策略(内存)
 */

import { ICache } from './ICache'

export class DefaultCache implements ICache {
  private _map: Map<string, string> = new Map<string, string>()

  async get(key: string): Promise<string> {
    return this._map.get(key) || ''
  }

  async set(key: string, value: string): Promise<void> {
    this._map.set(key, value)
  }

  async del(...keys: string[]): Promise<void> {
    for (let key of keys) {
      this._map.delete(key)
    }
  }
}

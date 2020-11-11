import { ICache } from './ICache'
import * as Redis from 'ioredis'

export type KeyType = string
export type ValueType = string | Buffer | number | any[]

export interface IRedisConfig {
  port: number
  host: string
  password?: string
  db?: number
  family?: number
}

export class RedisCache implements ICache {
  private _client = null
  constructor(config: IRedisConfig) {
    this._client = new Redis(config)
  }

  async get(key: KeyType): Promise<string | null> {
    return await this._client.get(key)
  }
  async ttl(key: KeyType): Promise<number | null> {
    return await this._client.ttl(key)
  }

  async set(key: KeyType, value: ValueType, expiryMode?: 'EX' | 'PX' | undefined, time?: number) {
    if (expiryMode && time) {
      return await this._client.set(key, value, expiryMode, time)
    } else {
      return await this._client.set(key, value)
    }
  }

  async del(...keys: KeyType[]) {
    this._client.del(...keys)
  }
}

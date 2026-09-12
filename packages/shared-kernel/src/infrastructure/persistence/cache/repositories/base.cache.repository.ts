import { RedisService } from '../redis.service';

export abstract class BaseCacheRepository<T> {
  constructor(protected readonly redis: RedisService) {}

  abstract getKey(id: string): string;
  abstract getPrefix(): string;

  async get(id: string): Promise<T | null> {
    const key = this.getKey(id);
    return await this.redis.get<T>(key);
  }

  async set(id: string, value: T, ttl?: number): Promise<void> {
    const key = this.getKey(id);
    await this.redis.set(key, value, ttl);
  }

  async delete(id: string): Promise<void> {
    const key = this.getKey(id);
    await this.redis.delete(key);
  }

  async exists(id: string): Promise<boolean> {
    const key = this.getKey(id);
    return await this.redis.exists(key);
  }

  async clear(): Promise<void> {
    const pattern = `${this.getPrefix()}:*`;
    await this.redis.deleteByPattern(pattern);
  }

  async getMany(ids: string[]): Promise<(T | null)[]> {
    const promises = ids.map((id) => this.get(id));
    return await Promise.all(promises);
  }

  async setMany(items: { id: string; value: T; ttl?: number }[]): Promise<void> {
    const promises = items.map(({ id, value, ttl }) => this.set(id, value, ttl));
    await Promise.all(promises);
  }

  async deleteMany(ids: string[]): Promise<void> {
    const promises = ids.map((id) => this.delete(id));
    await Promise.all(promises);
  }
}

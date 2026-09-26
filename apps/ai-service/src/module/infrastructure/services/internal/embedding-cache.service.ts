import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import type { EmbedOutput } from '../../ml-providers/base/ml-provider.types';

const PREFIX = 'ai:embedding-cache';
const TTL_SECONDS = 86400;

@Injectable()
export class EmbeddingCacheService {
  constructor(private readonly redis: RedisService) {}

  private key(text: string, model: string): string {
    return `${PREFIX}:${model}:${Buffer.from(text).toString('base64').slice(0, 64)}`;
  }

  async get(text: string, model: string): Promise<EmbedOutput | null> {
    return this.redis.get<EmbedOutput>(this.key(text, model));
  }

  async set(text: string, model: string, output: EmbedOutput): Promise<void> {
    await this.redis.set(this.key(text, model), output, TTL_SECONDS);
  }

  async invalidate(text: string, model: string): Promise<void> {
    await this.redis.del(this.key(text, model));
  }
}

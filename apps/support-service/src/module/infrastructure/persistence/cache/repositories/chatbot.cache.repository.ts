/**
 * ChatbotCacheRepository — cached chatbot config
 * @module support-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { ChatbotEntity } from '../../../../domain/entities/chatbot.entity';
import { ChatbotIdVO } from '../../../../domain/value-objects/primitives/chatbot-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class ChatbotCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.CHATBOT;
  private readonly ttlSeconds = CACHE_TTL.SIX_HOURS;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: ChatbotIdVO): Promise<ChatbotEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snap = JSON.parse(raw) as ReturnType<ChatbotEntity['toSnapshot']>;
      return ChatbotEntity.rehydrate(snap);
    } catch {
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: ChatbotEntity): Promise<void> {
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(entity.toSnapshot()),
      this.ttlSeconds,
    );
  }

  async invalidate(id: ChatbotIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: ChatbotIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: ChatbotIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}

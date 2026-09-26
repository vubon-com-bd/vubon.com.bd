/**
 * FaqCacheRepository
 * @module support-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { FaqEntity } from '../../../../domain/entities/faq.entity';
import { FaqIdVO } from '../../../../domain/value-objects/primitives/faq-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class FaqCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.FAQ;
  private readonly ttlSeconds = CACHE_TTL.ONE_DAY;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: FaqIdVO): Promise<FaqEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snap = JSON.parse(raw) as ReturnType<FaqEntity['toSnapshot']>;
      return FaqEntity.rehydrate(snap);
    } catch {
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: FaqEntity): Promise<void> {
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(entity.toSnapshot()),
      this.ttlSeconds,
    );
  }

  async invalidate(id: FaqIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: FaqIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: FaqIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}

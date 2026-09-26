/**
 * SlaCacheRepository — cached SLA state
 * @module support-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { SlaEntity } from '../../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../../domain/value-objects/primitives/sla-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class SlaCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.SLA;
  private readonly ttlSeconds = CACHE_TTL.ONE_MINUTE;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: SlaIdVO): Promise<SlaEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snap = JSON.parse(raw) as ReturnType<SlaEntity['toSnapshot']>;
      return SlaEntity.rehydrate(snap);
    } catch {
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: SlaEntity): Promise<void> {
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(entity.toSnapshot()),
      this.ttlSeconds,
    );
  }

  async invalidate(id: SlaIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: SlaIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: SlaIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}

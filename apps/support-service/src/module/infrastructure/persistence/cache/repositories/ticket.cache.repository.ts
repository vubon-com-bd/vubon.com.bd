/**
 * TicketCacheRepository — cache layer for TicketEntity
 * @module support-service/infrastructure/persistence/cache/repositories
 *
 * Rule: no business logic, TTL from CACHE_TTL, invalidation on write
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { TicketEntity } from '../../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class TicketCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.TICKET;
  private readonly ttlSeconds = CACHE_TTL.ONE_HOUR;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: TicketIdVO): Promise<TicketEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snapshot = JSON.parse(raw) as ReturnType<TicketEntity['toSnapshot']>;
      return TicketEntity.rehydrate(snapshot);
    } catch {
      // corrupted cache — invalidate
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: TicketEntity): Promise<void> {
    const snapshot = entity.toSnapshot();
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(snapshot),
      this.ttlSeconds,
    );
  }

  async invalidate(id: TicketIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: TicketIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: TicketIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}

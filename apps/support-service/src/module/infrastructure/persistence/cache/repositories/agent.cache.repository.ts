/**
 * AgentCacheRepository — cached agent state
 * @module support-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { SupportAgentEntity } from '../../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { SupportRedisService } from '../redis.service';
import { SUPPORT_CACHE_PREFIX } from '../support-cache.constants';

@Injectable()
export class AgentCacheRepository {
  private readonly keyPrefix = SUPPORT_CACHE_PREFIX.AGENT;
  private readonly ttlSeconds = CACHE_TTL.FIVE_MINUTES;

  constructor(private readonly redis: SupportRedisService) {}

  async findById(id: AgentIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.redis.get(this.keyFor(id));
    if (!raw) return null;
    try {
      const snap = JSON.parse(raw) as ReturnType<SupportAgentEntity['toSnapshot']>;
      return SupportAgentEntity.rehydrate(snap);
    } catch {
      await this.redis.del(this.keyFor(id));
      return null;
    }
  }

  async save(entity: SupportAgentEntity): Promise<void> {
    await this.redis.set(
      this.keyFor(entity.id),
      JSON.stringify(entity.toSnapshot()),
      this.ttlSeconds,
    );
  }

  async invalidate(id: AgentIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async exists(id: AgentIdVO): Promise<boolean> {
    return this.redis.exists(this.keyFor(id));
  }

  private keyFor(id: AgentIdVO): string {
    return `${this.keyPrefix}${id.value}`;
  }
}

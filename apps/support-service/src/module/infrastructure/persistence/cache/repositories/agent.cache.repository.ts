import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { SupportAgentEntity } from '../../../../domain/entities/support-agent.entity';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';
import { AgentStatusVO } from '../../../../domain/value-objects/primitives/agent-status.vo';
import { AgentTypeVO } from '../../../../domain/value-objects/primitives/agent-type.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TeamIdVO } from '../../../../domain/value-objects/primitives/team-id.vo';

interface SerializedAgent {
  readonly id: string;
  readonly userId: string;
  readonly teamId: string | null;
  readonly status: string;
  readonly type: string;
  readonly skills: readonly string[];
  readonly currentLoad: number;
  readonly maxLoad: number;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'support:agent';
const TTL_SECONDS = 60 * 10;

@Injectable()
export class AgentCacheRepository extends BaseCacheRepository<SupportAgentEntity, AgentIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: SupportAgentEntity): SerializedAgent {
    return {
      id: entity.id.value,
      userId: entity.userId.value,
      teamId: entity.teamId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      skills: entity.skills,
      currentLoad: entity.currentLoad,
      maxLoad: entity.maxLoad,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedAgent): SupportAgentEntity {
    return SupportAgentEntity.reconstitute(
      AgentIdVO.create(data.id),
      {
        userId: UserIdVO.create(data.userId),
        teamId: data.teamId ? TeamIdVO.create(data.teamId) : null,
        status: AgentStatusVO.create(data.status),
        type: AgentTypeVO.create(data.type),
        skills: data.skills,
        currentLoad: data.currentLoad,
        maxLoad: data.maxLoad,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: AgentIdVO): Promise<SupportAgentEntity | null> {
    const raw = await this.redis.get<SerializedAgent>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly SupportAgentEntity[]> {
    return [];
  }

  async save(entity: SupportAgentEntity): Promise<SupportAgentEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: AgentIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

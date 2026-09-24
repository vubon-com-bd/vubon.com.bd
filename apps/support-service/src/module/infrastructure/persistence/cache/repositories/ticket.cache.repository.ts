import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { TicketEntity } from '../../../../domain/entities/ticket.entity';
import { TicketIdVO } from '../../../../domain/value-objects/primitives/ticket-id.vo';
import { TicketNumberVO } from '../../../../domain/value-objects/primitives/ticket-number.vo';
import { TicketSubjectVO } from '../../../../domain/value-objects/primitives/ticket-subject.vo';
import { TicketDescriptionVO } from '../../../../domain/value-objects/primitives/ticket-description.vo';
import { TicketStatusVO } from '../../../../domain/value-objects/primitives/ticket-status.vo';
import { TicketPriorityVO } from '../../../../domain/value-objects/primitives/ticket-priority.vo';
import { TicketTypeVO } from '../../../../domain/value-objects/primitives/ticket-type.vo';
import { TicketChannelVO } from '../../../../domain/value-objects/primitives/ticket-channel.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AgentIdVO } from '../../../../domain/value-objects/primitives/agent-id.vo';

interface SerializedTicket {
  readonly id: string;
  readonly number: string;
  readonly subject: string;
  readonly description: string;
  readonly status: string;
  readonly priority: string;
  readonly type: string;
  readonly channel: string;
  readonly userId: string;
  readonly assignedAgentId: string | null;
  readonly tags: readonly string[];
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly resolvedAt: string | null;
  readonly closedAt: string | null;
  readonly deletedAt: string | null;
}

const PREFIX = 'support:ticket';
const TTL_SECONDS = 60 * 15;

@Injectable()
export class TicketCacheRepository extends BaseCacheRepository<TicketEntity, TicketIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: TicketEntity): SerializedTicket {
    return {
      id: entity.id.value,
      number: entity.number.value,
      subject: entity.subject.value,
      description: entity.description.value,
      status: entity.status.value,
      priority: entity.priority.value,
      type: entity.type.value,
      channel: entity.channel.value,
      userId: entity.userId.value,
      assignedAgentId: entity.assignedAgentId?.value ?? null,
      tags: entity.tags,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      resolvedAt: entity.resolvedAt?.toISOString() ?? null,
      closedAt: entity.closedAt?.toISOString() ?? null,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedTicket): TicketEntity {
    return TicketEntity.reconstitute(
      TicketIdVO.create(data.id),
      {
        number: TicketNumberVO.create(data.number),
        subject: TicketSubjectVO.create(data.subject),
        description: TicketDescriptionVO.create(data.description),
        status: TicketStatusVO.create(data.status),
        priority: TicketPriorityVO.create(data.priority),
        type: TicketTypeVO.create(data.type),
        channel: TicketChannelVO.create(data.channel),
        userId: UserIdVO.create(data.userId),
        assignedAgentId: data.assignedAgentId ? AgentIdVO.create(data.assignedAgentId) : null,
        tags: data.tags,
        resolvedAt: data.resolvedAt ? new Date(data.resolvedAt) : null,
        closedAt: data.closedAt ? new Date(data.closedAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: TicketIdVO): Promise<TicketEntity | null> {
    const raw = await this.redis.get<SerializedTicket>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly TicketEntity[]> {
    return [];
  }

  async save(entity: TicketEntity): Promise<TicketEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: TicketIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

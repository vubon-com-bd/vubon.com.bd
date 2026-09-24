import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { SlaEntity } from '../../../../domain/entities/sla.entity';
import { SlaIdVO } from '../../../../domain/value-objects/primitives/sla-id.vo';
import { SlaTypeVO } from '../../../../domain/value-objects/primitives/sla-type.vo';
import { SlaTargetVO } from '../../../../domain/value-objects/primitives/sla-target.vo';
import { SlaStatusVO } from '../../../../domain/value-objects/primitives/sla-status.vo';

interface SerializedSla {
  readonly id: string;
  readonly name: string;
  readonly type: string;
  readonly target: number;
  readonly priority: string;
  readonly status: string;
  readonly businessHoursOnly: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'support:sla';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class SlaCacheRepository extends BaseCacheRepository<SlaEntity, SlaIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: SlaEntity): SerializedSla {
    return {
      id: entity.id.value,
      name: entity.name,
      type: entity.type.value,
      target: entity.target.value,
      priority: entity.priority,
      status: entity.status.value,
      businessHoursOnly: entity.businessHoursOnly,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedSla): SlaEntity {
    return SlaEntity.reconstitute(
      SlaIdVO.create(data.id),
      {
        name: data.name,
        type: SlaTypeVO.create(data.type),
        target: SlaTargetVO.create(data.target),
        status: SlaStatusVO.create(data.status),
        priority: data.priority,
        businessHoursOnly: data.businessHoursOnly,
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: SlaIdVO): Promise<SlaEntity | null> {
    const raw = await this.redis.get<SerializedSla>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly SlaEntity[]> {
    return [];
  }

  async save(entity: SlaEntity): Promise<SlaEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: SlaIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

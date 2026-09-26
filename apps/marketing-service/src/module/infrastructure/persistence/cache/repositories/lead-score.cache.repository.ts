import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { LeadScoreEntity } from '../../../../domain/entities/lead-score.entity';
import { LeadScoreCompositeVO } from '../../../../domain/value-objects/composites/lead-score-composite.vo';
import { LeadIdVO } from '../../../../domain/value-objects/primitives/lead-id.vo';
import { LeadScoreVO } from '../../../../domain/value-objects/primitives/lead-score.vo';
import { LeadSourceVO } from '../../../../domain/value-objects/primitives/lead-source.vo';

const PREFIX = 'marketing:lead-score';
const TTL_SECONDS = 60 * 10;

interface SerializedLeadScore {
  readonly id: string;
  readonly leadId: string;
  readonly score: number;
  readonly createdAt: string;
}

@Injectable()
export class LeadScoreCacheRepository extends BaseCacheRepository<LeadScoreEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: LeadScoreEntity): SerializedLeadScore {
    return {
      id: entity.id,
      leadId: entity.leadId.value,
      score: entity.score.score.value,
      createdAt: entity.createdAt,
    };
  }

  private deserialize(data: SerializedLeadScore): LeadScoreEntity {
    return LeadScoreEntity.reconstitute(
      data.id,
      {
        leadId: LeadIdVO.create(data.leadId),
        score: LeadScoreCompositeVO.create({
          score: LeadScoreVO.create(data.score),
          source: LeadSourceVO.create('website'),
          reason: null,
        }),
      },
      data.createdAt,
      data.createdAt,
      null,
    );
  }

  async findById(id: string): Promise<LeadScoreEntity | null> {
    const raw = await this.redis.get<SerializedLeadScore>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly LeadScoreEntity[]> {
    return [];
  }

  async save(entity: LeadScoreEntity): Promise<LeadScoreEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

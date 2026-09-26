import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { CampaignEntity } from '../../../../domain/entities/campaign.entity';
import { CampaignIdVO } from '../../../../domain/value-objects/primitives/campaign-id.vo';
import { CampaignNameVO } from '../../../../domain/value-objects/primitives/campaign-name.vo';
import { CampaignStatusVO } from '../../../../domain/value-objects/primitives/campaign-status.vo';
import { CampaignTypeVO } from '../../../../domain/value-objects/primitives/campaign-type.vo';
import { CampaignChannelVO } from '../../../../domain/value-objects/primitives/campaign-channel.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';

const PREFIX = 'marketing:campaign';
const TTL_SECONDS = 60 * 15;

interface SerializedCampaign {
  readonly id: string;
  readonly name: string;
  readonly status: string;
  readonly type: string;
  readonly channel: string;
  readonly createdBy: string;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

@Injectable()
export class CampaignCacheRepository extends BaseCacheRepository<CampaignEntity, CampaignIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: CampaignEntity): SerializedCampaign {
    return {
      id: entity.id.value,
      name: entity.name.value,
      status: entity.status.value,
      type: entity.type.value,
      channel: entity.channel.value,
      createdBy: entity.createdBy.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedCampaign): CampaignEntity {
    return CampaignEntity.reconstitute(
      CampaignIdVO.create(data.id),
      {
        name: CampaignNameVO.create(data.name),
        status: CampaignStatusVO.create(data.status),
        type: CampaignTypeVO.create(data.type),
        channel: CampaignChannelVO.create(data.channel),
        goal: null,
        createdBy: UserIdVO.create(data.createdBy),
        startDate: null,
        endDate: null,
        launchedAt: null,
        completedAt: null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: CampaignIdVO): Promise<CampaignEntity | null> {
    const raw = await this.redis.get<SerializedCampaign>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly CampaignEntity[]> {
    return [];
  }

  async save(entity: CampaignEntity): Promise<CampaignEntity> {
    await this.redis.set(this.keyFor(entity.id), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: CampaignIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

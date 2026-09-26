import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { PersonalizationProfileEntity } from '../../../../domain/entities/personalization-profile.entity';
import { PersonalizationIdVO } from '../../../../domain/value-objects/primitives/personalization-id.vo';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PersonalizationProfileVO } from '../../../../domain/value-objects/composites/personalization-profile.vo';

interface SerializedProfile {
  readonly userId: string;
  readonly interests: readonly string[];
  readonly categories: readonly string[];
  readonly brandAffinity: Readonly<Record<string, number>>;
  readonly priceRangeMin: number | null;
  readonly priceRangeMax: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'ai:personalization';
const TTL_SECONDS = 60 * 5;

@Injectable()
export class PersonalizationCacheRepository extends BaseCacheRepository<PersonalizationProfileEntity, PersonalizationIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: PersonalizationProfileEntity): SerializedProfile {
    return {
      userId: entity.profile.userId.value,
      interests: [...entity.profile.interests],
      categories: [...entity.profile.categories],
      brandAffinity: { ...entity.profile.brandAffinity },
      priceRangeMin: entity.profile.priceRangeMin,
      priceRangeMax: entity.profile.priceRangeMax,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedProfile): PersonalizationProfileEntity {
    return PersonalizationProfileEntity.reconstitute(
      PersonalizationIdVO.create(data.userId),
      {
        profile: PersonalizationProfileVO.create({
          userId: UserIdVO.create(data.userId),
          interests: data.interests,
          categories: data.categories,
          brandAffinity: data.brandAffinity,
          priceRangeMin: data.priceRangeMin,
          priceRangeMax: data.priceRangeMax,
        }),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: PersonalizationIdVO): Promise<PersonalizationProfileEntity | null> {
    const raw = await this.redis.get<SerializedProfile>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly PersonalizationProfileEntity[]> {
    return [];
  }

  async save(entity: PersonalizationProfileEntity): Promise<PersonalizationProfileEntity> {
    await this.redis.set(this.keyFor(entity.profile.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: PersonalizationIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }
}

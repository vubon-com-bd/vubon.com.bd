import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { UserPreferencesEntity } from '../../../../domain/entities/user-preferences.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '../../../../domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '../../../../domain/value-objects/primitives/preference-value.vo';

interface SerializedPrefs {
  readonly userId: string;
  readonly entries: ReadonlyArray<{ key: string; value: string }>;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'user:preferences';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class UserPreferencesCacheRepository extends BaseCacheRepository<UserPreferencesEntity, UserIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: UserPreferencesEntity): SerializedPrefs {
    return {
      userId: entity.userId.value,
      entries: entity.entries.map((e) => ({ key: e.key.value, value: e.value.value })),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedPrefs): UserPreferencesEntity {
    return UserPreferencesEntity.reconstitute(
      UserIdVO.create(data.userId),
      {
        userId: UserIdVO.create(data.userId),
        entries: data.entries.map((e) => ({
          key: PreferenceKeyVO.create(e.key),
          value: PreferenceValueVO.create(e.value),
        })),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: UserIdVO): Promise<UserPreferencesEntity | null> {
    const raw = await this.redis.get<SerializedPrefs>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly UserPreferencesEntity[]> {
    return [];
  }

  async save(entity: UserPreferencesEntity): Promise<UserPreferencesEntity> {
    await this.redis.set(this.keyFor(entity.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null> {
    return this.findById(userId);
  }
}

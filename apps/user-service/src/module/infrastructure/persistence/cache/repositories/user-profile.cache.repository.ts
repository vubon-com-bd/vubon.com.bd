import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { UserProfileEntity } from '../../../../domain/entities/user-profile.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '../../../../domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '../../../../domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '../../../../domain/value-objects/primitives/profile-visibility.vo';

interface SerializedProfile {
  readonly userId: string;
  readonly avatarUrl: string | null;
  readonly bio: string | null;
  readonly visibility: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

const PREFIX = 'user:profile';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class UserProfileCacheRepository extends BaseCacheRepository<UserProfileEntity, UserIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: UserProfileEntity): SerializedProfile {
    return {
      userId: entity.userId.value,
      avatarUrl: entity.avatar?.value ?? null,
      bio: entity.bio?.value ?? null,
      visibility: entity.visibility.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(data: SerializedProfile): UserProfileEntity {
    return UserProfileEntity.reconstitute(
      UserIdVO.create(data.userId),
      {
        userId: UserIdVO.create(data.userId),
        avatar: data.avatarUrl ? UserAvatarVO.create(data.avatarUrl) : null,
        bio: data.bio ? UserBioVO.create(data.bio) : null,
        visibility: ProfileVisibilityVO.create(data.visibility),
      },
      data.createdAt,
      data.updatedAt,
      null,
    );
  }

  async findById(id: UserIdVO): Promise<UserProfileEntity | null> {
    const raw = await this.redis.get<SerializedProfile>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly UserProfileEntity[]> {
    return [];
  }

  async save(entity: UserProfileEntity): Promise<UserProfileEntity> {
    await this.redis.set(this.keyFor(entity.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null> {
    return this.findById(userId);
  }
}

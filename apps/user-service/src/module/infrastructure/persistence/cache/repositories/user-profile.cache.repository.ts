/**
 * UserProfileCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service.js';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { UserProfileEntity } from '@domain/entities/user-profile.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserAvatarVO } from '@domain/value-objects/primitives/user-avatar.vo';
import { UserBioVO } from '@domain/value-objects/primitives/user-bio.vo';
import { ProfileVisibilityVO } from '@domain/value-objects/primitives/profile-visibility.vo';

@Injectable()
export class UserProfileCacheRepository {
  private readonly prefix = `${CACHE_PREFIX.USER}profile:`;
  private readonly ttl = CACHE_TTL.ONE_HOUR;

  constructor(private readonly redis: RedisService) {}

  private key(userId: UserIdVO): string {
    return `${this.prefix}${userId.value}`;
  }

  async get(userId: UserIdVO): Promise<UserProfileEntity | null> {
    try {
      const raw = await this.redis.get<Record<string, unknown>>(this.key(userId));
      if (!raw) return null;
      return this.deserialize(raw);
    } catch {
      return null;
    }
  }

  async set(entity: UserProfileEntity): Promise<void> {
    try {
      await this.redis.set(this.key(entity.userId), this.serialize(entity), this.ttl);
    } catch {
      // swallow
    }
  }

  async invalidate(userId: UserIdVO): Promise<void> {
    try {
      await this.redis.del(this.key(userId));
    } catch {
      // ignore
    }
  }

  async has(userId: UserIdVO): Promise<boolean> {
    try {
      return await this.redis.exists(this.key(userId));
    } catch {
      return false;
    }
  }

  private serialize(entity: UserProfileEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      avatar: entity.avatar.value,
      bio: entity.bio.value,
      visibility: entity.visibility.value,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(raw: Record<string, unknown>): UserProfileEntity | null {
    try {
      return UserProfileEntity.reconstitute({
        id: String(raw.id),
        createdAt: String(raw.createdAt),
        updatedAt: String(raw.updatedAt),
        deletedAt: null,
        props: {
          userId: UserIdVO.create(String(raw.userId)),
          avatar: raw.avatar ? UserAvatarVO.create(String(raw.avatar)) : UserAvatarVO.empty(),
          bio: raw.bio ? UserBioVO.create(String(raw.bio)) : UserBioVO.empty(),
          visibility: ProfileVisibilityVO.create(String(raw.visibility)),
        },
      });
    } catch {
      return null;
    }
  }
}

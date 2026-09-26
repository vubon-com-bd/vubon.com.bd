/**
 * UserCacheRepository — Cache-backed user storage
 * @module auth-service/infrastructure/persistence/cache/repositories
 *
 * Store: JSON-serialized user snapshot keyed by `user:{id}`.
 * Used as a read-through cache in front of UserPrismaRepository.
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache/base.cache.repository';
import { CACHE_TTL, CACHE_PREFIX } from '@vubon/shared-constants/infrastructure';
import type { UserId } from '@vubon/shared-types/common';
import { UserEntity } from '../../../../domain/entities/user.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '../../../../domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '../../../../domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '../../../../domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '../../../../domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '../../../../domain/value-objects/primitives/user-type.vo';
import { UserRoleVO } from '../../../../domain/value-objects/primitives/user-role.vo';

interface CachedUser {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly name: string;
  readonly phone: string | null;
  readonly status: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class UserCacheRepository extends BaseCacheRepository<UserEntity, UserId> {
  private static readonly PREFIX = 'cache:user';

  constructor(redis: RedisService) {
    super(redis, UserCacheRepository.PREFIX, CACHE_TTL.ONE_HOUR);
  }

  async findById(id: UserId): Promise<UserEntity | null> {
    const key = this.keyFor(id);
    const cached = await this.redis.get<CachedUser>(key);
    if (!cached) return null;
    return this.toDomain(cached);
  }

  async findAll(): Promise<readonly UserEntity[]> {
    // Not supported for cache layer — return empty.
    return [];
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    const key = this.keyFor(entity.id);
    await this.redis.set(key, this.serialize(entity), CACHE_TTL.ONE_HOUR);
    return entity;
  }

  async delete(id: UserId): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  private serialize(entity: UserEntity): CachedUser {
    return {
      id: entity.id,
      email: entity.email.value,
      passwordHash: entity.passwordHash,
      name: entity.name.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      roles: entity.roles.map((r) => r.value),
      emailVerified: entity.emailVerified,
      phoneVerified: entity.phoneVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: CachedUser): UserEntity {
    return UserEntity.create({
      id: raw.id as UserId,
      email: UserEmailVO.of(raw.email),
      passwordHash: raw.passwordHash,
      name: UserNameVO.of(raw.name),
      phone: raw.phone ? UserPhoneVO.of(raw.phone) : undefined,
      status: UserStatusVO.of(raw.status),
      type: UserTypeVO.of(raw.type),
      roles: raw.roles.map((r) => UserRoleVO.of(r)),
      emailVerified: raw.emailVerified,
      phoneVerified: raw.phoneVerified,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }
}

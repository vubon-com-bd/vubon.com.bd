import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { AuthAccountLockEntity } from '../../../../domain/entities/auth-account-lock.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { AccountLockReasonVO } from '../../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../../domain/value-objects/primitives/account-lock-duration.vo';

interface SerializedLock {
  readonly userId: string;
  readonly reason: string;
  readonly duration: string;
  readonly lockedAt: string;
  readonly unlockedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'auth:account-lock';
const TTL_SECONDS = 60 * 15; // 15 minutes

@Injectable()
export class AuthAccountLockCacheRepository extends BaseCacheRepository<AuthAccountLockEntity, UserIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: AuthAccountLockEntity): SerializedLock {
    return {
      userId: entity.userId.value,
      reason: entity.reason.value,
      duration: new Date(entity.duration.epochMs).toISOString(),
      lockedAt: entity.lockedAt.toISOString(),
      unlockedAt: entity.unlockedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedLock): AuthAccountLockEntity {
    return AuthAccountLockEntity.reconstitute(
      UserIdVO.create(data.userId),
      {
        userId: UserIdVO.create(data.userId),
        reason: AccountLockReasonVO.create(data.reason),
        duration: AccountLockDurationVO.create(new Date(data.duration)),
        lockedAt: new Date(data.lockedAt),
        unlockedAt: data.unlockedAt ? new Date(data.unlockedAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: UserIdVO): Promise<AuthAccountLockEntity | null> {
    const raw = await this.redis.get<SerializedLock>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly AuthAccountLockEntity[]> {
    return [];
  }

  async save(entity: AuthAccountLockEntity): Promise<AuthAccountLockEntity> {
    await this.redis.set(this.keyFor(entity.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findActiveByUser(userId: UserIdVO): Promise<AuthAccountLockEntity | null> {
    const raw = await this.redis.get<SerializedLock>(this.keyFor(userId));
    if (!raw) return null;
    const entity = this.deserialize(raw);
    return entity.isActive ? entity : null;
  }
}

/**
 * AuthAccountLockCacheRepository
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache/base.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { UserId } from '@vubon/shared-types/common';
import { AuthAccountLockEntity } from '../../../../domain/entities/auth-account-lock.entity';
import { AccountLockReasonVO } from '../../../../domain/value-objects/primitives/account-lock-reason.vo';
import { AccountLockDurationVO } from '../../../../domain/value-objects/primitives/account-lock-duration.vo';

interface CachedLock {
  readonly id: string;
  readonly userId: string;
  readonly reason: string;
  readonly lockedAt: number;
  readonly durationMs: number | null;
  readonly unlockedAt: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class AuthAccountLockCacheRepository extends BaseCacheRepository<
  AuthAccountLockEntity,
  string
> {
  private static readonly PREFIX = 'cache:account-lock';

  constructor(redis: RedisService) {
    super(redis, AuthAccountLockCacheRepository.PREFIX, CACHE_TTL.FIVE_MINUTES);
  }

  async findById(id: string): Promise<AuthAccountLockEntity | null> {
    const cached = await this.redis.get<CachedLock>(this.keyFor(id));
    return cached ? this.toDomain(cached) : null;
  }

  async findByUserId(userId: UserId): Promise<AuthAccountLockEntity | null> {
    const cached = await this.redis.get<CachedLock>(
      `${AuthAccountLockCacheRepository.PREFIX}:user:${userId}`,
    );
    return cached ? this.toDomain(cached) : null;
  }

  async findAll(): Promise<readonly AuthAccountLockEntity[]> {
    return [];
  }

  async save(entity: AuthAccountLockEntity): Promise<AuthAccountLockEntity> {
    const snapshot = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), snapshot, CACHE_TTL.FIVE_MINUTES);
    await this.redis.set(
      `${AuthAccountLockCacheRepository.PREFIX}:user:${entity.userId}`,
      snapshot,
      CACHE_TTL.FIVE_MINUTES,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    const cached = await this.redis.get<CachedLock>(this.keyFor(id));
    await this.redis.del(this.keyFor(id));
    if (cached) {
      await this.redis.del(`${AuthAccountLockCacheRepository.PREFIX}:user:${cached.userId}`);
    }
  }

  private serialize(entity: AuthAccountLockEntity): CachedLock {
    return {
      id: entity.id,
      userId: entity.userId,
      reason: entity.reason.value,
      lockedAt: entity.lockedAt,
      durationMs: entity.duration?.value ?? null,
      unlockedAt: entity.unlockedAt ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: CachedLock): AuthAccountLockEntity {
    return AuthAccountLockEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      reason: AccountLockReasonVO.of(raw.reason),
      lockedAt: raw.lockedAt,
      duration: raw.durationMs ? AccountLockDurationVO.ofMs(raw.durationMs) : undefined,
      unlockedAt: raw.unlockedAt ?? undefined,
      unlockedBy: undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }
}

/**
 * AuthSessionCacheRepository — Session snapshot cache
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache/base.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { UserId } from '@vubon/shared-types/common';
import { AuthSessionEntity } from '../../../../domain/entities/auth-session.entity';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo';

interface CachedSession {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
  readonly expiryEpochMs: number;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId: string | null;
  readonly revokedAt: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class AuthSessionCacheRepository extends BaseCacheRepository<
  AuthSessionEntity,
  string
> {
  private static readonly PREFIX = 'cache:session';

  constructor(redis: RedisService) {
    super(redis, AuthSessionCacheRepository.PREFIX, CACHE_TTL.FIVE_MINUTES);
  }

  async findById(id: string): Promise<AuthSessionEntity | null> {
    const cached = await this.redis.get<CachedSession>(this.keyFor(id));
    return cached ? this.toDomain(cached) : null;
  }

  async findByToken(token: string): Promise<AuthSessionEntity | null> {
    const cached = await this.redis.get<CachedSession>(`${AuthSessionCacheRepository.PREFIX}:token:${token}`);
    return cached ? this.toDomain(cached) : null;
  }

  async findAll(): Promise<readonly AuthSessionEntity[]> {
    return [];
  }

  async save(entity: AuthSessionEntity): Promise<AuthSessionEntity> {
    const snapshot = this.serialize(entity);
    await this.redis.set(
      this.keyFor(entity.id),
      snapshot,
      CACHE_TTL.FIVE_MINUTES,
    );
    await this.redis.set(
      `${AuthSessionCacheRepository.PREFIX}:token:${entity.token.value}`,
      snapshot,
      CACHE_TTL.FIVE_MINUTES,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    const cached = await this.redis.get<CachedSession>(this.keyFor(id));
    await this.redis.del(this.keyFor(id));
    if (cached) {
      await this.redis.del(`${AuthSessionCacheRepository.PREFIX}:token:${cached.token}`);
    }
  }

  private serialize(entity: AuthSessionEntity): CachedSession {
    return {
      id: entity.id,
      userId: entity.userId,
      token: entity.token.value,
      expiryEpochMs: entity.expiry.epochMs,
      ipAddress: entity.ipAddress,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId ?? null,
      revokedAt: entity.revokedAt ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: CachedSession): AuthSessionEntity {
    return AuthSessionEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      token: SessionTokenVO.of(raw.token),
      expiry: SessionExpiryVO.fromEpoch(raw.expiryEpochMs),
      ipAddress: raw.ipAddress,
      userAgent: raw.userAgent,
      deviceId: raw.deviceId ?? undefined,
      revokedAt: raw.revokedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }
}

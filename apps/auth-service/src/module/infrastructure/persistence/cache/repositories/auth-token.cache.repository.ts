/**
 * AuthTokenCacheRepository
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache/base.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { AuthTokenEntity } from '../../../../domain/entities/auth-token.entity';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo';

interface CachedToken {
  readonly id: string;
  readonly subjectId: string;
  readonly value: string;
  readonly type: string;
  readonly expiryEpochMs: number;
  readonly revokedAt: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class AuthTokenCacheRepository extends BaseCacheRepository<
  AuthTokenEntity,
  string
> {
  private static readonly PREFIX = 'cache:token';

  constructor(redis: RedisService) {
    super(redis, AuthTokenCacheRepository.PREFIX, CACHE_TTL.FIFTEEN_MINUTES);
  }

  async findById(id: string): Promise<AuthTokenEntity | null> {
    const cached = await this.redis.get<CachedToken>(this.keyFor(id));
    return cached ? this.toDomain(cached) : null;
  }

  async findByValue(value: string): Promise<AuthTokenEntity | null> {
    const cached = await this.redis.get<CachedToken>(
      `${AuthTokenCacheRepository.PREFIX}:value:${value}`,
    );
    return cached ? this.toDomain(cached) : null;
  }

  async findAll(): Promise<readonly AuthTokenEntity[]> {
    return [];
  }

  async save(entity: AuthTokenEntity): Promise<AuthTokenEntity> {
    const snapshot = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), snapshot, CACHE_TTL.FIFTEEN_MINUTES);
    await this.redis.set(
      `${AuthTokenCacheRepository.PREFIX}:value:${entity.value.value}`,
      snapshot,
      CACHE_TTL.FIFTEEN_MINUTES,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    const cached = await this.redis.get<CachedToken>(this.keyFor(id));
    await this.redis.del(this.keyFor(id));
    if (cached) {
      await this.redis.del(`${AuthTokenCacheRepository.PREFIX}:value:${cached.value}`);
    }
  }

  private serialize(entity: AuthTokenEntity): CachedToken {
    return {
      id: entity.id,
      subjectId: entity.subjectId,
      value: entity.value.value,
      type: entity.type.value,
      expiryEpochMs: entity.expiry.epochMs,
      revokedAt: entity.revokedAt ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: CachedToken): AuthTokenEntity {
    return AuthTokenEntity.create({
      id: raw.id,
      subjectId: raw.subjectId,
      value: TokenValueVO.of(raw.value),
      type: TokenTypeVO.of(raw.type),
      expiry: TokenExpiryVO.fromEpoch(raw.expiryEpochMs),
      revokedAt: raw.revokedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }
}

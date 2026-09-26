/**
 * AuthMfaCacheRepository
 * @module auth-service/infrastructure/persistence/cache/repositories
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';
import { BaseCacheRepository } from '@vubon/shared-kernel/infrastructure/persistence/cache/base.cache.repository';
import { CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import type { UserId } from '@vubon/shared-types/common';
import { AuthMfaEntity } from '../../../../domain/entities/auth-mfa.entity';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../../domain/value-objects/primitives/mfa-status.vo';

interface CachedMfa {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly status: string;
  readonly secret: string | null;
  readonly enrolledAt: number | null;
  readonly verifiedAt: number | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

@Injectable()
export class AuthMfaCacheRepository extends BaseCacheRepository<
  AuthMfaEntity,
  string
> {
  private static readonly PREFIX = 'cache:mfa';

  constructor(redis: RedisService) {
    super(redis, AuthMfaCacheRepository.PREFIX, CACHE_TTL.ONE_HOUR);
  }

  async findById(id: string): Promise<AuthMfaEntity | null> {
    const cached = await this.redis.get<CachedMfa>(this.keyFor(id));
    return cached ? this.toDomain(cached) : null;
  }

  async findByUserId(userId: UserId): Promise<AuthMfaEntity | null> {
    const cached = await this.redis.get<CachedMfa>(
      `${AuthMfaCacheRepository.PREFIX}:user:${userId}`,
    );
    return cached ? this.toDomain(cached) : null;
  }

  async findAll(): Promise<readonly AuthMfaEntity[]> {
    return [];
  }

  async save(entity: AuthMfaEntity): Promise<AuthMfaEntity> {
    const snapshot = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), snapshot, CACHE_TTL.ONE_HOUR);
    await this.redis.set(
      `${AuthMfaCacheRepository.PREFIX}:user:${entity.userId}`,
      snapshot,
      CACHE_TTL.ONE_HOUR,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    const cached = await this.redis.get<CachedMfa>(this.keyFor(id));
    await this.redis.del(this.keyFor(id));
    if (cached) {
      await this.redis.del(`${AuthMfaCacheRepository.PREFIX}:user:${cached.userId}`);
    }
  }

  private serialize(entity: AuthMfaEntity): CachedMfa {
    return {
      id: entity.id,
      userId: entity.userId,
      type: entity.type.value,
      status: entity.status.value,
      secret: entity.secret?.value ?? null,
      enrolledAt: entity.createdAt ? new Date(entity.createdAt).getTime() : null,
      verifiedAt: null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private toDomain(raw: CachedMfa): AuthMfaEntity {
    return AuthMfaEntity.create({
      id: raw.id,
      userId: raw.userId as UserId,
      type: MfaTypeVO.of(raw.type),
      status: MfaStatusVO.of(raw.status),
      secret: raw.secret ? MfaSecretVO.of(raw.secret) : undefined,
      enrolledAt: raw.enrolledAt ?? undefined,
      verifiedAt: raw.verifiedAt ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: null,
    });
  }
}

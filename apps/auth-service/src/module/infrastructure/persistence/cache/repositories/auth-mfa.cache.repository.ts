import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { AuthMfaEntity } from '../../../../domain/entities/auth-mfa.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { MfaSecretVO } from '../../../../domain/value-objects/primitives/mfa-secret.vo';
import { MfaTypeVO } from '../../../../domain/value-objects/primitives/mfa-type.vo';
import { MfaStatusVO } from '../../../../domain/value-objects/primitives/mfa-status.vo';

interface SerializedMfa {
  readonly userId: string;
  readonly secret: string;
  readonly type: string;
  readonly status: string;
  readonly enabledAt: string | null;
  readonly lastVerifiedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'auth:mfa';
const TTL_SECONDS = 60 * 30; // 30 minutes

@Injectable()
export class AuthMfaCacheRepository extends BaseCacheRepository<AuthMfaEntity, UserIdVO> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: AuthMfaEntity): SerializedMfa {
    return {
      userId: entity.userId.value,
      secret: entity.secret.value,
      type: entity.type.value,
      status: entity.status.value,
      enabledAt: entity.enabledAt?.toISOString() ?? null,
      lastVerifiedAt: entity.lastVerifiedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedMfa): AuthMfaEntity {
    return AuthMfaEntity.reconstitute(
      UserIdVO.create(data.userId),
      {
        userId: UserIdVO.create(data.userId),
        secret: MfaSecretVO.create(data.secret),
        type: MfaTypeVO.create(data.type),
        status: MfaStatusVO.create(data.status),
        enabledAt: data.enabledAt ? new Date(data.enabledAt) : null,
        lastVerifiedAt: data.lastVerifiedAt ? new Date(data.lastVerifiedAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: UserIdVO): Promise<AuthMfaEntity | null> {
    const raw = await this.redis.get<SerializedMfa>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly AuthMfaEntity[]> {
    return [];
  }

  async save(entity: AuthMfaEntity): Promise<AuthMfaEntity> {
    await this.redis.set(this.keyFor(entity.userId), this.serialize(entity), TTL_SECONDS);
    return entity;
  }

  async delete(id: UserIdVO): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async findByUserId(userId: UserIdVO): Promise<AuthMfaEntity | null> {
    const raw = await this.redis.get<SerializedMfa>(this.keyFor(userId));
    return raw ? this.deserialize(raw) : null;
  }
}

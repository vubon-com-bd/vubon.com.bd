import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { AuthTokenEntity } from '../../../../domain/entities/auth-token.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { TokenValueVO } from '../../../../domain/value-objects/primitives/token-value.vo';
import { TokenTypeVO } from '../../../../domain/value-objects/primitives/token-type.vo';
import { TokenExpiryVO } from '../../../../domain/value-objects/primitives/token-expiry.vo';

interface SerializedToken {
  readonly id: string;
  readonly userId: string;
  readonly tokenValue: string;
  readonly tokenType: string;
  readonly expiry: string;
  readonly issuedAt: string;
  readonly revokedAt: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'auth:token';
const TTL_SECONDS = 60 * 15; // 15 minutes

@Injectable()
export class AuthTokenCacheRepository extends BaseCacheRepository<AuthTokenEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: AuthTokenEntity): SerializedToken {
    return {
      id: entity.id,
      userId: entity.userId.value,
      tokenValue: entity.tokenValue.value,
      tokenType: entity.tokenType.value,
      expiry: new Date(entity.expiry.epochMs).toISOString(),
      issuedAt: entity.issuedAt.toISOString(),
      revokedAt: entity.revokedAt?.toISOString() ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedToken): AuthTokenEntity {
    return AuthTokenEntity.reconstitute(
      data.id,
      {
        userId: UserIdVO.create(data.userId),
        tokenValue: TokenValueVO.create(data.tokenValue),
        tokenType: TokenTypeVO.create(data.tokenType),
        expiry: TokenExpiryVO.create(new Date(data.expiry)),
        issuedAt: new Date(data.issuedAt),
        revokedAt: data.revokedAt ? new Date(data.revokedAt) : null,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: string): Promise<AuthTokenEntity | null> {
    const raw = await this.redis.get<SerializedToken>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findByValue(value: string): Promise<AuthTokenEntity | null> {
    const raw = await this.redis.get<SerializedToken>(`${PREFIX}:value:${value}`);
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly AuthTokenEntity[]> {
    return [];
  }

  async save(entity: AuthTokenEntity): Promise<AuthTokenEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    await this.redis.set(
      `${PREFIX}:value:${entity.tokenValue.value}`,
      serialized,
      TTL_SECONDS,
    );
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.redis.del(this.keyFor(id));
  }

  async revokeAllForUser(userId: UserIdVO): Promise<void> {
    void userId;
  }
}

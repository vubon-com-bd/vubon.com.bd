import { Injectable } from '@nestjs/common';
import { BaseCacheRepository, RedisService } from '@vubon/shared-kernel/infrastructure';
import { AuthSessionEntity } from '../../../../domain/entities/auth-session.entity';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo';
import { SessionTokenVO } from '../../../../domain/value-objects/primitives/session-token.vo';
import { SessionExpiryVO } from '../../../../domain/value-objects/primitives/session-expiry.vo';

interface SerializedSession {
  readonly id: string;
  readonly userId: string;
  readonly token: string;
  readonly expiry: string;
  readonly ip: string;
  readonly userAgent: string;
  readonly deviceId: string | null;
  readonly revokedAt: string | null;
  readonly revokeReason: string | null;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly deletedAt: string | null;
}

const PREFIX = 'auth:session';
const TTL_SECONDS = 60 * 30;

@Injectable()
export class AuthSessionCacheRepository extends BaseCacheRepository<AuthSessionEntity, string> {
  constructor(redis: RedisService) {
    super(redis, PREFIX, TTL_SECONDS);
  }

  private serialize(entity: AuthSessionEntity): SerializedSession {
    return {
      id: entity.id,
      userId: entity.userId.value,
      token: entity.token.value,
      expiry: new Date(entity.expiry.epochMs).toISOString(),
      ip: entity.ip,
      userAgent: entity.userAgent,
      deviceId: entity.deviceId,
      revokedAt: entity.revokedAt?.toISOString() ?? null,
      revokeReason: entity.revokeReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt ?? null,
    };
  }

  private deserialize(data: SerializedSession): AuthSessionEntity {
    return AuthSessionEntity.reconstitute(
      data.id,
      {
        userId: UserIdVO.create(data.userId),
        token: SessionTokenVO.create(data.token),
        expiry: SessionExpiryVO.create(new Date(data.expiry)),
        ip: data.ip,
        userAgent: data.userAgent,
        deviceId: data.deviceId,
        revokedAt: data.revokedAt ? new Date(data.revokedAt) : null,
        revokeReason: data.revokeReason,
      },
      data.createdAt,
      data.updatedAt,
      data.deletedAt,
    );
  }

  async findById(id: string): Promise<AuthSessionEntity | null> {
    const raw = await this.redis.get<SerializedSession>(this.keyFor(id));
    return raw ? this.deserialize(raw) : null;
  }

  async findByToken(token: string): Promise<AuthSessionEntity | null> {
    const raw = await this.redis.get<SerializedSession>(`${PREFIX}:token:${token}`);
    return raw ? this.deserialize(raw) : null;
  }

  async findAll(): Promise<readonly AuthSessionEntity[]> {
    return [];
  }

  async save(entity: AuthSessionEntity): Promise<AuthSessionEntity> {
    const serialized = this.serialize(entity);
    await this.redis.set(this.keyFor(entity.id), serialized, TTL_SECONDS);
    await this.redis.set(
      `${PREFIX}:token:${entity.token.value}`,
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

/**
 * UserCacheRepository
 * @module user-service/infrastructure/persistence/cache/repositories
 *
 * Cache-aside helper for UserEntity — NOT a full repository.
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service.js';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { UserEntity } from '@domain/entities/user.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { UserEmailVO } from '@domain/value-objects/primitives/user-email.vo';
import { UserNameVO } from '@domain/value-objects/primitives/user-name.vo';
import { UserPhoneVO } from '@domain/value-objects/primitives/user-phone.vo';
import { UserStatusVO } from '@domain/value-objects/primitives/user-status.vo';
import { UserTypeVO } from '@domain/value-objects/primitives/user-type.vo';

@Injectable()
export class UserCacheRepository {
  private readonly prefix = CACHE_PREFIX.USER;
  private readonly ttl = CACHE_TTL.ONE_HOUR;

  constructor(private readonly redis: RedisService) {}

  private key(id: UserIdVO): string {
    return `${this.prefix}${id.value}`;
  }

  async get(id: UserIdVO): Promise<UserEntity | null> {
    try {
      const raw = await this.redis.get<Record<string, unknown>>(this.key(id));
      if (!raw) return null;
      return this.deserialize(raw);
    } catch {
      return null;
    }
  }

  async set(entity: UserEntity): Promise<void> {
    try {
      await this.redis.set(
        this.key(UserIdVO.create(entity.id)),
        this.serialize(entity),
        this.ttl
      );
    } catch {
      // swallow
    }
  }

  async invalidate(id: UserIdVO): Promise<void> {
    try {
      await this.redis.del(this.key(id));
    } catch {
      // ignore
    }
  }

  async has(id: UserIdVO): Promise<boolean> {
    try {
      return await this.redis.exists(this.key(id));
    } catch {
      return false;
    }
  }

  private serialize(entity: UserEntity): Record<string, unknown> {
    return {
      id: entity.id,
      email: entity.email.value,
      name: entity.name.value,
      phone: entity.phone?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      emailVerified: entity.emailVerified,
      phoneVerified: entity.phoneVerified,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(raw: Record<string, unknown>): UserEntity | null {
    try {
      const id = String(raw.id);
      const email = String(raw.email);
      const name = String(raw.name);
      const phone = raw.phone ? String(raw.phone) : null;
      const status = String(raw.status);
      const type = String(raw.type);
      const emailVerified = Boolean(raw.emailVerified);
      const phoneVerified = Boolean(raw.phoneVerified);

      return UserEntity.reconstitute({
        id,
        createdAt: String(raw.createdAt),
        updatedAt: String(raw.updatedAt),
        deletedAt: null,
        props: {
          id: UserIdVO.create(id),
          email: UserEmailVO.create(email),
          name: UserNameVO.create(name),
          phone: phone ? UserPhoneVO.create(phone) : null,
          status: UserStatusVO.create(status),
          type: UserTypeVO.create(type),
          emailVerified,
          phoneVerified,
        },
      });
    } catch {
      return null;
    }
  }
}

/**
 * UserPreferencesCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service.js';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { UserPreferencesEntity } from '@domain/entities/user-preferences.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { PreferenceKeyVO } from '@domain/value-objects/primitives/preference-key.vo';
import { PreferenceValueVO } from '@domain/value-objects/primitives/preference-value.vo';

@Injectable()
export class UserPreferencesCacheRepository {
  private readonly prefix = `${CACHE_PREFIX.USER}prefs:`;
  private readonly ttl = CACHE_TTL.ONE_HOUR;

  constructor(private readonly redis: RedisService) {}

  private key(userId: UserIdVO): string {
    return `${this.prefix}${userId.value}`;
  }

  async get(userId: UserIdVO): Promise<UserPreferencesEntity | null> {
    try {
      const raw = await this.redis.get<{
        userId: string;
        entries: { key: string; value: string }[];
        createdAt: string;
        updatedAt: string;
      }>(this.key(userId));
      if (!raw) return null;
      return this.deserialize(raw);
    } catch {
      return null;
    }
  }

  async set(entity: UserPreferencesEntity): Promise<void> {
    try {
      const userId = entity.userId;
      const knownKeys = [
        'newsletter',
        'promotions',
        'order_updates',
        'product_recommendations',
        'security_alerts',
      ];
      const entries = knownKeys
        .map((k) => {
          const v = entity.get(k);
          return v ? { key: k, value: v.value } : null;
        })
        .filter((x): x is { key: string; value: string } => x !== null);

      await this.redis.set(
        this.key(UserIdVO.create(userId)),
        {
          userId,
          entries,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
        },
        this.ttl
      );
    } catch {
      // swallow
    }
  }

  async invalidate(userId: UserIdVO): Promise<void> {
    try {
      await this.redis.del(this.key(userId));
    } catch {
      // ignore
    }
  }

  async has(userId: UserIdVO): Promise<boolean> {
    try {
      return await this.redis.exists(this.key(userId));
    } catch {
      return false;
    }
  }

  private deserialize(raw: {
    userId: string;
    entries: { key: string; value: string }[];
    createdAt: string;
    updatedAt: string;
  }): UserPreferencesEntity | null {
    try {
      return UserPreferencesEntity.reconstitute({
        id: raw.userId,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: null,
        props: {
          userId: raw.userId,
          entries: raw.entries.map((e) => ({
            key: PreferenceKeyVO.create(e.key),
            value: PreferenceValueVO.create(e.value),
          })),
        },
      });
    } catch {
      return null;
    }
  }
}

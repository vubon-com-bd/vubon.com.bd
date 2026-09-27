/**
 * UserKycCacheRepository
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '../redis.service.js';
import { CACHE_PREFIX, CACHE_TTL } from '@vubon/shared-constants/infrastructure';
import { UserKycEntity } from '@domain/entities/user-kyc.entity';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo';
import { KycIdVO } from '@domain/value-objects/primitives/kyc-id.vo';
import { KycDocumentVO } from '@domain/value-objects/primitives/kyc-document.vo';
import { KycStatusVO } from '@domain/value-objects/primitives/kyc-status.vo';
import { ActivityTimestampVO } from '@domain/value-objects/primitives/activity-timestamp.vo';

@Injectable()
export class UserKycCacheRepository {
  private readonly prefix = `${CACHE_PREFIX.USER}kyc:`;
  private readonly ttl = CACHE_TTL.ONE_HOUR;

  constructor(private readonly redis: RedisService) {}

  private key(userId: UserIdVO): string {
    return `${this.prefix}${userId.value}`;
  }

  async get(userId: UserIdVO): Promise<UserKycEntity | null> {
    try {
      const raw = await this.redis.get<Record<string, unknown>>(this.key(userId));
      if (!raw) return null;
      return this.deserialize(raw);
    } catch {
      return null;
    }
  }

  async set(entity: UserKycEntity): Promise<void> {
    try {
      await this.redis.set(this.key(entity.userId), this.serialize(entity), this.ttl);
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

  private serialize(entity: UserKycEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      document: entity.document.value,
      status: entity.status.value,
      submittedAtMs: entity.submittedAt?.epochMs ?? null,
      verifiedAtMs: entity.verifiedAt?.epochMs ?? null,
      rejectionReason: entity.rejectionReason,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  private deserialize(raw: Record<string, unknown>): UserKycEntity | null {
    try {
      const submittedAtMs = raw.submittedAtMs;
      const verifiedAtMs = raw.verifiedAtMs;

      return UserKycEntity.reconstitute({
        id: String(raw.id),
        createdAt: String(raw.createdAt),
        updatedAt: String(raw.updatedAt),
        deletedAt: null,
        props: {
          kycId: KycIdVO.create(String(raw.id)),
          userId: UserIdVO.create(String(raw.userId)),
          document: KycDocumentVO.create(String(raw.document)),
          status: KycStatusVO.create(String(raw.status)),
          submittedAt:
            typeof submittedAtMs === 'number'
              ? ActivityTimestampVO.fromEpochMs(submittedAtMs)
              : null,
          verifiedAt:
            typeof verifiedAtMs === 'number'
              ? ActivityTimestampVO.fromEpochMs(verifiedAtMs)
              : null,
          rejectionReason: raw.rejectionReason ? String(raw.rejectionReason) : null,
        },
      });
    } catch {
      return null;
    }
  }
}

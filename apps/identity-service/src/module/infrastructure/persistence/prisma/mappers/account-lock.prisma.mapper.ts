/**
 * Account Lock Prisma Mapper
 * @module identity-service/infrastructure/persistence/prisma/mappers
 */
import { AccountLockEntity } from '../../../../domain/entities/account-lock.entity.js';
import { AuthIdVO } from '../../../../domain/value-objects/primitives/auth-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { LockReasonVO } from '../../../../domain/value-objects/primitives/lock-reason.vo.js';
import { LockDurationVO } from '../../../../domain/value-objects/primitives/lock-duration.vo.js';

export interface PrismaAccountLockRow {
  id: string;
  userId: string;
  reason: string;
  lockedAt: Date;
  expiresAt: Date;
  unlockedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class AccountLockPrismaMapper {
  static toDomain(raw: PrismaAccountLockRow): AccountLockEntity {
    const durationSeconds = Math.max(
      60,
      Math.floor(
        (new Date(raw.expiresAt).getTime() -
          new Date(raw.lockedAt).getTime()) /
          1000,
      ),
    );

    return AccountLockEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      version: 1,
      props: {
        authId: AuthIdVO.reconstitute(raw.userId),
        userId: UserIdVO.reconstitute(raw.userId),
        reason: this.parseReason(raw.reason),
        duration: LockDurationVO.fromSeconds(durationSeconds),
        attemptCount: 1,
        lockedAt: new Date(raw.lockedAt).toISOString(),
        lockedUntil: new Date(raw.expiresAt).toISOString(),
        unlockedAt: raw.unlockedAt
          ? new Date(raw.unlockedAt).toISOString()
          : undefined,
      },
    });
  }

  static toPersistence(entity: AccountLockEntity): Record<string, unknown> {
    return {
      id: entity.id,
      userId: entity.userId.value,
      reason: entity.reason.value,
      lockedAt: new Date(entity.lockedAt),
      expiresAt: new Date(entity.lockedUntil),
      unlockedAt: entity.unlockedAt ? new Date(entity.unlockedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private static parseReason(value: string): LockReasonVO {
    try {
      return LockReasonVO.reconstitute(value);
    } catch {
      return LockReasonVO.create('suspicious_activity');
    }
  }
}

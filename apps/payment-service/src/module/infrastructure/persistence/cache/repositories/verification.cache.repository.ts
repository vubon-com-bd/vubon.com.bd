/**
 * VerificationCacheRepository — short-lived verification attempt cache
 * @module payment-service/infrastructure/persistence/cache/repositories
 *
 * Used to prevent brute-force OTP/PIN attempts (rate limiting).
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const PREFIX = 'payment-service:verification:';
const ATTEMPT_WINDOW_SECONDS = 15 * 60; // 15 minutes
const MAX_ATTEMPTS = 5;

export interface VerificationAttemptRecord {
  readonly attempts: number;
  readonly lastAttemptAt: string;
  readonly lockedOut: boolean;
}

@Injectable()
export class VerificationCacheRepository {
  constructor(private readonly redis: RedisService) {}

  async getAttempts(verificationId: string): Promise<VerificationAttemptRecord | null> {
    return this.redis.get<VerificationAttemptRecord>(`${PREFIX}${verificationId}`);
  }

  async recordAttempt(verificationId: string): Promise<VerificationAttemptRecord> {
    const existing = await this.getAttempts(verificationId);
    const attempts = (existing?.attempts ?? 0) + 1;
    const record: VerificationAttemptRecord = {
      attempts,
      lastAttemptAt: new Date().toISOString(),
      lockedOut: attempts >= MAX_ATTEMPTS,
    };
    await this.redis.set(`${PREFIX}${verificationId}`, record, ATTEMPT_WINDOW_SECONDS);
    return record;
  }

  async clear(verificationId: string): Promise<void> {
    await this.redis.del(`${PREFIX}${verificationId}`);
  }

  async isLockedOut(verificationId: string): Promise<boolean> {
    const record = await this.getAttempts(verificationId);
    return record?.lockedOut ?? false;
  }
}

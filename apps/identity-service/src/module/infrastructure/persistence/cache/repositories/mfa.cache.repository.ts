/**
 * MFA Cache Repository — challenge state + rate-limit counters
 * @module identity-service/infrastructure/persistence/cache/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

const CHALLENGE_PREFIX = 'auth:mfa:challenge:';
const ATTEMPTS_PREFIX = 'auth:mfa:attempts:';

export interface MfaChallengeState {
  readonly challengeId: string;
  readonly authId: string;
  readonly method: string;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly createdAt: string;
}

@Injectable()
export class MfaCacheRepository {
  private readonly logger = new Logger(MfaCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  async getChallenge(challengeId: string): Promise<MfaChallengeState | null> {
    return this.redis.get<MfaChallengeState>(`${CHALLENGE_PREFIX}${challengeId}`);
  }

  async setChallenge(state: MfaChallengeState): Promise<void> {
    try {
      await this.redis.set(
        `${CHALLENGE_PREFIX}${state.challengeId}`,
        state,
        AUTH_MFA.OTP_EXPIRY_SECONDS,
      );
    } catch (err) {
      this.logger.warn(`mfa challenge set failed: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }

  async incrementAttempts(challengeId: string): Promise<number> {
    const key = `${ATTEMPTS_PREFIX}${challengeId}`;
    const current = (await this.redis.get<number>(key)) ?? 0;
    const next = current + 1;
    await this.redis.set(key, next, AUTH_MFA.OTP_EXPIRY_SECONDS);
    return next;
  }

  async getAttempts(challengeId: string): Promise<number> {
    return (await this.redis.get<number>(`${ATTEMPTS_PREFIX}${challengeId}`)) ?? 0;
  }

  async clearChallenge(challengeId: string): Promise<void> {
    await this.redis.del(`${CHALLENGE_PREFIX}${challengeId}`);
    await this.redis.del(`${ATTEMPTS_PREFIX}${challengeId}`);
  }
}

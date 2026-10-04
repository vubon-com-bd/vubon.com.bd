/**
 * UserHealth — simple dependency check
 * @module user-service/modules/user/health
 */
import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '@domain/repositories/user.repository.interface';
import type { UserRepository } from '@domain/repositories/user.repository.interface';

export interface HealthCheckResult {
  readonly status: 'up' | 'down';
  readonly details?: Readonly<Record<string, unknown>>;
}

@Injectable()
export class UserHealth {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository
  ) {}

  async check(): Promise<HealthCheckResult> {
    try {
      const all = await this.userRepo.findAll();
      return {
        status: 'up',
        details: { totalUsers: all.length },
      };
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'unknown';
      return {
        status: 'down',
        details: { reason },
      };
    }
  }
}

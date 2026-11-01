/**
 * QuietHoursInfraService — timezone-aware quiet hours enforcement
 * @module notification-service/infrastructure/services/internal
 *
 * Determines if a notification should be deferred due to user's quiet hours.
 * Caches preference lookup via PreferenceCacheRepository।
 */
import { Injectable, Logger } from '@nestjs/common';

import { PreferenceCacheRepository } from '@infrastructure/persistence/cache/repositories/preference.cache.repository.js';
import { QuietHoursService as DomainQuietHours } from '@domain/services/quiet-hours.service.js';

export interface QuietHoursCheckRequest {
  readonly userId: string;
  readonly bypassForCritical?: boolean;
}

export interface QuietHoursCheckResult {
  readonly inQuietHours: boolean;
  readonly localHour: number;
  readonly nextAllowedHour: number;
  readonly deferMs: number;
}

const CACHE_TTL_NOTIFICATION = 300; // 5 min

@Injectable()
export class QuietHoursInfraService {
  private readonly logger = new Logger(QuietHoursInfraService.name);

  constructor(private readonly preferenceCache: PreferenceCacheRepository) {}

  async check(request: QuietHoursCheckRequest): Promise<QuietHoursCheckResult> {
    const now = new Date();

    // Load preference from cache
    const cached = await this.preferenceCache.get(request.userId);

    if (!cached) {
      // No preference — assume no quiet hours
      return {
        inQuietHours: false,
        localHour: now.getUTCHours(),
        nextAllowedHour: now.getUTCHours(),
        deferMs: 0,
      };
    }

    const config = {
      enabled: cached.quietHoursEnabled,
      start: cached.quietHoursStart,
      end: cached.quietHoursEnd,
      timezone: cached.timezone,
    };

    const check = DomainQuietHours.check({
      config,
      now: now.toISOString(),
    });

    if (check.inQuietHours && request.bypassForCritical) {
      this.logger.debug(
        `Quiet hours active for user=${request.userId} but bypassed (critical)`,
      );
      return {
        inQuietHours: false,
        localHour: check.localHour,
        nextAllowedHour: check.nextAllowedHour,
        deferMs: 0,
      };
    }

    const deferMs = check.inQuietHours
      ? DomainQuietHours.msUntilAllowed(config, now.toISOString())
      : 0;

    if (check.inQuietHours) {
      this.logger.debug(
        `User ${request.userId} in quiet hours (localHour=${check.localHour}, defer=${deferMs}ms)`,
      );
    }

    return {
      inQuietHours: check.inQuietHours,
      localHour: check.localHour,
      nextAllowedHour: check.nextAllowedHour,
      deferMs,
    };
  }

  /** Compute deferral for a notification (respecting priority) */
  async shouldDefer(
    userId: string,
    priority: 'critical' | 'high' | 'normal' | 'low' | 'silent',
  ): Promise<{ readonly defer: boolean; readonly deferMs: number }> {
    const bypass = priority === 'critical';
    const result = await this.check({ userId, bypassForCritical: bypass });
    return { defer: result.inQuietHours, deferMs: result.deferMs };
  }

  static readonly _cacheTtl = CACHE_TTL_NOTIFICATION;
}

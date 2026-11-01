/**
 * QuietHoursService
 * @module notification-service/domain/services
 *
 * Determines if we're in user's quiet hours based on timezone + hour।
 * Handles midnight wrap (e.g., 22:00 → 08:00)।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { InvariantViolationError } from '@vubon/shared-kernel/domain/errors/invariant.error';

export interface QuietHoursConfig {
  readonly enabled: boolean;
  readonly start?: number; // 0-23
  readonly end?: number; // 0-23
  readonly timezone: string;
}

export interface CheckQuietHoursInput {
  readonly config: QuietHoursConfig;
  readonly now: string;
}

export interface QuietHoursResult {
  readonly inQuietHours: boolean;
  readonly localHour: number;
  readonly nextAllowedHour: number;
}

export class QuietHoursService {
  static check(input: CheckQuietHoursInput): QuietHoursResult {
    const localHour = this.localHour(input.now, input.config.timezone);

    if (!input.config.enabled) {
      return { inQuietHours: false, localHour, nextAllowedHour: localHour };
    }

    const start = input.config.start;
    const end = input.config.end;

    if (start === undefined || end === undefined) {
      throw new BusinessRuleError(
        'Quiet hours enabled requires start and end',
        'INVALID_QUIET_HOURS',
      );
    }
    if (start < 0 || start > 23 || end < 0 || end > 23) {
      throw new BusinessRuleError('start/end must be 0-23', 'INVALID_QUIET_HOURS');
    }
    if (start === end) {
      throw new BusinessRuleError('start and end cannot be equal', 'INVALID_QUIET_HOURS');
    }

    const inQuiet = start < end
      ? localHour >= start && localHour < end
      : localHour >= start || localHour < end;

    return {
      inQuietHours: inQuiet,
      localHour,
      nextAllowedHour: inQuiet ? end : localHour,
    };
  }

  static localHour(isoTimestamp: string, timezone: string): number {
    try {
      const parts = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        hour12: false,
        timeZone: timezone,
      }).formatToParts(new Date(isoTimestamp));
      const hourPart = parts.find((p) => p.type === 'hour');
      if (!hourPart) {
        throw new InvariantViolationError('hour part missing from DateTimeFormat', 'HOUR_FORMAT');
      }
      return Number(hourPart.value) % 24;
    } catch {
      // Fallback to UTC
      return new Date(isoTimestamp).getUTCHours();
    }
  }

  /** Compute ms until quiet hours end */
  static msUntilAllowed(
    config: QuietHoursConfig,
    nowIso: string,
  ): number {
    if (!config.enabled) return 0;
    const check = this.check({ config, now: nowIso });
    if (!check.inQuietHours) return 0;

    const now = new Date(nowIso);
    const endHour = config.end!;
    const todayEnd = new Date(now);
    todayEnd.setUTCHours(endHour, 0, 0, 0);
    if (todayEnd.getTime() <= now.getTime()) {
      todayEnd.setUTCDate(todayEnd.getUTCDate() + 1);
    }
    return todayEnd.getTime() - now.getTime();
  }
}

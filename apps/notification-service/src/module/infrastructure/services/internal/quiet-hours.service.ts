/**
 * QuietHoursService — evaluates quiet hours + computes next allowed time
 * @module notification-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { NOTIFICATION_PREFERENCE } from '@vubon/shared-constants/platform/notification';
import type { PreferenceEntity } from '../../../domain/entities/preference.entity.js';

export const QUIET_HOURS_SERVICE = Symbol('QUIET_HOURS_SERVICE');

export interface QuietHoursStatus {
  readonly inQuietHours: boolean;
  readonly nextAllowedAt?: string;
  readonly currentHour: number;
}

@Injectable()
export class QuietHoursService {
  private readonly logger = new Logger(QuietHoursService.name);

  /** Evaluate using provided preference + optional explicit time. */
  evaluate(preference: PreferenceEntity, at: Date = new Date()): QuietHoursStatus {
    const currentHour = at.getHours();
    if (!preference.quietHoursEnabled) {
      return { inQuietHours: false, currentHour };
    }

    const inQuiet = preference.isInQuietHours(currentHour);
    if (!inQuiet) {
      return { inQuietHours: false, currentHour };
    }

    return {
      inQuietHours: true,
      nextAllowedAt: this.computeNextAllowed(preference, at),
      currentHour,
    };
  }

  /** Compute next time (ISO) after quiet hours end. */
  computeNextAllowed(preference: PreferenceEntity, from: Date = new Date()): string {
    const endHour = preference.quietHoursEnd ?? NOTIFICATION_PREFERENCE.QUIET_HOURS_END;
    const next = new Date(from);
    next.setHours(endHour, 0, 0, 0);
    if (next.getTime() <= from.getTime()) {
      next.setDate(next.getDate() + 1);
    }
    return next.toISOString();
  }

  /** Determine if a specific notification should bypass quiet hours. */
  shouldBypass(priority: string, channelIsInstant: boolean, typeIsTransactional: boolean, typeIsSecurity: boolean): boolean {
    return priority === 'critical' || channelIsInstant || typeIsTransactional || typeIsSecurity;
  }
}

/**
 * DigestSchedulerService
 * @module notification-service/domain/services
 *
 * Determines user digest send time + period boundaries।
 * Local-time aware।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NOTIFICATION_DIGEST, NOTIFICATION_DIGEST_FREQUENCY } from '@vubon/shared-constants/platform';

export interface DigestScheduleInput {
  readonly frequency: string;
  readonly sendHour: number; // 0-23 local
  readonly timezone: string;
  readonly now: string;
}

export interface DigestScheduleResult {
  readonly nextSendAt: string;
  readonly periodStart: string;
  readonly periodEnd: string;
}

const MS_HOUR = 60 * 60 * 1000;
const MS_DAY = 24 * MS_HOUR;

export class DigestSchedulerService {
  static nextSchedule(input: DigestScheduleInput): DigestScheduleResult {
    if (!Number.isInteger(input.sendHour) || input.sendHour < 0 || input.sendHour > 23) {
      throw new BusinessRuleError(
        'sendHour must be 0-23',
        'INVALID_SEND_HOUR',
        { sendHour: input.sendHour },
      );
    }

    const now = new Date(input.now);
    if (Number.isNaN(now.getTime())) {
      throw new BusinessRuleError('Invalid now timestamp', 'INVALID_TIMESTAMP');
    }

    // Compute next send time in local tz (approximation: UTC offset not applied — assumes UTC time)
    const todayAtSend = new Date(now);
    todayAtSend.setUTCHours(input.sendHour, 0, 0, 0);

    let nextSendAt: Date;
    if (todayAtSend.getTime() <= now.getTime()) {
      nextSendAt = new Date(todayAtSend.getTime() + MS_DAY);
    } else {
      nextSendAt = todayAtSend;
    }

    const periodMs = this.getFrequencyPeriodMs(input.frequency);
    const periodStart = new Date(nextSendAt.getTime() - periodMs);
    const periodEnd = nextSendAt;

    return {
      nextSendAt: nextSendAt.toISOString(),
      periodStart: periodStart.toISOString(),
      periodEnd: periodEnd.toISOString(),
    };
  }

  private static getFrequencyPeriodMs(frequency: string): number {
    switch (frequency) {
      case NOTIFICATION_DIGEST_FREQUENCY.HOURLY: return MS_HOUR;
      case NOTIFICATION_DIGEST_FREQUENCY.DAILY: return MS_DAY;
      case NOTIFICATION_DIGEST_FREQUENCY.WEEKLY: return 7 * MS_DAY;
      case NOTIFICATION_DIGEST_FREQUENCY.BIWEEKLY: return 14 * MS_DAY;
      case NOTIFICATION_DIGEST_FREQUENCY.MONTHLY: return 30 * MS_DAY;
      default:
        throw new BusinessRuleError(
          `Unsupported digest frequency: "${frequency}"`,
          'UNSUPPORTED_FREQUENCY',
          { frequency },
        );
    }
  }

  /** Default config for new digest */
  static defaultConfig(): {
    frequency: string;
    sendHour: number;
    timezone: string;
  } {
    return {
      frequency: NOTIFICATION_DIGEST.DEFAULT_FREQUENCY,
      sendHour: NOTIFICATION_DIGEST.DEFAULT_SEND_HOUR,
      timezone: NOTIFICATION_DIGEST.TIMEZONE_DEFAULT,
    };
  }
}

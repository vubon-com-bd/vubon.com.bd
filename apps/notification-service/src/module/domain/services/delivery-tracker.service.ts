/**
 * DeliveryTrackerService
 * @module notification-service/domain/services
 *
 * Aggregates delivery attempt stats into rollups।
 * Provides counters used by analytics + dashboards।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface DeliveryAttemptRecord {
  readonly attemptNumber: number;
  readonly succeeded: boolean;
  readonly durationMs: number;
  readonly providerName?: string;
  readonly errorCode?: string;
  readonly occurredAt: string;
}

export interface TrackDeliveryInput {
  readonly attempts: readonly DeliveryAttemptRecord[];
  readonly totalRecipients?: number;
}

export interface DeliveryStats {
  readonly totalAttempts: number;
  readonly successful: number;
  readonly failed: number;
  readonly successRate: number;
  readonly avgDurationMs: number;
  readonly p95DurationMs: number;
  readonly byErrorCode: Readonly<Record<string, number>>;
  readonly byProvider: Readonly<Record<string, number>>;
}

export class DeliveryTrackerService {
  static summarize(input: TrackDeliveryInput): DeliveryStats {
    if (!Array.isArray(input.attempts)) {
      throw new BusinessRuleError('attempts must be an array', 'INVALID_INPUT');
    }

    const total = input.attempts.length;
    if (total === 0) {
      return {
        totalAttempts: 0,
        successful: 0,
        failed: 0,
        successRate: 0,
        avgDurationMs: 0,
        p95DurationMs: 0,
        byErrorCode: {},
        byProvider: {},
      };
    }

    let successful = 0;
    let totalDuration = 0;
    const durations: number[] = [];
    const byErrorCode: Record<string, number> = {};
    const byProvider: Record<string, number> = {};

    for (const a of input.attempts) {
      if (a.succeeded) successful++;
      if (Number.isFinite(a.durationMs) && a.durationMs >= 0) {
        durations.push(a.durationMs);
        totalDuration += a.durationMs;
      }
      if (a.errorCode) {
        byErrorCode[a.errorCode] = (byErrorCode[a.errorCode] ?? 0) + 1;
      }
      if (a.providerName) {
        byProvider[a.providerName] = (byProvider[a.providerName] ?? 0) + 1;
      }
    }

    durations.sort((x, y) => x - y);
    const p95Index = Math.max(0, Math.ceil(0.95 * durations.length) - 1);
    const p95 = durations[p95Index] ?? 0;

    return {
      totalAttempts: total,
      successful,
      failed: total - successful,
      successRate: successful / total,
      avgDurationMs: durations.length > 0 ? Math.round(totalDuration / durations.length) : 0,
      p95DurationMs: p95,
      byErrorCode,
      byProvider,
    };
  }

  /** Determine if delivery is "at risk" based on partial failure */
  static isAtRisk(stats: DeliveryStats, threshold: number = 0.9): boolean {
    return stats.totalAttempts > 0 && stats.successRate < threshold;
  }
}

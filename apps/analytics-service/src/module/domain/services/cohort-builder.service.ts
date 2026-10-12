/**
 * Cohort Builder Service
 * @module analytics-service/domain/services
 *
 * User sessions/events থেকে cohort তৈরি করে।
 * Business Rule:
 * - Group users by acquisition period
 * - Return cohort membership map
 */
export interface UserAcquisition {
  readonly userId: string;
  readonly acquiredAt: number;
}

export interface CohortBucket {
  readonly periodStart: number;
  readonly periodEnd: number;
  readonly userIds: readonly string[];
  readonly label: string;
}

export class CohortBuilderService {
  /**
   * Build cohorts by period
   */
  build(
    acquisitions: readonly UserAcquisition[],
    period: 'day' | 'week' | 'month',
    fromMs: number,
    toMs: number
  ): readonly CohortBucket[] {
    if (fromMs >= toMs) throw new Error('fromMs must be < toMs');

    const periodMs = this.periodMs(period);
    const buckets = new Map<number, string[]>();

    let cursor = this.alignToStart(fromMs, period);
    while (cursor < toMs) {
      buckets.set(cursor, []);
      cursor += periodMs;
    }

    for (const acq of acquisitions) {
      if (acq.acquiredAt < fromMs || acq.acquiredAt >= toMs) continue;
      const bucketStart = this.alignToStart(acq.acquiredAt, period);
      const arr = buckets.get(bucketStart);
      if (arr) arr.push(acq.userId);
    }

    const result: CohortBucket[] = [];
    for (const [start, userIds] of buckets.entries()) {
      result.push({
        periodStart: start,
        periodEnd: start + periodMs,
        userIds: Object.freeze([...userIds]),
        label: this.formatBucketLabel(start, period),
      });
    }

    return result;
  }

  cohortSize(bucket: CohortBucket): number {
    return bucket.userIds.length;
  }

  averageCohortSize(buckets: readonly CohortBucket[]): number {
    if (buckets.length === 0) return 0;
    const total = buckets.reduce((sum, b) => sum + b.userIds.length, 0);
    return Math.round((total / buckets.length) * 100) / 100;
  }

  filterSmallCohorts(
    buckets: readonly CohortBucket[],
    minSize: number
  ): readonly CohortBucket[] {
    return buckets.filter((b) => b.userIds.length >= minSize);
  }

  private periodMs(period: 'day' | 'week' | 'month'): number {
    if (period === 'day') return 24 * 60 * 60 * 1000;
    if (period === 'week') return 7 * 24 * 60 * 60 * 1000;
    return 30 * 24 * 60 * 60 * 1000;
  }

  private alignToStart(ms: number, period: 'day' | 'week' | 'month'): number {
    const d = new Date(ms);
    if (period === 'day') {
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    }
    if (period === 'week') {
      const day = d.getUTCDay();
      return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - day);
    }
    return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
  }

  private formatBucketLabel(ms: number, period: 'day' | 'week' | 'month'): string {
    const d = new Date(ms);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    if (period === 'month') return `${y}-${m}`;
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
}

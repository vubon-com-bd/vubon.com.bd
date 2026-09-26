import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ANALYTICS_INTERVAL } from '@vubon/shared-constants/platform/analytics';

export interface GranularityProps {
  readonly interval: string;
  readonly seconds: number;
}

export class GranularityVO extends BaseVO<GranularityProps> {
  static create(interval: string): GranularityVO {
    const seconds = GranularityVO.secondsFor(interval);
    if (seconds === null) {
      throw new Error(`Invalid granularity: ${interval}`);
    }
    return new GranularityVO(Object.freeze({ interval, seconds }));
  }

  static auto(rangeMs: number): GranularityVO {
    const days = rangeMs / (24 * 60 * 60 * 1000);
    if (days <= 1) return GranularityVO.create(ANALYTICS_INTERVAL.HOUR);
    if (days <= 30) return GranularityVO.create(ANALYTICS_INTERVAL.DAY);
    if (days <= 180) return GranularityVO.create(ANALYTICS_INTERVAL.WEEK);
    return GranularityVO.create(ANALYTICS_INTERVAL.MONTH);
  }

  private static secondsFor(interval: string): number | null {
    const map: Record<string, number> = {
      minute: 60,
      five_minutes: 300,
      fifteen_minutes: 900,
      thirty_minutes: 1800,
      hour: 3600,
      six_hours: 21600,
      twelve_hours: 43200,
      day: 86400,
      week: 604800,
      month: 2592000,
      quarter: 7776000,
      year: 31536000,
    };
    return map[interval] ?? null;
  }

  private constructor(value: GranularityProps) {
    super(value);
  }

  get interval(): string { return this.value.interval; }
  get seconds(): number { return this.value.seconds; }

  bucketCountIn(rangeMs: number): number {
    return Math.ceil(rangeMs / (this.value.seconds * 1000));
  }

  bucketFor(ms: number): number {
    return Math.floor(ms / (this.value.seconds * 1000));
  }
}

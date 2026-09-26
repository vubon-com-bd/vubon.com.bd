import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_FREQUENCIES = new Set<string>([
  'once', 'hourly', 'daily', 'weekly', 'monthly', 'quarterly', 'yearly',
]);

export class ReportFrequencyVO extends BaseTypeVO<string> {
  static create(raw: string): ReportFrequencyVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_FREQUENCIES.has(normalized)) {
      throw new Error(`Invalid report frequency: ${raw}`);
    }
    return new ReportFrequencyVO(normalized);
  }

  static once(): ReportFrequencyVO {
    return new ReportFrequencyVO('once');
  }

  private constructor(value: string) {
    super(value);
  }

  get isRecurring(): boolean {
    return this.value !== 'once';
  }

  get intervalMs(): number | null {
    const map: Record<string, number> = {
      hourly: 60 * 60 * 1000,
      daily: 24 * 60 * 60 * 1000,
      weekly: 7 * 24 * 60 * 60 * 1000,
      monthly: 30 * 24 * 60 * 60 * 1000,
      quarterly: 90 * 24 * 60 * 60 * 1000,
      yearly: 365 * 24 * 60 * 60 * 1000,
    };
    return map[this.value] ?? null;
  }

  nextRunAt(from: Date): Date | null {
    const interval = this.intervalMs;
    if (interval === null) return null;
    return new Date(from.getTime() + interval);
  }
}

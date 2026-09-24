import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_PERIODS = new Set<string>([
  'daily', 'weekly', 'monthly', 'quarterly', 'yearly',
]);

export class CohortPeriodVO extends BaseTypeVO<string> {
  static create(raw: string): CohortPeriodVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_PERIODS.has(normalized)) {
      throw new Error(`Invalid cohort period: ${raw}`);
    }
    return new CohortPeriodVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get days(): number {
    const map: Record<string, number> = {
      daily: 1, weekly: 7, monthly: 30, quarterly: 90, yearly: 365,
    };
    return map[this.value] ?? 30;
  }

  bucketFor(date: Date): string {
    const y = date.getUTCFullYear();
    const m = String(date.getUTCMonth() + 1).padStart(2, '0');
    const d = String(date.getUTCDate()).padStart(2, '0');
    switch (this.value) {
      case 'daily': return `${y}-${m}-${d}`;
      case 'weekly': {
        const onejan = new Date(Date.UTC(y, 0, 1));
        const week = Math.ceil(((date.getTime() - onejan.getTime()) / 86400000 + onejan.getUTCDay() + 1) / 7);
        return `${y}-W${String(week).padStart(2, '0')}`;
      }
      case 'monthly': return `${y}-${m}`;
      case 'quarterly': return `${y}-Q${Math.floor((date.getUTCMonth()) / 3) + 1}`;
      case 'yearly': return `${y}`;
      default: return `${y}-${m}-${d}`;
    }
  }
}

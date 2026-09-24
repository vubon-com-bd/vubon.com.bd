import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_REPORT_TYPES = new Set<string>([
  'overview', 'traffic', 'engagement', 'conversion', 'retention',
  'revenue', 'cohort', 'funnel', 'attribution', 'custom',
]);

export class ReportTypeVO extends BaseTypeVO<string> {
  static create(raw: string): ReportTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_REPORT_TYPES.has(normalized)) {
      throw new Error(`Invalid report type: ${raw}`);
    }
    return new ReportTypeVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isRevenueFocused(): boolean {
    return this.value === 'revenue' || this.value === 'conversion';
  }

  get isUserFocused(): boolean {
    return this.value === 'retention' || this.value === 'cohort';
  }
}

import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const ALLOWED = new Set<string>([
  'once',
  'hourly',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'custom',
]);

export class ScheduleFrequencyVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): ScheduleFrequencyVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid schedule frequency: ${raw}`);
    }
    return new ScheduleFrequencyVO(raw);
  }
}

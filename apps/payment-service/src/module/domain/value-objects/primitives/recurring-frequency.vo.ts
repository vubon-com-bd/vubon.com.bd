import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';

const VALID = new Set<string>([
  'daily',
  'weekly',
  'biweekly',
  'monthly',
  'quarterly',
  'semiannually',
  'yearly',
]);

export class RecurringFrequencyVO extends BaseTypeVO<string> {
  static create(value: string): RecurringFrequencyVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid recurring frequency: ${value}`);
    }
    return new RecurringFrequencyVO(value);
  }

  private constructor(value: string) {
    super(value);
  }
}

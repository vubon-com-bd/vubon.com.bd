/**
 * ActivityId Value Object
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';

export class ActivityIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ActivityIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new Error('ActivityId cannot be empty');
    }
    return new ActivityIdVO(raw.trim());
  }
}

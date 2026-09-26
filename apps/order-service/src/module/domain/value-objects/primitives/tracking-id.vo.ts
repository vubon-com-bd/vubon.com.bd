import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class TrackingIdVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingIdVO {
    if (!raw || raw.trim().length === 0) {
      throw new ValidationError('TrackingId', 'cannot be empty');
    }
    return new TrackingIdVO(raw);
  }
}

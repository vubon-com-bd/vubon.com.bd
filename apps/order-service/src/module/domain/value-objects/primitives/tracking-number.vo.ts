import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class TrackingNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingNumberVO {
    const trimmed = raw.trim().toUpperCase();
    if (!/^[A-Z]{2,4}\d{8,16}$/.test(trimmed)) {
      throw new ValidationError('TrackingNumber', `invalid format: ${raw}`);
    }
    return new TrackingNumberVO(trimmed);
  }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>(['requested', 'approved', 'rejected', 'cancelled']);

export class CancelStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): CancelStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('CancelStatus', `invalid: ${raw}`);
    }
    return new CancelStatusVO(raw);
  }

  isFinal(): boolean {
    return ['approved', 'rejected', 'cancelled'].includes(this.value);
  }
}

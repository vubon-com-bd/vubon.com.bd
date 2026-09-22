import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'requested',
  'approved',
  'rejected',
  'in_transit',
  'received',
  'completed',
]);

export class ReturnStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ReturnStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('ReturnStatus', `invalid: ${raw}`);
    }
    return new ReturnStatusVO(raw);
  }

  isFinal(): boolean {
    return ['rejected', 'completed'].includes(this.value);
  }
}

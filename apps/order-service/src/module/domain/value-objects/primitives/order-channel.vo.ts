import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>(['web', 'mobile', 'app', 'pos', 'phone', 'api']);

export class OrderChannelVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderChannelVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('OrderChannel', `invalid: ${raw}`);
    }
    return new OrderChannelVO(raw);
  }
}

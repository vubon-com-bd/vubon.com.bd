import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

export class OrderNumberVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderNumberVO {
    const trimmed = raw.trim();
    if (!/^ORD-\d{8}-[A-Z0-9]{6}$/.test(trimmed)) {
      throw new ValidationError('OrderNumber', `invalid format: ${raw}`);
    }
    return new OrderNumberVO(trimmed);
  }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'scheduled',
  'in_transit',
  'out_for_delivery',
  'attempted',
  'delivered',
  'failed',
  'returned',
]);

export class DeliveryStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): DeliveryStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('DeliveryStatus', `invalid: ${raw}`);
    }
    return new DeliveryStatusVO(raw);
  }

  isTerminal(): boolean {
    return ['delivered', 'failed', 'returned'].includes(this.value);
  }
}

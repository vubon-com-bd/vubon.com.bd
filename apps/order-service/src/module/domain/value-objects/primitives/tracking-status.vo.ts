import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'pending',
  'picked_up',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'failed',
  'returned',
]);

export class TrackingStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): TrackingStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('TrackingStatus', `invalid: ${raw}`);
    }
    return new TrackingStatusVO(raw);
  }

  isTerminal(): boolean {
    return ['delivered', 'failed', 'returned'].includes(this.value);
  }
}

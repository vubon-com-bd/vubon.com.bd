import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'pending',
  'started',
  'packed',
  'shipped',
  'delivered',
  'completed',
  'failed',
  'cancelled',
]);

export class FulfillmentStatusVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): FulfillmentStatusVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('FulfillmentStatus', `invalid: ${raw}`);
    }
    return new FulfillmentStatusVO(raw);
  }

  isTerminal(): boolean {
    return ['completed', 'failed', 'cancelled'].includes(this.value);
  }
}

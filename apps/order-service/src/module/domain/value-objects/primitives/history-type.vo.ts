import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '../../errors/validation.errors';

const VALID = new Set<string>([
  'created',
  'updated',
  'confirmed',
  'processing',
  'packed',
  'shipped',
  'delivered',
  'cancelled',
  'returned',
  'refunded',
  'status_changed',
  'payment_received',
  'note_added',
  'tracking_added',
]);

export class HistoryTypeVO extends BaseVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): HistoryTypeVO {
    if (!VALID.has(raw)) {
      throw new ValidationError('HistoryType', `invalid: ${raw}`);
    }
    return new HistoryTypeVO(raw);
  }
}

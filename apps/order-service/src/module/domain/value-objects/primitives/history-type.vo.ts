/**
 * HistoryType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_HISTORY_TYPE } from '@vubon/shared-constants/business/order';

export type HistoryTypeValue = (typeof ORDER_HISTORY_TYPE)[keyof typeof ORDER_HISTORY_TYPE];

const VALID_TYPES: readonly string[] = Object.values(ORDER_HISTORY_TYPE);

export class HistoryTypeVO extends BaseTypeVO<HistoryTypeValue> {
  private constructor(value: HistoryTypeValue) {
    super(value);
  }

  static create(raw: string): HistoryTypeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('HistoryType must be a string', 'type');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_TYPES.includes(normalized)) {
      throw new ValidationError(
        `Invalid HistoryType: "${normalized}". Allowed: ${VALID_TYPES.join(', ')}`,
        'type',
      );
    }
    return new HistoryTypeVO(normalized as HistoryTypeValue);
  }

  static reconstitute(raw: string): HistoryTypeVO {
    return new HistoryTypeVO(raw as HistoryTypeValue);
  }

  isSystemGenerated(): boolean {
    return (
      this.value === ORDER_HISTORY_TYPE.CREATED ||
      this.value === ORDER_HISTORY_TYPE.STATUS_CHANGED ||
      this.value === ORDER_HISTORY_TYPE.PAYMENT_RECEIVED ||
      this.value === ORDER_HISTORY_TYPE.PAYMENT_FAILED
    );
  }
}

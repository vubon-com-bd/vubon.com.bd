/**
 * HistoryType Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_HISTORY_TYPE } from '@vubon/shared-constants/business/order';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(ORDER_HISTORY_TYPE) as readonly string[];

export class HistoryTypeVO extends BaseTypeVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): HistoryTypeVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid history type "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'historyType',
      );
    }
    return new HistoryTypeVO(raw);
  }

  static reconstitute(raw: string): HistoryTypeVO { return new HistoryTypeVO(raw); }

  isStatusChange(): boolean {
    return this.value === ORDER_HISTORY_TYPE.STATUS_CHANGED;
  }

  isLifecycleEvent(): boolean {
    return [
      ORDER_HISTORY_TYPE.CREATED,
      ORDER_HISTORY_TYPE.SHIPPED,
      ORDER_HISTORY_TYPE.DELIVERED,
      ORDER_HISTORY_TYPE.CANCELLED,
      ORDER_HISTORY_TYPE.RETURNED,
      ORDER_HISTORY_TYPE.REFUNDED,
    ].includes(this.value as never);
  }
}

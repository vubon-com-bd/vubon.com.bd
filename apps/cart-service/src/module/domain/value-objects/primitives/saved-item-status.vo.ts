/**
 * SavedItemStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { SAVED_ITEM_STATUS } from '@vubon/shared-constants/business/cart';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(SAVED_ITEM_STATUS) as readonly string[];

export class SavedItemStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SavedItemStatusVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid saved item status "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'status',
      );
    }
    return new SavedItemStatusVO(raw);
  }

  static reconstitute(raw: string): SavedItemStatusVO {
    return new SavedItemStatusVO(raw);
  }

  isActive(): boolean {
    return this.value === SAVED_ITEM_STATUS.ACTIVE;
  }

  isMovedToCart(): boolean {
    return this.value === SAVED_ITEM_STATUS.MOVED_TO_CART;
  }

  isAvailable(): boolean {
    return this.value === SAVED_ITEM_STATUS.ACTIVE;
  }
}

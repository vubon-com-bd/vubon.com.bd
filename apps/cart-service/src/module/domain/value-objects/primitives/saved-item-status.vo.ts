/**
 * SavedItemStatus Value Object
 * @module cart-service/domain/value-objects/primitives
 */
import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export type SavedItemStatusValue =
  | 'active'
  | 'moved_to_cart'
  | 'removed'
  | 'out_of_stock'
  | 'unavailable';

const VALID_STATUSES: readonly string[] = [
  'active',
  'moved_to_cart',
  'removed',
  'out_of_stock',
  'unavailable',
];

const VALID_TRANSITIONS: Readonly<Record<SavedItemStatusValue, readonly SavedItemStatusValue[]>> = {
  active: ['moved_to_cart', 'removed', 'out_of_stock', 'unavailable'],
  moved_to_cart: ['active', 'removed'],
  removed: [],
  out_of_stock: ['active', 'removed'],
  unavailable: ['active', 'removed'],
};

export class SavedItemStatusVO extends BaseStatusVO<SavedItemStatusValue> {
  private constructor(value: SavedItemStatusValue) {
    super(value);
  }

  static create(raw: string): SavedItemStatusVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_STATUSES.includes(normalized)) {
      throw new ValidationError(
        `Invalid SavedItemStatus: "${normalized}". Allowed: ${VALID_STATUSES.join(', ')}`,
        'status',
      );
    }
    return new SavedItemStatusVO(normalized as SavedItemStatusValue);
  }

  static active(): SavedItemStatusVO {
    return new SavedItemStatusVO('active');
  }

  static reconstitute(raw: string): SavedItemStatusVO {
    return new SavedItemStatusVO(raw as SavedItemStatusValue);
  }

  isActiveStatus(): boolean { return this.value === 'active'; }
  isMovedToCart(): boolean { return this.value === 'moved_to_cart'; }
  isRemoved(): boolean { return this.value === 'removed'; }
  isOutOfStock(): boolean { return this.value === 'out_of_stock'; }
  isUnavailable(): boolean { return this.value === 'unavailable'; }

  isFinal(): boolean { return this.isRemoved(); }
  canMoveToCart(): boolean { return this.isActiveStatus(); }

  canTransitionTo(target: string): boolean {
    const allowed = VALID_TRANSITIONS[this.value] ?? [];
    return allowed.includes(target as SavedItemStatusValue);
  }
}

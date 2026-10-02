/**
 * SavedForLater Composite VO
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SavedItemIdVO } from '../primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '../primitives/saved-item-status.vo.js';
import { CartProductIdVO } from '../primitives/product-id.vo.js';
import { CartVariantIdVO } from '../primitives/variant-id.vo.js';
import { CartUserIdVO } from '../primitives/user-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export interface SavedForLaterProps {
  readonly id: SavedItemIdVO;
  readonly userId: CartUserIdVO;
  readonly productId: CartProductIdVO;
  readonly variantId?: CartVariantIdVO;
  readonly status: SavedItemStatusVO;
  readonly quantity: number;
  readonly addedAt: string;
  readonly updatedAt: string;
  readonly notes?: string;
}

export class SavedForLaterCompositeVO extends BaseVO<SavedForLaterProps> {
  private constructor(props: SavedForLaterProps) {
    super(props);
  }

  static create(props: SavedForLaterProps): SavedForLaterCompositeVO {
    if (props.quantity <= 0 || !Number.isInteger(props.quantity)) {
      throw new ValidationError('Quantity must be a positive integer', 'quantity');
    }
    return new SavedForLaterCompositeVO(props);
  }

  static reconstitute(props: SavedForLaterProps): SavedForLaterCompositeVO {
    return new SavedForLaterCompositeVO(props);
  }

  get id(): SavedItemIdVO { return this.value.id; }
  get userId(): CartUserIdVO { return this.value.userId; }
  get productId(): CartProductIdVO { return this.value.productId; }
  get variantId(): CartVariantIdVO | undefined { return this.value.variantId; }
  get status(): SavedItemStatusVO { return this.value.status; }
  get quantity(): number { return this.value.quantity; }
  get addedAt(): string { return this.value.addedAt; }
  get updatedAt(): string { return this.value.updatedAt; }
  get notes(): string | undefined { return this.value.notes; }

  canMoveToCart(): boolean {
    return this.value.status.isActive();
  }

  withStatus(status: SavedItemStatusVO): SavedForLaterCompositeVO {
    return new SavedForLaterCompositeVO({ ...this.value, status });
  }
}

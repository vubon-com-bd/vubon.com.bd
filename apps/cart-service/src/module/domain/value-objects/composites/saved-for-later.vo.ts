import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SavedItemIdVO } from '../primitives/saved-item-id.vo';
import { SavedItemStatusVO } from '../primitives/saved-item-status.vo';
import { ProductIdVO } from '../primitives/product-id.vo';
import { VariantIdVO } from '../primitives/variant-id.vo';

export interface SavedForLaterVOProps {
  readonly id: SavedItemIdVO;
  readonly productId: ProductIdVO;
  readonly variantId: VariantIdVO | null;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly currency: string;
  readonly status: SavedItemStatusVO;
  readonly savedAt: Date;
}

export class SavedForLaterVO extends BaseVO<SavedForLaterVOProps> {
  private constructor(props: SavedForLaterVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SavedForLaterVOProps): SavedForLaterVO {
    return new SavedForLaterVO(props);
  }

  get id(): SavedItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get variantId(): VariantIdVO | null { return this.value.variantId; }
  get quantity(): number { return this.value.quantity; }
  get unitPrice(): number { return this.value.unitPrice; }
  get currency(): string { return this.value.currency; }
  get status(): SavedItemStatusVO { return this.value.status; }
  get savedAt(): Date { return this.value.savedAt; }
}

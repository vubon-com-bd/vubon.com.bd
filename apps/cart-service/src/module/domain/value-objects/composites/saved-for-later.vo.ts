/**
 * SavedForLaterVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SavedItemIdVO } from '../primitives/saved-item-id.vo.js';
import { SavedItemStatusVO } from '../primitives/saved-item-status.vo.js';
import { ProductIdVO } from '../primitives/product-id.vo.js';

export interface SavedForLaterVOProps {
  readonly id: SavedItemIdVO;
  readonly productId: ProductIdVO;
  readonly status: SavedItemStatusVO;
  readonly savedAt: string;
  readonly note?: string;
}

export class SavedForLaterVO extends BaseVO<SavedForLaterVOProps> {
  private constructor(props: SavedForLaterVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: SavedForLaterVOProps): SavedForLaterVO {
    const vo = new SavedForLaterVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: SavedForLaterVOProps): SavedForLaterVO {
    return new SavedForLaterVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.note !== undefined && v.note.length > 500) {
      throw new ValidationError('note exceeds 500 chars', 'note');
    }
  }

  get id(): SavedItemIdVO { return this.value.id; }
  get productId(): ProductIdVO { return this.value.productId; }
  get status(): SavedItemStatusVO { return this.value.status; }
  get savedAt(): string { return this.value.savedAt; }
  get note(): string | undefined { return this.value.note; }

  canMoveToCart(): boolean { return this.status.canMoveToCart(); }
  hasNote(): boolean { return !!this.value.note; }
}

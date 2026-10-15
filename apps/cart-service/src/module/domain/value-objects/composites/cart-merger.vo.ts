/**
 * CartMergerVO — Composite Value Object
 * @module cart-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartMergerIdVO } from '../primitives/cart-merger-id.vo.js';
import { CartIdVO } from '../primitives/cart-id.vo.js';
import { MergeStrategyVO } from '../primitives/merge-strategy.vo.js';

export interface CartMergerVOProps {
  readonly id: CartMergerIdVO;
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly strategy: MergeStrategyVO;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: string;
}

export class CartMergerVO extends BaseVO<CartMergerVOProps> {
  private constructor(props: CartMergerVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: CartMergerVOProps): CartMergerVO {
    const vo = new CartMergerVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: CartMergerVOProps): CartMergerVO {
    return new CartMergerVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.sourceCartId.value === v.targetCartId.value) {
      throw new ValidationError('source and target cart must differ', 'targetCartId');
    }
    if (!Number.isInteger(v.itemsMerged) || v.itemsMerged < 0) {
      throw new ValidationError(
        'itemsMerged must be a non-negative integer',
        'itemsMerged',
      );
    }
    if (!Number.isInteger(v.conflicts) || v.conflicts < 0) {
      throw new ValidationError('conflicts must be a non-negative integer', 'conflicts');
    }
  }

  get id(): CartMergerIdVO { return this.value.id; }
  get sourceCartId(): CartIdVO { return this.value.sourceCartId; }
  get targetCartId(): CartIdVO { return this.value.targetCartId; }
  get strategy(): MergeStrategyVO { return this.value.strategy; }
  get itemsMerged(): number { return this.value.itemsMerged; }
  get conflicts(): number { return this.value.conflicts; }
  get mergedAt(): string { return this.value.mergedAt; }

  hasConflicts(): boolean { return this.value.conflicts > 0; }
  isClean(): boolean { return this.value.conflicts === 0 && this.value.itemsMerged > 0; }
}

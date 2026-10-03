/**
 * CartMerger Composite VO
 * @module cart-service/domain/value-objects/composites
 *
 * Business rules:
 * - Source and target carts must be different
 * - Cannot re-merge already-merged carts
 * - Merge strategy drives item combination
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartMergerIdVO } from '../primitives/cart-merger-id.vo.js';
import { MergeStrategyVO } from '../primitives/merge-strategy.vo.js';
import { CartIdVO } from '../primitives/cart-id.vo.js';

export interface CartMergerProps {
  readonly id: CartMergerIdVO;
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly strategy: MergeStrategyVO;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: string;
  readonly mergedBy?: string;
}

export class CartMergerCompositeVO extends BaseVO<CartMergerProps> {
  private constructor(props: CartMergerProps) {
    super(props);
  }

  static create(props: CartMergerProps): CartMergerCompositeVO {
    if (props.sourceCartId.value === props.targetCartId.value) {
      throw new ValidationError(
        'Source and target carts must differ',
        'sourceCartId',
      );
    }
    if (props.itemsMerged < 0 || props.conflicts < 0) {
      throw new ValidationError('Merge counts cannot be negative', 'itemsMerged');
    }
    return new CartMergerCompositeVO(props);
  }

  static reconstitute(props: CartMergerProps): CartMergerCompositeVO {
    return new CartMergerCompositeVO(props);
  }

  get id(): CartMergerIdVO { return this.value.id; }
  get sourceCartId(): CartIdVO { return this.value.sourceCartId; }
  get targetCartId(): CartIdVO { return this.value.targetCartId; }
  get strategy(): MergeStrategyVO { return this.value.strategy; }
  get itemsMerged(): number { return this.value.itemsMerged; }
  get conflicts(): number { return this.value.conflicts; }
  get mergedAt(): string { return this.value.mergedAt; }
  get mergedBy(): string | undefined { return this.value.mergedBy; }

  hadConflicts(): boolean {
    return this.value.conflicts > 0;
  }

  /** Success ratio — items merged without conflict */
  successRatio(): number {
    if (this.value.itemsMerged === 0) return 1;
    const clean = this.value.itemsMerged - this.value.conflicts;
    return clean / this.value.itemsMerged;
  }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartMergerIdVO } from '../primitives/cart-merger-id.vo';
import { MergeStrategyVO } from '../primitives/merge-strategy.vo';
import { CartIdVO } from '../primitives/cart-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface CartMergerVOProps {
  readonly id: CartMergerIdVO;
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly userId: UserIdVO;
  readonly strategy: MergeStrategyVO;
  readonly itemsAdded: number;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: Date;
}

export class CartMergerVO extends BaseVO<CartMergerVOProps> {
  private constructor(props: CartMergerVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartMergerVOProps): CartMergerVO {
    return new CartMergerVO(props);
  }

  get id(): CartMergerIdVO { return this.value.id; }
  get sourceCartId(): CartIdVO { return this.value.sourceCartId; }
  get targetCartId(): CartIdVO { return this.value.targetCartId; }
  get userId(): UserIdVO { return this.value.userId; }
  get strategy(): MergeStrategyVO { return this.value.strategy; }
  get itemsAdded(): number { return this.value.itemsAdded; }
  get itemsMerged(): number { return this.value.itemsMerged; }
  get conflicts(): number { return this.value.conflicts; }
  get mergedAt(): Date { return this.value.mergedAt; }
}

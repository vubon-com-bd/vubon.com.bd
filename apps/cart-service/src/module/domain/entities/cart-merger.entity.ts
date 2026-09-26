import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo';
import { MergeStrategyVO } from '../value-objects/primitives/merge-strategy.vo';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface CartMergerEntityProps {
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly userId: UserIdVO;
  readonly strategy: MergeStrategyVO;
  readonly itemsAdded: number;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: Date;
}

export class CartMergerEntity extends BaseEntity<CartMergerIdVO> {
  private readonly _sourceCartId: CartIdVO;
  private readonly _targetCartId: CartIdVO;
  private readonly _userId: UserIdVO;
  private readonly _strategy: MergeStrategyVO;
  private readonly _itemsAdded: number;
  private readonly _itemsMerged: number;
  private readonly _conflicts: number;
  private readonly _mergedAt: Date;

  private constructor(
    id: CartMergerIdVO,
    props: CartMergerEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sourceCartId = props.sourceCartId;
    this._targetCartId = props.targetCartId;
    this._userId = props.userId;
    this._strategy = props.strategy;
    this._itemsAdded = props.itemsAdded;
    this._itemsMerged = props.itemsMerged;
    this._conflicts = props.conflicts;
    this._mergedAt = props.mergedAt;
  }

  static create(props: CartMergerEntityProps): CartMergerEntity {
    const now = new Date().toISOString();
    const id = CartMergerIdVO.create(crypto.randomUUID());
    return new CartMergerEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: CartMergerIdVO,
    props: CartMergerEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): CartMergerEntity {
    return new CartMergerEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get sourceCartId(): CartIdVO { return this._sourceCartId; }
  get targetCartId(): CartIdVO { return this._targetCartId; }
  get userId(): UserIdVO { return this._userId; }
  get strategy(): MergeStrategyVO { return this._strategy; }
  get itemsAdded(): number { return this._itemsAdded; }
  get itemsMerged(): number { return this._itemsMerged; }
  get conflicts(): number { return this._conflicts; }
  get mergedAt(): Date { return this._mergedAt; }
}

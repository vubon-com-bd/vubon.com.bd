/**
 * CartMergerEntity — child entity recording a merge operation
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo.js';
import { MergeStrategyVO } from '../value-objects/primitives/merge-strategy.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

export interface CartMergerEntityProps {
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly strategy: MergeStrategyVO;
  readonly itemsMerged: number;
  readonly conflicts: number;
  readonly mergedAt: string;
  readonly mergedBy?: string;
}

export class CartMergerEntity extends BaseEntity<string> {
  private readonly _sourceCartId: CartIdVO;
  private readonly _targetCartId: CartIdVO;
  private readonly _strategy: MergeStrategyVO;
  private readonly _itemsMerged: number;
  private readonly _conflicts: number;
  private readonly _mergedAt: string;
  private readonly _mergedBy?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartMergerEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sourceCartId = props.sourceCartId;
    this._targetCartId = props.targetCartId;
    this._strategy = props.strategy;
    this._itemsMerged = props.itemsMerged;
    this._conflicts = props.conflicts;
    this._mergedAt = props.mergedAt;
    this._mergedBy = props.mergedBy;

    if (props.sourceCartId.value === props.targetCartId.value) {
      throw new ValidationError(
        'Source and target carts must differ',
        'sourceCartId',
      );
    }
    if (this._itemsMerged < 0 || this._conflicts < 0) {
      throw new ValidationError('Merge counts cannot be negative', 'itemsMerged');
    }
  }

  get sourceCartId(): CartIdVO { return this._sourceCartId; }
  get targetCartId(): CartIdVO { return this._targetCartId; }
  get strategy(): MergeStrategyVO { return this._strategy; }
  get itemsMerged(): number { return this._itemsMerged; }
  get conflicts(): number { return this._conflicts; }
  get mergedAt(): string { return this._mergedAt; }
  get mergedBy(): string | undefined { return this._mergedBy; }
  get toIdVO(): CartMergerIdVO { return CartMergerIdVO.reconstitute(this.id); }

  hadConflicts(): boolean {
    return this._conflicts > 0;
  }

  successRatio(): number {
    if (this._itemsMerged === 0) return 1;
    return (this._itemsMerged - this._conflicts) / this._itemsMerged;
  }

  static create(params: {
    id: string;
    props: CartMergerEntityProps;
    now: string;
  }): CartMergerEntity {
    return new CartMergerEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartMergerEntityProps;
  }): CartMergerEntity {
    return new CartMergerEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}

/**
 * CartMergerEntity — Aggregate Root (independent)
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartMergerIdVO } from '../value-objects/primitives/cart-merger-id.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { MergeStrategyVO } from '../value-objects/primitives/merge-strategy.vo.js';

import {
  CartMergerStartedEvent,
  CartMergerCompletedEvent,
  CartMergerFailedEvent,
  CartMergerConflictResolvedEvent,
} from '../events/cart-merger.events.js';

export interface CartMergerEntityProps {
  readonly sourceCartId: CartIdVO;
  readonly targetCartId: CartIdVO;
  readonly strategy: MergeStrategyVO;
  readonly mergedAt: string;
}

export class CartMergerEntity extends AggregateRoot<string> {
  private _itemsMerged: number;
  private _conflicts: number;
  private _completed: boolean;
  private _failed: boolean;
  private _failureReason?: string;

  private readonly _sourceCartId: CartIdVO;
  private readonly _targetCartId: CartIdVO;
  private readonly _strategy: MergeStrategyVO;
  private readonly _mergedAt: string;

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
    this._mergedAt = props.mergedAt;
    this._itemsMerged = 0;
    this._conflicts = 0;
    this._completed = false;
    this._failed = false;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._sourceCartId.value === this._targetCartId.value) {
      throw new ValidationError(
        'source and target cart must differ',
        'targetCartId',
      );
    }
  }

  get sourceCartId(): CartIdVO { return this._sourceCartId; }
  get targetCartId(): CartIdVO { return this._targetCartId; }
  get strategy(): MergeStrategyVO { return this._strategy; }
  get mergedAt(): string { return this._mergedAt; }
  get itemsMerged(): number { return this._itemsMerged; }
  get conflicts(): number { return this._conflicts; }
  get failureReason(): string | undefined { return this._failureReason; }

  get toIdVO(): CartMergerIdVO {
    return CartMergerIdVO.reconstitute(this.id);
  }

  isCompleted(): boolean { return this._completed; }
  isFailed(): boolean { return this._failed; }
  hasConflicts(): boolean { return this._conflicts > 0; }

  // Business Actions
  recordConflict(now: string = new Date().toISOString()): void {
    if (this._completed || this._failed) {
      throw new BusinessRuleError(
        'Cannot record conflict on finished merger',
        'MERGER_ALREADY_FINISHED',
        { mergerId: this.id },
      );
    }
    this._conflicts += 1;
    this.touch(now);
  }

  resolveConflict(productId: string, now: string = new Date().toISOString()): void {
    if (this._conflicts <= 0) {
      throw new BusinessRuleError(
        'No conflicts to resolve',
        'NO_MERGE_CONFLICTS',
        { mergerId: this.id },
      );
    }
    this._conflicts -= 1;
    this.addDomainEvent(
      new CartMergerConflictResolvedEvent({
        aggregateId: this.id,
        payload: { mergerId: this.id, productId, resolution: 'auto' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
  }

  complete(
    itemsMerged: number,
    now: string = new Date().toISOString(),
  ): void {
    if (this._completed || this._failed) {
      throw new BusinessRuleError(
        'Merger already finished',
        'MERGER_ALREADY_FINISHED',
        { mergerId: this.id },
      );
    }
    if (!Number.isInteger(itemsMerged) || itemsMerged < 0) {
      throw new ValidationError('itemsMerged must be non-negative integer', 'itemsMerged');
    }
    this._itemsMerged = itemsMerged;
    this._completed = true;
    this.addDomainEvent(
      new CartMergerCompletedEvent({
        aggregateId: this.id,
        payload: {
          mergerId: this.id,
          itemsMerged,
          conflicts: this._conflicts,
          mergedAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    if (this._completed || this._failed) return;
    this._failed = true;
    this._failureReason = reason;
    this.addDomainEvent(
      new CartMergerFailedEvent({
        aggregateId: this.id,
        payload: { mergerId: this.id, reason, failedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: CartMergerIdVO;
    props: CartMergerEntityProps;
    now: string;
  }): CartMergerEntity {
    const entity = new CartMergerEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new CartMergerStartedEvent({
        aggregateId: params.id.value,
        payload: {
          mergerId: params.id.value,
          sourceCartId: params.props.sourceCartId.value,
          targetCartId: params.props.targetCartId.value,
          strategy: params.props.strategy.value,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: CartMergerEntityProps;
    itemsMerged?: number;
    conflicts?: number;
    completed?: boolean;
    failed?: boolean;
    failureReason?: string;
    version?: number;
  }): CartMergerEntity {
    const entity = new CartMergerEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    entity._itemsMerged = params.itemsMerged ?? 0;
    entity._conflicts = params.conflicts ?? 0;
    entity._completed = params.completed ?? false;
    entity._failed = params.failed ?? false;
    entity._failureReason = params.failureReason;
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

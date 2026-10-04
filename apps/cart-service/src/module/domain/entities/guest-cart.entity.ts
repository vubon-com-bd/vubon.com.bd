/**
 * GuestCartEntity — Aggregate Root
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { GUEST_CART_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../value-objects/primitives/guest-token.vo.js';
import {
  GuestCartCreatedEvent,
  GuestCartMergedEvent,
  GuestCartExpiredEvent,
} from '../events/guest-cart.events.js';

export interface GuestCartEntityProps {
  readonly token: GuestTokenVO;
  readonly status: GuestCartStatusVO;
  readonly itemCount: number;
  readonly expiresAt: string;
  readonly mergedIntoCartId?: string;
}

export class GuestCartEntity extends AggregateRoot<string> {
  private _status: GuestCartStatusVO;
  private _itemCount: number;
  private _mergedIntoCartId?: string;
  private readonly _token: GuestTokenVO;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: GuestCartEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._token = props.token;
    this._status = props.status;
    this._itemCount = props.itemCount;
    this._expiresAt = props.expiresAt;
    this._mergedIntoCartId = props.mergedIntoCartId;
    if (this._itemCount < 0) {
      throw new ValidationError('itemCount cannot be negative', 'itemCount');
    }
  }

  get token(): GuestTokenVO { return this._token; }
  get status(): GuestCartStatusVO { return this._status; }
  get itemCount(): number { return this._itemCount; }
  get expiresAt(): string { return this._expiresAt; }
  get mergedIntoCartId(): string | undefined { return this._mergedIntoCartId; }
  get toIdVO(): GuestCartIdVO { return GuestCartIdVO.reconstitute(this.id); }

  isExpired(now: Date = new Date()): boolean {
    return now.getTime() > Date.parse(this._expiresAt);
  }

  canBeMerged(): boolean {
    return this._status.canBeMerged() && !this.isExpired();
  }

  updateItemCount(count: number, now: string): void {
    if (count < 0) {
      throw new ValidationError('itemCount cannot be negative', 'itemCount');
    }
    this._itemCount = count;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  markMerged(targetCartId: string, userId: string, itemsMerged: number, now: string): void {
    if (!this.canBeMerged()) {
      throw new BusinessRuleError(
        `Guest cart "${this.id}" cannot be merged`,
        'GUEST_CART_NOT_MERGEABLE',
        { id: this.id, status: this._status.value },
      );
    }
    this._status = GuestCartStatusVO.create(GUEST_CART_STATUS.MERGED);
    this._mergedIntoCartId = targetCartId;
    this.addDomainEvent(
      new GuestCartMergedEvent({
        aggregateId: this.id,
        payload: {
          guestCartId: this.id,
          targetCartId,
          userId,
          itemsMerged,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  expire(now: string = new Date().toISOString()): void {
    if (this._status.isExpired()) return;
    this._status = GuestCartStatusVO.create(GUEST_CART_STATUS.EXPIRED);
    this.addDomainEvent(
      new GuestCartExpiredEvent({
        aggregateId: this.id,
        payload: {
          guestCartId: this.id,
          token: this._token.value,
          itemCount: this._itemCount,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: GuestCartEntityProps;
    now: string;
  }): GuestCartEntity {
    const entity = new GuestCartEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new GuestCartCreatedEvent({
        aggregateId: params.id,
        payload: {
          guestCartId: params.id,
          token: params.props.token.value,
          expiresAt: params.props.expiresAt,
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
    props: GuestCartEntityProps;
    version?: number;
  }): GuestCartEntity {
    const entity = new GuestCartEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

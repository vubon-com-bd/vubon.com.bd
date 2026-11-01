/**
 * GuestCartEntity — Aggregate Root (independent)
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { GuestCartIdVO } from '../value-objects/primitives/guest-cart-id.vo.js';
import { GuestCartStatusVO } from '../value-objects/primitives/guest-cart-status.vo.js';
import { GuestTokenVO } from '../value-objects/primitives/guest-token.vo.js';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';

import {
  GuestCartCreatedEvent,
  GuestCartExpiredEvent,
  GuestCartMergedEvent,
  GuestCartAbandonedEvent,
  GuestCartStatusChangedEvent,
} from '../events/guest-cart.events.js';

export interface GuestCartEntityProps {
  readonly token: GuestTokenVO;
  readonly cartId: CartIdVO;
  readonly itemCount: number;
  readonly expiresAt: string;
}

export class GuestCartEntity extends AggregateRoot<string> {
  private _status: GuestCartStatusVO;
  private _itemCount: number;

  private readonly _token: GuestTokenVO;
  private readonly _cartId: CartIdVO;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: GuestCartEntityProps,
    status: GuestCartStatusVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._token = props.token;
    this._cartId = props.cartId;
    this._itemCount = props.itemCount;
    this._expiresAt = props.expiresAt;
    this._status = status;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isInteger(this._itemCount) || this._itemCount < 0) {
      throw new ValidationError('itemCount must be non-negative integer', 'itemCount');
    }
  }

  get token(): GuestTokenVO { return this._token; }
  get cartId(): CartIdVO { return this._cartId; }
  get status(): GuestCartStatusVO { return this._status; }
  get itemCount(): number { return this._itemCount; }
  get expiresAt(): string { return this._expiresAt; }

  get toIdVO(): GuestCartIdVO {
    return GuestCartIdVO.reconstitute(this.id);
  }

  isActive(): boolean { return this._status.isActiveStatus(); }
  isExpiredStatus(): boolean { return this._status.isExpired(); }
  isMerged(): boolean { return this._status.isMerged(); }
  isAbandoned(): boolean { return this._status.isAbandoned(); }
  isFinal(): boolean { return this._status.isFinal(); }

  isExpiredAt(at: Date = new Date()): boolean {
    return new Date(this._expiresAt).getTime() <= at.getTime();
  }

  canMerge(): boolean {
    return this.isActive() && !this.isExpiredAt() && this._itemCount > 0;
  }

  // Business Actions
  updateItemCount(count: number, now: string = new Date().toISOString()): void {
    if (!Number.isInteger(count) || count < 0) {
      throw new ValidationError('itemCount must be non-negative integer', 'itemCount');
    }
    this._itemCount = count;
    this.touch(now);
  }

  expire(now: string = new Date().toISOString()): void {
    if (this.isFinal()) return;
    const from = this._status.value;
    this._status = GuestCartStatusVO.create('expired');
    this.addDomainEvent(
      new GuestCartExpiredEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, expiredAt: now },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new GuestCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, fromStatus: from, toStatus: 'expired' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markMerged(targetCartId: string, now: string = new Date().toISOString()): void {
    if (!this.canMerge()) {
      throw new BusinessRuleError(
        `Guest cart "${this.id}" cannot be merged (status: ${this._status.value}, itemCount: ${this._itemCount})`,
        'GUEST_CART_CANNOT_MERGE',
        { id: this.id, status: this._status.value, itemCount: this._itemCount },
      );
    }
    const from = this._status.value;
    this._status = GuestCartStatusVO.create('merged');
    this.addDomainEvent(
      new GuestCartMergedEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, targetCartId, mergedAt: now },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new GuestCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, fromStatus: from, toStatus: 'merged' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  abandon(now: string = new Date().toISOString()): void {
    if (!this.isActive()) return;
    const from = this._status.value;
    this._status = GuestCartStatusVO.create('abandoned');
    this.addDomainEvent(
      new GuestCartAbandonedEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, abandonedAt: now },
        version: this.version + 1,
      }),
    );
    this.addDomainEvent(
      new GuestCartStatusChangedEvent({
        aggregateId: this.id,
        payload: { guestCartId: this.id, fromStatus: from, toStatus: 'abandoned' },
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
    id: GuestCartIdVO;
    props: GuestCartEntityProps;
    now: string;
  }): GuestCartEntity {
    const entity = new GuestCartEntity(
      params.id.value,
      params.now,
      params.now,
      params.props,
      GuestCartStatusVO.active(),
    );
    entity.addDomainEvent(
      new GuestCartCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          guestCartId: params.id.value,
          token: params.props.token.value,
          createdAt: params.now,
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
    status: string;
    props: GuestCartEntityProps;
    version?: number;
  }): GuestCartEntity {
    const entity = new GuestCartEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      GuestCartStatusVO.reconstitute(params.status),
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

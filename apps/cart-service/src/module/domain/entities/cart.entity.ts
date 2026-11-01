/**
 * CartEntity — AGGREGATE ROOT
 * @module cart-service/domain/entities
 *
 * State machine:
 *   active → inactive → active
 *   active → abandoned → converted
 *   active → merged / cleared / expired
 *
 * Invariants:
 *   - itemCount >= 0
 *   - itemCount <= CART_LIMIT.MAX_ITEMS
 *   - currency must be non-empty
 *   - totals: subtotal - discount + tax + shipping = total
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '../value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { SessionIdVO } from '../value-objects/primitives/session-id.vo.js';
import { IdempotencyKeyVO } from '../value-objects/primitives/idempotency-key.vo.js';

import {
  CartCreatedEvent,
  CartActivatedEvent,
  CartAbandonedEvent,
  CartConvertedEvent,
  CartExpiredEvent,
  CartMergedEvent,
  CartClearedEvent,
  CartStatusChangedEvent,
  CartTotalsRecalculatedEvent,
} from '../events/cart.events.js';

const MAX_ITEMS = 100;

// ─── Props Interface ──────────────────────
export interface CartEntityProps {
  readonly type: CartTypeVO;
  readonly userId?: UserIdVO;
  readonly sessionId?: SessionIdVO;
  readonly currency: string;
  readonly itemCount: number;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly notes?: string;
  readonly expiresAt: string;
  readonly lastActivityAt: string;
  readonly idempotencyKey?: IdempotencyKeyVO;
}

// ─── Entity Class ─────────────────────────
export class CartEntity extends AggregateRoot<string> {
  // Mutable state
  private _status: CartStatusVO;
  private _itemCount: number;
  private _subtotal: number;
  private _discountAmount: number;
  private _taxAmount: number;
  private _shippingAmount: number;
  private _total: number;
  private _notes?: string;
  private _lastActivityAt: string;

  // Immutable refs
  private readonly _type: CartTypeVO;
  private readonly _userId?: UserIdVO;
  private readonly _sessionId?: SessionIdVO;
  private readonly _currency: string;
  private readonly _expiresAt: string;
  private readonly _idempotencyKey?: IdempotencyKeyVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartEntityProps,
    status: CartStatusVO,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);

    this._type = props.type;
    this._userId = props.userId;
    this._sessionId = props.sessionId;
    this._currency = props.currency;
    this._expiresAt = props.expiresAt;
    this._idempotencyKey = props.idempotencyKey;
    this._status = status;
    this._itemCount = props.itemCount;
    this._subtotal = props.subtotal;
    this._discountAmount = props.discountAmount;
    this._taxAmount = props.taxAmount;
    this._shippingAmount = props.shippingAmount;
    this._total = props.total;
    this._notes = props.notes;
    this._lastActivityAt = props.lastActivityAt;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (!Number.isInteger(this._itemCount) || this._itemCount < 0) {
      throw new ValidationError('itemCount must be a non-negative integer', 'itemCount');
    }
    if (this._itemCount > MAX_ITEMS) {
      throw new ValidationError(
        `itemCount exceeds maximum ${MAX_ITEMS}`,
        'itemCount',
      );
    }
    if (this._currency.trim().length === 0) {
      throw new ValidationError('currency cannot be empty', 'currency');
    }
    const amounts = [
      this._subtotal,
      this._discountAmount,
      this._taxAmount,
      this._shippingAmount,
      this._total,
    ];
    for (const a of amounts) {
      if (!Number.isFinite(a) || a < 0) {
        throw new ValidationError('amounts must be non-negative numbers', 'amount');
      }
    }
    const expected =
      Math.round(
        (this._subtotal - this._discountAmount + this._taxAmount + this._shippingAmount) *
          100,
      ) / 100;
    if (Math.abs(expected - this._total) > 0.01) {
      throw new ValidationError(
        `total mismatch: expected ${expected}, got ${this._total}`,
        'total',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get type(): CartTypeVO { return this._type; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get sessionId(): SessionIdVO | undefined { return this._sessionId; }
  get currency(): string { return this._currency; }
  get status(): CartStatusVO { return this._status; }
  get itemCount(): number { return this._itemCount; }
  get subtotal(): number { return this._subtotal; }
  get discountAmount(): number { return this._discountAmount; }
  get taxAmount(): number { return this._taxAmount; }
  get shippingAmount(): number { return this._shippingAmount; }
  get total(): number { return this._total; }
  get notes(): string | undefined { return this._notes; }
  get expiresAt(): string { return this._expiresAt; }
  get lastActivityAt(): string { return this._lastActivityAt; }

  get idempotencyKey(): IdempotencyKeyVO | undefined {
    return this._idempotencyKey;
  }

  get toIdVO(): CartIdVO {
    return CartIdVO.reconstitute(this.id);
  }

  // ═══════════════ Predicates ═══════════════
  isActive(): boolean { return this._status.isActiveStatus(); }
  isInactive(): boolean { return this._status.isInactive(); }
  isAbandoned(): boolean { return this._status.isAbandoned(); }
  isConverted(): boolean { return this._status.isConverted(); }
  isExpired(): boolean { return this._status.isExpired(); }
  isMerged(): boolean { return this._status.isMerged(); }
  isCleared(): boolean { return this._status.isCleared(); }
  isFinal(): boolean { return this._status.isFinal(); }

  isEmpty(): boolean { return this._itemCount === 0; }
  isGuest(): boolean { return this._type.isGuest(); }
  isUser(): boolean { return this._type.isUser(); }

  canBeModified(): boolean {
    return this._status.isModifiable() && !this.isExpiredAt(new Date());
  }

  canBeCheckedOut(): boolean {
    return this.isActive() && !this.isEmpty() && !this.isExpiredAt(new Date());
  }

  canBeAbandoned(): boolean {
    return this.isActive() && !this.isEmpty();
  }

  canBeMerged(): boolean {
    return this.isActive() && this.isGuest() && !this.isEmpty();
  }

  canBeCleared(): boolean {
    return !this.isCleared();
  }

  isExpiredAt(at: Date = new Date()): boolean {
    return new Date(this._expiresAt).getTime() <= at.getTime();
  }

  // ═══════════════ Business Actions ═══════════════
  activate(now: string = new Date().toISOString()): void {
    if (this.isActive()) return;
    this.assertTransitionTo('active');
    const from = this._status.value;
    this._status = CartStatusVO.active();
    this.emitStatusChange(from, 'active');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartActivatedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id },
        version: this.version,
      }),
    );
  }

  deactivate(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('inactive');
    const from = this._status.value;
    this._status = CartStatusVO.create('inactive');
    this.emitStatusChange(from, 'inactive');
    this.touch(now);
    this.incrementVersion();
  }

  abandon(now: string = new Date().toISOString()): void {
    if (!this.canBeAbandoned()) {
      throw new BusinessRuleError(
        `Cart cannot be abandoned in status "${this._status.value}" or empty`,
        'CART_CANNOT_BE_ABANDONED',
        { cartId: this.id, status: this._status.value, itemCount: this._itemCount },
      );
    }
    this.assertTransitionTo('abandoned');
    const from = this._status.value;
    this._status = CartStatusVO.abandoned();
    this.emitStatusChange(from, 'abandoned');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartAbandonedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, abandonedAt: now, itemCount: this._itemCount },
        version: this.version,
      }),
    );
  }

  convert(orderId: string, now: string = new Date().toISOString()): void {
    if (!this.isActive()) {
      throw new BusinessRuleError(
        `Only active carts can be converted (current: ${this._status.value})`,
        'CART_NOT_ACTIVE',
        { cartId: this.id, status: this._status.value },
      );
    }
    if (this.isEmpty()) {
      throw new BusinessRuleError('Cannot convert empty cart', 'CART_EMPTY', {
        cartId: this.id,
      });
    }
    this.assertTransitionTo('converted');
    const from = this._status.value;
    this._status = CartStatusVO.converted();
    this.emitStatusChange(from, 'converted');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartConvertedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, orderId, convertedAt: now },
        version: this.version,
      }),
    );
  }

  expire(now: string = new Date().toISOString()): void {
    if (this.isFinal()) return;
    this.assertTransitionTo('expired');
    const from = this._status.value;
    this._status = CartStatusVO.create('expired');
    this.emitStatusChange(from, 'expired');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartExpiredEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, expiredAt: now },
        version: this.version,
      }),
    );
  }

  markMerged(sourceCartId: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('merged');
    const from = this._status.value;
    this._status = CartStatusVO.create('merged');
    this.emitStatusChange(from, 'merged');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartMergedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, sourceCartId, targetCartId: this.id },
        version: this.version,
      }),
    );
  }

  clear(now: string = new Date().toISOString()): void {
    if (!this.canBeCleared()) return;
    const from = this._status.value;
    this._status = CartStatusVO.cleared();
    this._itemCount = 0;
    this._subtotal = 0;
    this._discountAmount = 0;
    this._taxAmount = 0;
    this._shippingAmount = 0;
    this._total = 0;
    this.emitStatusChange(from, 'cleared');
    this.touch(now);
    this.incrementVersion();
    this.addDomainEvent(
      new CartClearedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, clearedAt: now },
        version: this.version,
      }),
    );
  }

  /**
   * Update totals (called by domain service after calculation).
   */
  updateTotals(
    params: {
      subtotal: number;
      discount: number;
      tax: number;
      shipping: number;
    },
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeModified()) {
      throw new BusinessRuleError(
        `Cannot modify cart in status "${this._status.value}"`,
        'CART_CANNOT_BE_MODIFIED',
        { cartId: this.id, status: this._status.value },
      );
    }
    const subtotal = round2(params.subtotal);
    const discount = round2(params.discount);
    const tax = round2(params.tax);
    const shipping = round2(params.shipping);
    const total = round2(subtotal - discount + tax + shipping);

    if (total < 0) {
      throw new ValidationError('Computed total cannot be negative', 'total');
    }

    this._subtotal = subtotal;
    this._discountAmount = discount;
    this._taxAmount = tax;
    this._shippingAmount = shipping;
    this._total = total;
    this.assertInvariants();
    this.touch(now);
    this.incrementVersion();

    this.addDomainEvent(
      new CartTotalsRecalculatedEvent({
        aggregateId: this.id,
        payload: {
          cartId: this.id,
          subtotal,
          discount,
          tax,
          shipping,
          total,
          currency: this._currency,
        },
        version: this.version,
      }),
    );
  }

  /**
   * Internal setters — called by aggregate when items are added/removed.
   * These are meant to be invoked by sibling entities (or aggregate-internal handlers).
   */
  applyItemCountDelta(delta: number, now: string = new Date().toISOString()): void {
    const next = this._itemCount + delta;
    if (next < 0) {
      throw new ValidationError('itemCount cannot go below zero', 'itemCount');
    }
    if (next > MAX_ITEMS) {
      throw new BusinessRuleError(
        `Cart item limit exceeded: max ${MAX_ITEMS}, requested ${next}`,
        'CART_ITEM_LIMIT_EXCEEDED',
        { cartId: this.id, max: MAX_ITEMS, current: next },
      );
    }
    this._itemCount = next;
    this.touch(now);
  }

  updateNotes(notes: string, now: string = new Date().toISOString()): void {
    if (!this.canBeModified()) {
      throw new BusinessRuleError(
        `Cannot modify cart in status "${this._status.value}"`,
        'CART_CANNOT_BE_MODIFIED',
        { cartId: this.id, status: this._status.value },
      );
    }
    if (notes.length > 500) {
      throw new ValidationError('notes exceeds 500 chars', 'notes');
    }
    this._notes = notes;
    this.touch(now);
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid cart status transition: "${this._status.value}" → "${target}"`,
        'INVALID_CART_STATUS_TRANSITION',
        { cartId: this.id, from: this._status.value, to: target },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new CartStatusChangedEvent({
        aggregateId: this.id,
        payload: { cartId: this.id, fromStatus: from, toStatus: to, changedBy },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    this._lastActivityAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: CartIdVO;
    props: Omit<CartEntityProps, 'itemCount' | 'subtotal' | 'discountAmount' | 'taxAmount' | 'shippingAmount' | 'total' | 'lastActivityAt'>;
    now: string;
  }): CartEntity {
    const entity = new CartEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        itemCount: 0,
        subtotal: 0,
        discountAmount: 0,
        taxAmount: 0,
        shippingAmount: 0,
        total: 0,
        lastActivityAt: params.now,
      },
      CartStatusVO.active(),
    );

    entity.addDomainEvent(
      new CartCreatedEvent({
        aggregateId: params.id.value,
        payload: {
          cartId: params.id.value,
          type: params.props.type.value,
          currency: params.props.currency,
          createdAt: params.now,
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
    props: CartEntityProps;
    version?: number;
  }): CartEntity {
    const entity = new CartEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      CartStatusVO.reconstitute(params.status),
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

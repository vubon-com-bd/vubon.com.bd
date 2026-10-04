/**
 * CartVoucherEntity — Aggregate Root for an applied voucher
 * @module cart-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VOUCHER_STATUS } from '@vubon/shared-constants/business/cart';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../value-objects/primitives/voucher-status.vo.js';
import {
  VoucherAppliedEvent,
  VoucherRemovedEvent,
  VoucherRedeemedEvent,
} from '../events/voucher.events.js';

export interface CartVoucherEntityProps {
  readonly cartId: CartIdVO;
  readonly code: VoucherCodeVO;
  readonly status: VoucherStatusVO;
  readonly amount: number;
  readonly remainingAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
  readonly partialRedeemAllowed: boolean;
  readonly appliedAt: string;
}

export class CartVoucherEntity extends AggregateRoot<string> {
  private _status: VoucherStatusVO;
  private _remainingAmount: number;
  private readonly _cartId: CartIdVO;
  private readonly _code: VoucherCodeVO;
  private readonly _amount: number;
  private readonly _currency: string;
  private readonly _expiresAt: string;
  private readonly _partialRedeemAllowed: boolean;
  private readonly _appliedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartVoucherEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._cartId = props.cartId;
    this._code = props.code;
    this._status = props.status;
    this._amount = props.amount;
    this._remainingAmount = props.remainingAmount;
    this._currency = props.currency;
    this._expiresAt = props.expiresAt;
    this._partialRedeemAllowed = props.partialRedeemAllowed;
    this._appliedAt = props.appliedAt;
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): VoucherCodeVO { return this._code; }
  get status(): VoucherStatusVO { return this._status; }
  get amount(): number { return this._amount; }
  get remainingAmount(): number { return this._remainingAmount; }
  get currency(): string { return this._currency; }
  get expiresAt(): string { return this._expiresAt; }
  get partialRedeemAllowed(): boolean { return this._partialRedeemAllowed; }
  get appliedAt(): string { return this._appliedAt; }

  isUsable(now: Date = new Date()): boolean {
    return this._status.isUsable() && now.getTime() <= Date.parse(this._expiresAt);
  }

  /** Amount that can offset a given cart total */
  redeemableAgainst(cartTotal: number): number {
    if (cartTotal <= 0 || !this.isUsable()) return 0;
    if (!this._partialRedeemAllowed && cartTotal > this._remainingAmount) return 0;
    return Math.min(cartTotal, this._remainingAmount);
  }

  /** Redeem against an order. Must be called inside a transaction by app layer. */
  redeem(amount: number, orderId: string, now: string): number {
    if (!this.isUsable(new Date(now))) {
      throw new BusinessRuleError(
        `Voucher "${this._code.value}" is not redeemable`,
        'VOUCHER_NOT_REDEEMABLE',
        { code: this._code.value },
      );
    }
    if (amount <= 0) {
      throw new BusinessRuleError(
        'Redeem amount must be positive',
        'VOUCHER_INVALID_AMOUNT',
        { amount },
      );
    }
    if (amount > this._remainingAmount) {
      throw new BusinessRuleError(
        `Redeem amount ${amount} exceeds remaining ${this._remainingAmount}`,
        'VOUCHER_INSUFFICIENT_BALANCE',
        { amount, remaining: this._remainingAmount },
      );
    }
    if (!this._partialRedeemAllowed && amount < this._remainingAmount) {
      throw new BusinessRuleError(
        'Voucher requires full redemption',
        'VOUCHER_PARTIAL_NOT_ALLOWED',
        { amount, remaining: this._remainingAmount },
      );
    }
    this._remainingAmount = this.round(this._remainingAmount - amount);
    if (this._remainingAmount === 0) {
      this._status = VoucherStatusVO.create(VOUCHER_STATUS.REDEEMED);
    }
    this.addDomainEvent(
      new VoucherRedeemedEvent({
        aggregateId: this._cartId.value,
        payload: {
          cartId: this._cartId.value,
          code: this._code.value,
          redeemedAmount: amount,
          remainingAmount: this._remainingAmount,
          currency: this._currency,
        },
        version: this.version + 1,
        metadata: { correlationId: orderId },
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
    return amount;
  }

  remove(removedBy?: string, reason?: string, now: string = new Date().toISOString()): void {
    this.addDomainEvent(
      new VoucherRemovedEvent({
        aggregateId: this._cartId.value,
        payload: {
          cartId: this._cartId.value,
          code: this._code.value,
          removedBy,
          reason,
        },
        version: this.version + 1,
      }),
    );
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  private round(value: number): number {
    return Math.round(value * 100) / 100;
  }

  static create(params: {
    id: string;
    props: CartVoucherEntityProps;
    now: string;
    appliedBy?: string;
  }): CartVoucherEntity {
    const entity = new CartVoucherEntity(
      params.id,
      params.now,
      params.now,
      params.props,
    );
    entity.addDomainEvent(
      new VoucherAppliedEvent({
        aggregateId: params.props.cartId.value,
        payload: {
          cartId: params.props.cartId.value,
          code: params.props.code.value,
          amount: params.props.amount,
          currency: params.props.currency,
          appliedBy: params.appliedBy,
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
    props: CartVoucherEntityProps;
    version?: number;
  }): CartVoucherEntity {
    const entity = new CartVoucherEntity(
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

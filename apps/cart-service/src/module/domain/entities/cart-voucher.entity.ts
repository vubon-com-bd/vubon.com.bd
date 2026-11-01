/**
 * CartVoucherEntity — Child of Cart aggregate
 * @module cart-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { CartIdVO } from '../value-objects/primitives/cart-id.vo.js';
import { VoucherCodeVO } from '../value-objects/primitives/voucher-code.vo.js';
import { VoucherStatusVO } from '../value-objects/primitives/voucher-status.vo.js';

export interface CartVoucherEntityProps {
  readonly cartId: CartIdVO;
  readonly code: VoucherCodeVO;
  readonly status: VoucherStatusVO;
  readonly remainingAmount: number;
  readonly appliedAmount: number;
  readonly currency: string;
  readonly expiresAt: string;
}

export class CartVoucherEntity extends BaseEntity<string> {
  private _status: VoucherStatusVO;
  private _remainingAmount: number;
  private _appliedAmount: number;
  private _updatedAtInternal: string;

  private readonly _cartId: CartIdVO;
  private readonly _code: VoucherCodeVO;
  private readonly _currency: string;
  private readonly _expiresAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: CartVoucherEntityProps,
  ) {
    super(id, createdAt, updatedAt, null);

    this._cartId = props.cartId;
    this._code = props.code;
    this._status = props.status;
    this._remainingAmount = props.remainingAmount;
    this._appliedAmount = props.appliedAmount;
    this._currency = props.currency;
    this._expiresAt = props.expiresAt;
    this._updatedAtInternal = updatedAt;

    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._remainingAmount) || this._remainingAmount < 0) {
      throw new ValidationError(
        'remainingAmount must be non-negative',
        'remainingAmount',
      );
    }
    if (!Number.isFinite(this._appliedAmount) || this._appliedAmount < 0) {
      throw new ValidationError(
        'appliedAmount must be non-negative',
        'appliedAmount',
      );
    }
  }

  get cartId(): CartIdVO { return this._cartId; }
  get code(): VoucherCodeVO { return this._code; }
  get status(): VoucherStatusVO { return this._status; }
  get remainingAmount(): number { return this._remainingAmount; }
  get appliedAmount(): number { return this._appliedAmount; }
  get currency(): string { return this._currency; }
  get expiresAt(): string { return this._expiresAt; }
  get updatedAtInternal(): string { return this._updatedAtInternal; }

  isRedeemable(): boolean { return this._status.isRedeemable(); }
  isFinal(): boolean { return this._status.isFinal(); }
  hasBalance(): boolean { return this._remainingAmount > 0; }

  isExpired(at: Date = new Date()): boolean {
    return new Date(this._expiresAt).getTime() <= at.getTime();
  }

  canBeApplied(): boolean {
    return this.isRedeemable() && !this.isExpired() && this.hasBalance();
  }

  canCover(amount: number): boolean {
    return this._remainingAmount >= amount;
  }

  // Business Actions
  applyAmount(amount: number, now: string = new Date().toISOString()): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new ValidationError('applied amount must be positive', 'amount');
    }
    if (amount > this._remainingAmount) {
      throw new BusinessRuleError(
        `Voucher "${this._code.value}" insufficient balance: required ${amount}, available ${this._remainingAmount}`,
        'VOUCHER_INSUFFICIENT_BALANCE',
        { code: this._code.value, required: amount, available: this._remainingAmount },
      );
    }
    this._appliedAmount += amount;
    this._remainingAmount -= amount;
    this.touch(now);
  }

  redeem(now: string = new Date().toISOString()): void {
    if (!this.isRedeemable()) {
      throw new BusinessRuleError(
        `Voucher "${this._code.value}" is not redeemable (status: ${this._status.value})`,
        'VOUCHER_NOT_REDEEMABLE',
        { code: this._code.value, status: this._status.value },
      );
    }
    this._status = VoucherStatusVO.create('redeemed');
    this.touch(now);
  }

  private touch(now: string): void {
    this._updatedAtInternal = now;
  }

  static create(params: {
    id: string;
    props: CartVoucherEntityProps;
    now: string;
  }): CartVoucherEntity {
    return new CartVoucherEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: CartVoucherEntityProps;
  }): CartVoucherEntity {
    return new CartVoucherEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
    );
  }
}

/**
 * VendorPayoutEntity — a single payout request/transaction
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PayoutAmountVO } from '../value-objects/primitives/payout-amount.vo.js';
import { PayoutStatusVO } from '../value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../value-objects/primitives/payout-cycle.vo.js';
import { CommissionAmountVO } from '../value-objects/primitives/commission-amount.vo.js';

export interface VendorPayoutEntityProps {
  readonly vendorId: string;
  readonly payoutNumber: string;
  readonly status: PayoutStatusVO;
  readonly method: PayoutMethodVO;
  readonly cycle: PayoutCycleVO;
  readonly amount: PayoutAmountVO;
  readonly fee?: CommissionAmountVO;
  readonly netAmount: PayoutAmountVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly bankAccountId?: string;
  readonly transactionId?: string;
  readonly reference?: string;
  readonly notes?: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly approvedBy?: string;
  readonly paidAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
}

export class VendorPayoutEntity extends AggregateRoot<string> {
  private _status: PayoutStatusVO;
  private _approvedAt?: string;
  private _approvedBy?: string;
  private _paidAt?: string;
  private _failedAt?: string;
  private _failureReason?: string;
  private _transactionId?: string;
  private _reference?: string;
  private _notes?: string;

  private readonly _vendorId: string;
  private readonly _payoutNumber: string;
  private readonly _method: PayoutMethodVO;
  private readonly _cycle: PayoutCycleVO;
  private readonly _amount: PayoutAmountVO;
  private readonly _fee: CommissionAmountVO;
  private readonly _netAmount: PayoutAmountVO;
  private readonly _periodStart: string;
  private readonly _periodEnd: string;
  private readonly _bankAccountId?: string;
  private readonly _requestedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorPayoutEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._payoutNumber = props.payoutNumber;
    this._status = props.status;
    this._method = props.method;
    this._cycle = props.cycle;
    this._amount = props.amount;
    this._fee = props.fee ?? CommissionAmountVO.zero(props.amount.currency);
    this._netAmount = props.netAmount;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._bankAccountId = props.bankAccountId;
    this._transactionId = props.transactionId;
    this._reference = props.reference;
    this._notes = props.notes;
    this._requestedAt = props.requestedAt;
    this._approvedAt = props.approvedAt;
    this._approvedBy = props.approvedBy;
    this._paidAt = props.paidAt;
    this._failedAt = props.failedAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._payoutNumber || this._payoutNumber.length > 50) {
      throw new ValidationError('Payout number must be 1-50 chars', 'payoutNumber');
    }
    if (this._netAmount.currency !== this._amount.currency) {
      throw new ValidationError('Net amount currency must match amount currency', 'netAmount');
    }
    if (this._netAmount.amount > this._amount.amount) {
      throw new ValidationError('Net amount cannot exceed gross amount', 'netAmount');
    }
    if (Date.parse(this._periodEnd) < Date.parse(this._periodStart)) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    if (this._method.requiresBankAccount() && !this._bankAccountId) {
      throw new ValidationError(
        `Payout method "${this._method.value}" requires a bank account`,
        'bankAccountId',
      );
    }
  }

  get vendorId(): string { return this._vendorId; }
  get payoutNumber(): string { return this._payoutNumber; }
  get status(): PayoutStatusVO { return this._status; }
  get method(): PayoutMethodVO { return this._method; }
  get cycle(): PayoutCycleVO { return this._cycle; }
  get amount(): PayoutAmountVO { return this._amount; }
  get netAmount(): PayoutAmountVO { return this._netAmount; }
  get fee(): CommissionAmountVO { return this._fee; }
  get requestedAt(): string { return this._requestedAt; }
  get paidAt(): string | undefined { return this._paidAt; }

  get periodStart(): string { return this._periodStart; }
  get periodEnd(): string { return this._periodEnd; }
  get bankAccountId(): string | undefined { return this._bankAccountId; }
  get transactionId(): string | undefined { return this._transactionId; }
  get reference(): string | undefined { return this._reference; }
  get notes(): string | undefined { return this._notes; }
  get approvedAt(): string | undefined { return this._approvedAt; }
  get failedAt(): string | undefined { return this._failedAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  isPending(): boolean { return this._status.isPending(); }
  isPaid(): boolean { return this._status.isPaid(); }
  isFinal(): boolean { return this._status.isFinal(); }

  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('approved');
    this._status = PayoutStatusVO.approved();
    this._approvedAt = now;
    this._approvedBy = approvedBy;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    this._status = PayoutStatusVO.processing();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markPaid(transactionId: string, reference?: string, now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('paid')) {
      throw new BusinessRuleError(
        `Cannot mark paid from status "${this._status.value}"`,
        'PAYOUT_CANNOT_BE_PAID',
        { payoutId: this.id, status: this._status.value },
      );
    }
    if (!transactionId || transactionId.trim().length === 0) {
      throw new ValidationError('Transaction ID is required', 'transactionId');
    }
    this._status = PayoutStatusVO.paid();
    this._paidAt = now;
    this._transactionId = transactionId;
    this._reference = reference;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    if (!reason || reason.trim().length === 0) {
      throw new ValidationError('Failure reason is required', 'failureReason');
    }
    this._status = PayoutStatusVO.failed();
    this._failedAt = now;
    this._failureReason = reason.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    this._status = PayoutStatusVO.rejected();
    this._failureReason = reason.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  cancel(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    this._status = PayoutStatusVO.cancelled();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  hold(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_hold');
    this._status = PayoutStatusVO.onHold();
    this._notes = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid payout transition: "${this._status.value}" → "${target}"`,
        'INVALID_PAYOUT_TRANSITION',
        { from: this._status.value, to: target },
      );
    }
  }

  static create(params: {
    id: string;
    props: Omit<VendorPayoutEntityProps, 'status' | 'requestedAt'>;
    now: string;
  }): VendorPayoutEntity {
    return new VendorPayoutEntity(params.id, params.now, params.now, {
      ...params.props,
      status: PayoutStatusVO.pending(),
      requestedAt: params.now,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorPayoutEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorPayoutEntity {
    const entity = new VendorPayoutEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

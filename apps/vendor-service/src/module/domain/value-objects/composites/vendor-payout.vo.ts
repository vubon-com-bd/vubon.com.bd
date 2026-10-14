/**
 * VendorPayoutVO — Composite Value Object
 * @module vendor-service/domain/value-objects/composites
 *
 * Vendor এর একটি payout request / record।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_PAYOUT, VENDOR_PAYOUT_METHOD } from '@vubon/shared-constants/business';

import { PayoutIdVO } from '../primitives/payout-id.vo.js';
import { VendorIdVO } from '../primitives/vendor-id.vo.js';
import { BankAccountIdVO } from '../primitives/bank-account-id.vo.js';
import { PayoutAmountVO } from '../primitives/payout-amount.vo.js';
import { PayoutStatusVO } from '../primitives/payout-status.vo.js';

export type PayoutMethodValue =
  (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];

const VALID_METHODS = new Set<string>(Object.values(VENDOR_PAYOUT_METHOD));

export interface VendorPayoutVOProps {
  readonly id: PayoutIdVO;
  readonly vendorId: VendorIdVO;
  readonly bankAccountId: BankAccountIdVO;
  readonly amount: PayoutAmountVO;
  readonly fee: number;
  readonly netAmount: number;
  readonly currency: string;
  readonly method: PayoutMethodValue;
  readonly status: PayoutStatusVO;
  readonly requestedAt: string;
  readonly processedAt?: string;
  readonly paidAt?: string;
  readonly completedBy?: string;
  readonly transactionId?: string;
  readonly rejectionReason?: string;
  readonly failureReason?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class VendorPayoutVO extends BaseVO<VendorPayoutVOProps> {
  private constructor(props: VendorPayoutVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: VendorPayoutVOProps): VendorPayoutVO {
    const vo = new VendorPayoutVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: VendorPayoutVOProps): VendorPayoutVO {
    return new VendorPayoutVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!VALID_METHODS.has(v.method)) {
      throw new ValidationError(`Invalid payout method: "${v.method}"`, 'method');
    }

    if (!Number.isFinite(v.fee) || v.fee < 0) {
      throw new ValidationError('fee must be a non-negative number', 'fee');
    }
    if (!Number.isFinite(v.netAmount) || v.netAmount < 0) {
      throw new ValidationError('netAmount must be a non-negative number', 'netAmount');
    }
    if (Math.abs(v.amount.amount - (v.netAmount + v.fee)) > 0.01) {
      throw new ValidationError(
        'Amount must equal netAmount + fee',
        'netAmount',
      );
    }

    if (!v.currency || v.currency.length !== 3) {
      throw new ValidationError('currency must be a 3-char ISO code', 'currency');
    }

    if (v.status.isPaid() && !v.paidAt) {
      throw new ValidationError('Paid payout must have paidAt', 'paidAt');
    }
    if (v.status.isRejected() && !v.rejectionReason) {
      throw new ValidationError('Rejected payout must have rejectionReason', 'rejectionReason');
    }
    if (v.status.isFailed() && !v.failureReason) {
      throw new ValidationError('Failed payout must have failureReason', 'failureReason');
    }

    if (v.notes && v.notes.length > 500) {
      throw new ValidationError('notes max 500 chars', 'notes');
    }
  }

  // ─── Getters ───
  get id(): PayoutIdVO { return this.value.id; }
  get vendorId(): VendorIdVO { return this.value.vendorId; }
  get bankAccountId(): BankAccountIdVO { return this.value.bankAccountId; }
  get amount(): PayoutAmountVO { return this.value.amount; }
  get fee(): number { return this.value.fee; }
  get netAmount(): number { return this.value.netAmount; }
  get currency(): string { return this.value.currency; }
  get method(): PayoutMethodValue { return this.value.method; }
  get status(): PayoutStatusVO { return this.value.status; }
  get requestedAt(): string { return this.value.requestedAt; }
  get processedAt(): string | undefined { return this.value.processedAt; }
  get paidAt(): string | undefined { return this.value.paidAt; }
  get completedBy(): string | undefined { return this.value.completedBy; }
  get transactionId(): string | undefined { return this.value.transactionId; }
  get rejectionReason(): string | undefined { return this.value.rejectionReason; }
  get failureReason(): string | undefined { return this.value.failureReason; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ─── Predicates ───
  isPending(): boolean { return this.status.isPending(); }
  isProcessing(): boolean { return this.status.isProcessing(); }
  isApproved(): boolean { return this.status.isApproved(); }
  isPaid(): boolean { return this.status.isPaid(); }
  isFailed(): boolean { return this.status.isFailed(); }
  isRejected(): boolean { return this.status.isRejected(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isOnHold(): boolean { return this.status.isOnHold(); }

  isFinal(): boolean { return this.status.isFinal(); }
  isSuccessful(): boolean { return this.status.isSuccessful(); }
  isUnsuccessful(): boolean { return this.status.isUnsuccessful(); }
  isInProgress(): boolean { return this.status.isInProgress(); }

  hasFee(): boolean { return this.fee > 0; }
  hasTransactionId(): boolean { return this.transactionId !== undefined; }
  hasNotes(): boolean { return this.notes !== undefined; }

  /** Total processing time in hours (from request to paid) */
  get processingHours(): number | null {
    if (!this.paidAt) return null;
    const diff = new Date(this.paidAt).getTime() - new Date(this.requestedAt).getTime();
    return Math.round(diff / (1000 * 60 * 60));
  }

  /** Days since request */
  get ageInDays(): number {
    const diff = Date.now() - new Date(this.requestedAt).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  /** Fee as percentage of gross */
  get feePercent(): number {
    if (this.amount.amount === 0) return 0;
    return Math.round((this.fee / this.amount.amount) * 10000) / 100;
  }

  /** Exceeded processing SLA */
  isOverdue(): boolean {
    if (!this.isPending() && !this.isProcessing()) return false;
    return this.ageInDays > VENDOR_PAYOUT.PROCESSING_DAYS;
  }

  /** Can be cancelled by vendor */
  canBeCancelled(): boolean {
    return this.isPending() || this.isOnHold();
  }

  /** Meets minimum for processing */
  meetsMinimum(): boolean {
    return this.amount.amount >= VENDOR_PAYOUT.MIN_AMOUNT;
  }
}

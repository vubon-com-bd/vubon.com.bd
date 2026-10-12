/**
 * VendorSettlementEntity — settlement cycle record
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { VENDOR_SETTLEMENT_STATUS } from '@vubon/shared-constants/business';
import { SettlementAmountVO } from '../value-objects/primitives/settlement-amount.vo.js';
import { CommissionAmountVO } from '../value-objects/primitives/commission-amount.vo.js';

export type SettlementStatus = (typeof VENDOR_SETTLEMENT_STATUS)[keyof typeof VENDOR_SETTLEMENT_STATUS];
const ALLOWED_STATUS = Object.values(VENDOR_SETTLEMENT_STATUS) as readonly string[];

export interface VendorSettlementEntityProps {
  readonly vendorId: string;
  readonly settlementNumber: string;
  readonly status: SettlementStatus;
  readonly grossAmount: SettlementAmountVO;
  readonly commissionAmount: CommissionAmountVO;
  readonly netAmount: SettlementAmountVO;
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly orderCount: number;
  readonly payoutId?: string;
  readonly processedAt?: string;
  readonly notes?: string;
}

export class VendorSettlementEntity extends AggregateRoot<string> {
  private _status: SettlementStatus;
  private _payoutId?: string;
  private _processedAt?: string;
  private _notes?: string;

  private readonly _vendorId: string;
  private readonly _settlementNumber: string;
  private readonly _grossAmount: SettlementAmountVO;
  private readonly _commissionAmount: CommissionAmountVO;
  private readonly _netAmount: SettlementAmountVO;
  private readonly _periodStart: string;
  private readonly _periodEnd: string;
  private readonly _orderCount: number;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorSettlementEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._settlementNumber = props.settlementNumber;
    this._status = props.status;
    this._grossAmount = props.grossAmount;
    this._commissionAmount = props.commissionAmount;
    this._netAmount = props.netAmount;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._orderCount = props.orderCount;
    this._payoutId = props.payoutId;
    this._processedAt = props.processedAt;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._settlementNumber || this._settlementNumber.length > 50) {
      throw new ValidationError('Settlement number must be 1-50 chars', 'settlementNumber');
    }
    if (!Number.isInteger(this._orderCount) || this._orderCount < 0) {
      throw new ValidationError('Order count must be a non-negative integer', 'orderCount');
    }
    if (Date.parse(this._periodEnd) < Date.parse(this._periodStart)) {
      throw new ValidationError('periodEnd must be after periodStart', 'periodEnd');
    }
    const expectedNet = Math.round((this._grossAmount.amount - this._commissionAmount.amount) * 100) / 100;
    if (Math.abs(expectedNet - this._netAmount.amount) > 0.01) {
      throw new ValidationError(
        `Net amount (${this._netAmount.amount}) must equal gross (${this._grossAmount.amount}) - commission (${this._commissionAmount.amount})`,
        'netAmount',
      );
    }
  }

  get vendorId(): string { return this._vendorId; }
  get settlementNumber(): string { return this._settlementNumber; }
  get status(): SettlementStatus { return this._status; }
  get grossAmount(): SettlementAmountVO { return this._grossAmount; }
  get commissionAmount(): CommissionAmountVO { return this._commissionAmount; }
  get netAmount(): SettlementAmountVO { return this._netAmount; }
  get periodStart(): string { return this._periodStart; }
  get periodEnd(): string { return this._periodEnd; }
  get orderCount(): number { return this._orderCount; }

  get payoutId(): string | undefined { return this._payoutId; }
  get processedAt(): string | undefined { return this._processedAt; }
  get notes(): string | undefined { return this._notes; }

  isPending(): boolean { return this._status === VENDOR_SETTLEMENT_STATUS.PENDING; }
  isCompleted(): boolean { return this._status === VENDOR_SETTLEMENT_STATUS.COMPLETED; }
  isFinal(): boolean {
    return [VENDOR_SETTLEMENT_STATUS.COMPLETED, VENDOR_SETTLEMENT_STATUS.FAILED, VENDOR_SETTLEMENT_STATUS.CANCELLED].includes(this._status as never);
  }

  startProcessing(now: string = new Date().toISOString()): void {
    if (this._status !== VENDOR_SETTLEMENT_STATUS.PENDING) {
      throw new BusinessRuleError(
        `Cannot start processing from status "${this._status}"`,
        'SETTLEMENT_NOT_PROCESSABLE',
        { settlementId: this.id, status: this._status },
      );
    }
    this._status = VENDOR_SETTLEMENT_STATUS.PROCESSING;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  complete(payoutId: string, now: string = new Date().toISOString()): void {
    if (this._status !== VENDOR_SETTLEMENT_STATUS.PROCESSING) {
      throw new BusinessRuleError(
        `Cannot complete from status "${this._status}"`,
        'SETTLEMENT_NOT_COMPLETABLE',
        { settlementId: this.id, status: this._status },
      );
    }
    if (!payoutId || payoutId.trim().length === 0) {
      throw new ValidationError('Payout ID is required', 'payoutId');
    }
    this._status = VENDOR_SETTLEMENT_STATUS.COMPLETED;
    this._payoutId = payoutId;
    this._processedAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot fail a final settlement (status: ${this._status})`,
        'SETTLEMENT_ALREADY_FINAL',
        { settlementId: this.id, status: this._status },
      );
    }
    this._status = VENDOR_SETTLEMENT_STATUS.FAILED;
    this._notes = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  hold(reason: string, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot hold a final settlement`,
        'SETTLEMENT_ALREADY_FINAL',
        { settlementId: this.id, status: this._status },
      );
    }
    this._status = VENDOR_SETTLEMENT_STATUS.ON_HOLD;
    this._notes = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  cancel(now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        'Cannot cancel a final settlement',
        'SETTLEMENT_ALREADY_FINAL',
        { settlementId: this.id, status: this._status },
      );
    }
    this._status = VENDOR_SETTLEMENT_STATUS.CANCELLED;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  static create(params: {
    id: string;
    props: Omit<VendorSettlementEntityProps, 'status'>;
    now: string;
  }): VendorSettlementEntity {
    return new VendorSettlementEntity(params.id, params.now, params.now, {
      ...params.props,
      status: VENDOR_SETTLEMENT_STATUS.PENDING,
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorSettlementEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorSettlementEntity {
    const entity = new VendorSettlementEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

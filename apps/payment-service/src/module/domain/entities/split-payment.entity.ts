/**
 * SplitPaymentEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';

export interface SplitReceiverData {
  readonly receiverId: string;
  readonly amount: SplitAmountVO;
  readonly percentage?: SplitPercentageVO;
}

export interface SplitPaymentEntityProps {
  readonly paymentId: PaymentIdVO;
  readonly type: SplitTypeVO;
  readonly receivers: readonly SplitReceiverData[];
  readonly totalAmount: number;
  readonly currency: string;
  readonly executedAt?: string;
  readonly failureReason?: string;
}

export class SplitPaymentEntity extends BaseEntity<string> {
  private _executedAt?: string;
  private _failureReason?: string;

  private readonly _paymentId: PaymentIdVO;
  private readonly _type: SplitTypeVO;
  private readonly _receivers: readonly SplitReceiverData[];
  private readonly _totalAmount: number;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: SplitPaymentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._paymentId = props.paymentId;
    this._type = props.type;
    this._receivers = Object.freeze([...props.receivers]);
    this._totalAmount = props.totalAmount;
    this._currency = props.currency;
    this._executedAt = props.executedAt;
    this._failureReason = props.failureReason;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._receivers.length < 2) {
      throw new ValidationError('SplitPayment requires at least 2 receivers', 'receivers');
    }
    const sum = this._receivers.reduce((s, r) => s + r.amount.amount, 0);
    if (Math.abs(sum - this._totalAmount) > 0.01) {
      throw new ValidationError(
        `SplitPayment sum (${sum}) != total (${this._totalAmount})`,
        'totalAmount',
      );
    }
    if (this._type.isPercentage()) {
      const pctSum = this._receivers.reduce(
        (s, r) => s + (r.percentage?.value ?? 0),
        0,
      );
      if (Math.abs(pctSum - 100) > 0.01) {
        throw new ValidationError(
          `Split percentages must total 100 (got ${pctSum})`,
          'percentage',
        );
      }
    }
  }

  get paymentId(): PaymentIdVO { return this._paymentId; }
  get type(): SplitTypeVO { return this._type; }
  get receivers(): readonly SplitReceiverData[] { return this._receivers; }
  get totalAmount(): number { return this._totalAmount; }
  get currency(): string { return this._currency; }
  get executedAt(): string | undefined { return this._executedAt; }
  get failureReason(): string | undefined { return this._failureReason; }

  isExecuted(): boolean { return this._executedAt !== undefined && !this._failureReason; }
  hasFailed(): boolean { return this._failureReason !== undefined; }
  receiverCount(): number { return this._receivers.length; }

  execute(now: string = new Date().toISOString()): void {
    if (this._executedAt || this._failureReason) {
      throw new BusinessRuleError(
        'SplitPayment already finalized',
        'SPLIT_ALREADY_FINALIZED',
        { splitId: this.id },
      );
    }
    this._executedAt = now;
    this.touch(now);
  }

  fail(reason: string, now: string = new Date().toISOString()): void {
    if (this._executedAt) {
      throw new BusinessRuleError(
        'SplitPayment already executed',
        'SPLIT_ALREADY_EXECUTED',
        { splitId: this.id },
      );
    }
    this._failureReason = reason;
    this.touch(now);
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: SplitIdVO;
    props: SplitPaymentEntityProps;
    now: string;
  }): SplitPaymentEntity {
    return new SplitPaymentEntity(params.id.value, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: SplitPaymentEntityProps;
  }): SplitPaymentEntity {
    return new SplitPaymentEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}

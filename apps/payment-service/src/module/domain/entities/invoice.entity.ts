/**
 * InvoiceEntity
 * @module payment-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';

export interface InvoiceEntityProps {
  readonly invoiceNumber: InvoiceNumberVO;
  readonly status: InvoiceStatusVO;
  readonly amount: InvoiceAmountVO;
  readonly userId: UserIdVO;
  readonly orderId?: OrderIdVO;
  readonly issuedAt?: string;
  readonly dueAt?: string;
  readonly paidAt?: string;
  readonly voidedAt?: string;
  readonly refundedAt?: string;
  readonly notes?: string;
}

export class InvoiceEntity extends BaseEntity<string> {
  private _status: InvoiceStatusVO;
  private _issuedAt?: string;
  private _paidAt?: string;
  private _voidedAt?: string;
  private _refundedAt?: string;

  private readonly _invoiceNumber: InvoiceNumberVO;
  private readonly _amount: InvoiceAmountVO;
  private readonly _userId: UserIdVO;
  private readonly _orderId?: OrderIdVO;
  private readonly _dueAt?: string;
  private readonly _notes?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: InvoiceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._invoiceNumber = props.invoiceNumber;
    this._status = props.status;
    this._amount = props.amount;
    this._userId = props.userId;
    this._orderId = props.orderId;
    this._issuedAt = props.issuedAt;
    this._dueAt = props.dueAt;
    this._paidAt = props.paidAt;
    this._voidedAt = props.voidedAt;
    this._refundedAt = props.refundedAt;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._status.isIssued() && !this._issuedAt) {
      throw new ValidationError('Issued invoice requires issuedAt', 'issuedAt');
    }
    if (this._status.isPaid() && !this._paidAt) {
      throw new ValidationError('Paid invoice requires paidAt', 'paidAt');
    }
    if (
      this._dueAt &&
      this._issuedAt &&
      new Date(this._dueAt).getTime() < new Date(this._issuedAt).getTime()
    ) {
      throw new ValidationError('dueAt must be after issuedAt', 'dueAt');
    }
  }

  get invoiceNumber(): InvoiceNumberVO { return this._invoiceNumber; }
  get status(): InvoiceStatusVO { return this._status; }
  get amount(): InvoiceAmountVO { return this._amount; }
  get userId(): UserIdVO { return this._userId; }
  get orderId(): OrderIdVO | undefined { return this._orderId; }
  get issuedAt(): string | undefined { return this._issuedAt; }
  get dueAt(): string | undefined { return this._dueAt; }
  get paidAt(): string | undefined { return this._paidAt; }
  get voidedAt(): string | undefined { return this._voidedAt; }
  get refundedAt(): string | undefined { return this._refundedAt; }
  get notes(): string | undefined { return this._notes; }

  isPaid(): boolean { return this._status.isPaid(); }
  isOverdue(): boolean { return this._status.isOverdue(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isPayable(): boolean { return this._status.isPayable(); }

  issue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('issued');
    this._status = InvoiceStatusVO.issued();
    this._issuedAt = now;
    this.touch(now);
  }

  markPaid(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('paid');
    this._status = InvoiceStatusVO.paid();
    this._paidAt = now;
    this.touch(now);
  }

  markOverdue(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('overdue');
    this._status = InvoiceStatusVO.overdue();
    this.touch(now);
  }

  void(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('void');
    this._status = InvoiceStatusVO.void();
    this._voidedAt = now;
    this.touch(now);
  }

  refund(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('refunded');
    this._status = InvoiceStatusVO.refunded();
    this._refundedAt = now;
    this.touch(now);
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid invoice transition: "${this._status.value}" → "${target}"`,
        'INVALID_INVOICE_STATUS_TRANSITION',
        { from: this._status.value, to: target, invoiceId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: InvoiceIdVO;
    props: Omit<InvoiceEntityProps, 'status'>;
    now: string;
  }): InvoiceEntity {
    return new InvoiceEntity(params.id.value, params.now, params.now, {
      ...params.props,
      status: InvoiceStatusVO.draft(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: InvoiceEntityProps;
  }): InvoiceEntity {
    return new InvoiceEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
    );
  }
}

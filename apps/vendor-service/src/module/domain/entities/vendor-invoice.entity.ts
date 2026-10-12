/**
 * VendorInvoiceEntity — invoice for commission/subscription/penalty
 * @module vendor-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { InvoiceNumberVO } from '../value-objects/primitives/invoice-number.vo.js';
import { InvoiceStatusVO } from '../value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../value-objects/primitives/invoice-type.vo.js';

export interface VendorInvoiceEntityProps {
  readonly vendorId: string;
  readonly invoiceNumber: InvoiceNumberVO;
  readonly type: InvoiceTypeVO;
  readonly status: InvoiceStatusVO;
  readonly amount: number;
  readonly taxAmount?: number;
  readonly totalAmount: number;
  readonly currency: string;
  readonly issueDate: string;
  readonly dueDate: string;
  readonly paidAt?: string;
  readonly periodStart?: string;
  readonly periodEnd?: string;
  readonly orderIds?: readonly string[];
  readonly notes?: string;
  readonly pdfUrl?: string;
}

export class VendorInvoiceEntity extends AggregateRoot<string> {
  private _status: InvoiceStatusVO;
  private _paidAt?: string;
  private _notes?: string;
  private _pdfUrl?: string;

  private readonly _vendorId: string;
  private readonly _invoiceNumber: InvoiceNumberVO;
  private readonly _type: InvoiceTypeVO;
  private readonly _amount: number;
  private readonly _taxAmount: number;
  private readonly _totalAmount: number;
  private readonly _currency: string;
  private readonly _issueDate: string;
  private readonly _dueDate: string;
  private readonly _periodStart?: string;
  private readonly _periodEnd?: string;
  private readonly _orderIds: readonly string[];

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorInvoiceEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vendorId = props.vendorId;
    this._invoiceNumber = props.invoiceNumber;
    this._type = props.type;
    this._status = props.status;
    this._amount = props.amount;
    this._taxAmount = props.taxAmount ?? 0;
    this._totalAmount = props.totalAmount;
    this._currency = props.currency;
    this._issueDate = props.issueDate;
    this._dueDate = props.dueDate;
    this._paidAt = props.paidAt;
    this._periodStart = props.periodStart;
    this._periodEnd = props.periodEnd;
    this._orderIds = props.orderIds ?? [];
    this._notes = props.notes;
    this._pdfUrl = props.pdfUrl;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!Number.isFinite(this._amount) || this._amount < 0) {
      throw new ValidationError('Invoice amount must be non-negative', 'amount');
    }
    if (this._totalAmount < this._amount) {
      throw new ValidationError('Total amount cannot be less than amount', 'totalAmount');
    }
    if (this._currency.length !== 3) {
      throw new ValidationError('Currency must be a 3-char ISO code', 'currency');
    }
    if (Date.parse(this._dueDate) < Date.parse(this._issueDate)) {
      throw new ValidationError('Due date must be after issue date', 'dueDate');
    }
    if (this._orderIds.length > 1000) {
      throw new ValidationError('Order IDs cannot exceed 1000 items', 'orderIds');
    }
  }

  get vendorId(): string { return this._vendorId; }
  get invoiceNumber(): InvoiceNumberVO { return this._invoiceNumber; }
  get type(): InvoiceTypeVO { return this._type; }
  get status(): InvoiceStatusVO { return this._status; }
  get amount(): number { return this._amount; }

  get taxAmount(): number { return this._taxAmount; }
  get periodStart(): string | undefined { return this._periodStart; }
  get periodEnd(): string | undefined { return this._periodEnd; }
  get orderIds(): readonly string[] { return this._orderIds; }
  get notes(): string | undefined { return this._notes; }
  get pdfUrl(): string | undefined { return this._pdfUrl; }
  get totalAmount(): number { return this._totalAmount; }
  get currency(): string { return this._currency; }
  get issueDate(): string { return this._issueDate; }
  get dueDate(): string { return this._dueDate; }
  get paidAt(): string | undefined { return this._paidAt; }

  isOverdue(at: Date = new Date()): boolean {
    if (this._status.isFinal()) return false;
    return at.getTime() > Date.parse(this._dueDate);
  }

  daysUntilDue(at: Date = new Date()): number {
    const diff = Date.parse(this._dueDate) - at.getTime();
    return diff <= 0 ? 0 : Math.ceil(diff / (24 * 60 * 60 * 1000));
  }

  daysOverdue(at: Date = new Date()): number {
    if (!this.isOverdue(at)) return 0;
    const diff = at.getTime() - Date.parse(this._dueDate);
    return Math.floor(diff / (24 * 60 * 60 * 1000));
  }

  send(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('sent');
    this._status = InvoiceStatusVO.sent();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markViewed(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('viewed');
    this._status = InvoiceStatusVO.viewed();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markPaid(now: string = new Date().toISOString()): void {
    if (!this._status.canTransitionTo('paid')) {
      throw new BusinessRuleError(
        `Cannot mark paid from status "${this._status.value}"`,
        'INVOICE_CANNOT_BE_PAID',
        { invoiceId: this.id, status: this._status.value },
      );
    }
    this._status = InvoiceStatusVO.paid();
    this._paidAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  markOverdue(now: string = new Date().toISOString()): void {
    if (!this.isOverdue(new Date(now))) return;
    if (!this._status.canTransitionTo('overdue')) return;
    this._status = InvoiceStatusVO.overdue();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('cancelled');
    this._status = InvoiceStatusVO.cancelled();
    if (reason) this._notes = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  refund(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('refunded');
    this._status = InvoiceStatusVO.refunded();
    if (reason) this._notes = reason;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  attachPdf(url: string, now: string = new Date().toISOString()): void {
    if (!url || url.trim().length === 0) {
      throw new ValidationError('PDF URL is required', 'pdfUrl');
    }
    this._pdfUrl = url;
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid invoice transition: "${this._status.value}" → "${target}"`,
        'INVALID_INVOICE_TRANSITION',
        { from: this._status.value, to: target },
      );
    }
  }

  static create(params: {
    id: string;
    props: Omit<VendorInvoiceEntityProps, 'status'>;
    now: string;
  }): VendorInvoiceEntity {
    return new VendorInvoiceEntity(params.id, params.now, params.now, {
      ...params.props,
      status: InvoiceStatusVO.draft(),
    });
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    props: VendorInvoiceEntityProps;
    deletedAt?: string | null;
    version?: number;
  }): VendorInvoiceEntity {
    const entity = new VendorInvoiceEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

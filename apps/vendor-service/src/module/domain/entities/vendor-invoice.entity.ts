/**
 * VendorInvoiceEntity — cross-service invoice reference from payment-service
 * @module vendor-service/domain/entities
 *
 * Vendors receive invoice notifications from payment-service.
 * They store references (not full invoice data) for quick access.
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';

export interface VendorInvoiceProps {
  readonly vendorId: string;
  readonly invoiceId: string;
  readonly invoiceNumber: string;
  readonly orderId?: string;
  readonly userId: string;
  readonly total: number;
  readonly currency: string;
  readonly status: string;
  readonly issuedAt: string;
  readonly customerName?: string;
  readonly customerEmail?: string;
  readonly receivedAt: string;
}

export class VendorInvoiceEntity extends BaseEntity<string> {
  private readonly _vendorId: string;
  private readonly _invoiceId: string;
  private readonly _invoiceNumber: string;
  private readonly _orderId?: string;
  private readonly _userId: string;
  private readonly _total: number;
  private readonly _currency: string;
  private _status: string;
  private readonly _issuedAt: string;
  private readonly _customerName?: string;
  private readonly _customerEmail?: string;
  private readonly _receivedAt: string;

  private constructor(id: string, createdAt: string, updatedAt: string, props: VendorInvoiceProps) {
    super(id, createdAt, updatedAt);
    this._vendorId = props.vendorId;
    this._invoiceId = props.invoiceId;
    this._invoiceNumber = props.invoiceNumber;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._total = props.total;
    this._currency = props.currency;
    this._status = props.status;
    this._issuedAt = props.issuedAt;
    this._customerName = props.customerName;
    this._customerEmail = props.customerEmail;
    this._receivedAt = props.receivedAt;
  }

  static create(id: string, props: VendorInvoiceProps): VendorInvoiceEntity {
    const now = new Date().toISOString();
    return new VendorInvoiceEntity(id, now, now, props);
  }

  static reconstitute(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: VendorInvoiceProps,
  ): VendorInvoiceEntity {
    return new VendorInvoiceEntity(id, createdAt, updatedAt, props);
  }

  get vendorId(): string { return this._vendorId; }
  get invoiceId(): string { return this._invoiceId; }
  get invoiceNumber(): string { return this._invoiceNumber; }
  get orderId(): string | undefined { return this._orderId; }
  get userId(): string { return this._userId; }
  get total(): number { return this._total; }
  get currency(): string { return this._currency; }
  get status(): string { return this._status; }
  get issuedAt(): string { return this._issuedAt; }
  get customerName(): string | undefined { return this._customerName; }
  get customerEmail(): string | undefined { return this._customerEmail; }
  get receivedAt(): string { return this._receivedAt; }
}

/**
 * Invoice Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceStatusVO } from '@domain/primitives/invoice-status.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { OrderIdVO } from '@domain/primitives/order-id.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

export interface InvoiceVOProps {
  readonly id: InvoiceIdVO;
  readonly invoiceNumber: InvoiceNumberVO;
  readonly status: InvoiceStatusVO;
  readonly amount: InvoiceAmountVO;
  readonly orderId?: OrderIdVO;
  readonly userId: UserIdVO;
  readonly issuedAt?: string;
  readonly dueAt?: string;
  readonly paidAt?: string;
  readonly notes?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class InvoiceVO extends BaseVO<InvoiceVOProps> {
  private constructor(props: InvoiceVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: InvoiceVOProps): InvoiceVO {
    const vo = new InvoiceVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: InvoiceVOProps): InvoiceVO {
    return new InvoiceVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.status.isIssued() && !v.issuedAt) {
      throw new ValidationError('Issued invoice requires issuedAt', 'issuedAt');
    }
    if (v.status.isPaid() && !v.paidAt) {
      throw new ValidationError('Paid invoice requires paidAt', 'paidAt');
    }
    if (v.dueAt && v.issuedAt && new Date(v.dueAt).getTime() < new Date(v.issuedAt).getTime()) {
      throw new ValidationError('dueAt must be after issuedAt', 'dueAt');
    }
  }

  get id(): InvoiceIdVO { return this.value.id; }
  get invoiceNumber(): InvoiceNumberVO { return this.value.invoiceNumber; }
  get status(): InvoiceStatusVO { return this.value.status; }
  get amount(): InvoiceAmountVO { return this.value.amount; }
  get orderId(): OrderIdVO | undefined { return this.value.orderId; }
  get userId(): UserIdVO { return this.value.userId; }
  get issuedAt(): string | undefined { return this.value.issuedAt; }
  get dueAt(): string | undefined { return this.value.dueAt; }
  get paidAt(): string | undefined { return this.value.paidAt; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isPaid(): boolean { return this.status.isPaid(); }
  isOverdue(): boolean { return this.status.isOverdue(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isPayable(): boolean { return this.status.isPayable(); }
}

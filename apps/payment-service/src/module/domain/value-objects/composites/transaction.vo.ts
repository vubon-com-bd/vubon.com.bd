/**
 * TransactionVO — snapshot of a single money movement
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TransactionIdVO } from '../primitives/transaction-id.vo.js';
import { TransactionTypeVO } from '../primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../primitives/transaction-status.vo.js';
import { TransactionReferenceVO } from '../primitives/transaction-reference.vo.js';
import { PaymentIdVO } from '../primitives/payment-id.vo.js';
import { PaymentAmountVO } from '../primitives/payment-amount.vo.js';
import { OrderIdVO } from '../primitives/order-id.vo.js';
import { UserIdVO } from '../primitives/user-id.vo.js';

export interface TransactionVOProps {
  readonly id: TransactionIdVO;
  readonly paymentId: PaymentIdVO;
  readonly orderId?: OrderIdVO;
  readonly userId?: UserIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: PaymentAmountVO;
  readonly gateway?: string;
  readonly reference?: TransactionReferenceVO;
  readonly idempotencyKey?: string;
  readonly processedAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TransactionVO extends BaseVO<TransactionVOProps> {
  private constructor(props: TransactionVOProps) {
    super(props);
  }

  static create(props: TransactionVOProps): TransactionVO {
    const vo = new TransactionVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: TransactionVOProps): TransactionVO {
    return new TransactionVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.amount.amount <= 0) {
      throw new ValidationError('Transaction amount must be positive', 'amount');
    }
    if (v.status.isSuccess() && !v.processedAt) {
      throw new ValidationError(
        'Success transaction must have processedAt timestamp',
        'processedAt',
      );
    }
  }

  get id(): TransactionIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get orderId(): OrderIdVO | undefined { return this.value.orderId; }
  get userId(): UserIdVO | undefined { return this.value.userId; }
  get type(): TransactionTypeVO { return this.value.type; }
  get status(): TransactionStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): string { return this.value.amount.currency; }
  get gateway(): string | undefined { return this.value.gateway; }
  get reference(): TransactionReferenceVO | undefined { return this.value.reference; }
  get processedAt(): string | undefined { return this.value.processedAt; }
  get createdAt(): string { return this.value.createdAt; }

  isDebit(): boolean { return this.value.type.isDebit(); }
  isCredit(): boolean { return this.value.type.isCredit(); }

  /** Signed amount for ledger posting. */
  signedAmount(): number {
    return this.isCredit() ? this.value.amount.amount : -this.value.amount.amount;
  }
}

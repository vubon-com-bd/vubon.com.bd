/**
 * Transaction Value Object (Composite)
 * @module payment-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { TransactionStatusVO } from '@domain/primitives/transaction-status.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { GatewayReferenceVO } from '@domain/primitives/gateway-reference.vo';

export interface TransactionVOProps {
  readonly id: TransactionIdVO;
  readonly paymentId: PaymentIdVO;
  readonly type: TransactionTypeVO;
  readonly status: TransactionStatusVO;
  readonly amount: PaymentAmountVO;
  readonly gatewayReference?: GatewayReferenceVO;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class TransactionVO extends BaseVO<TransactionVOProps> {
  private constructor(props: TransactionVOProps) {
    super(props);
    Object.freeze(this);
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
    if (v.status.isSuccess() && !v.gatewayReference) {
      throw new ValidationError(
        'Successful transaction requires a gateway reference',
        'gatewayReference',
      );
    }
  }

  get id(): TransactionIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get type(): TransactionTypeVO { return this.value.type; }
  get status(): TransactionStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get gatewayReference(): GatewayReferenceVO | undefined { return this.value.gatewayReference; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isDebit(): boolean { return this.type.isDebit(); }
  isCredit(): boolean { return this.type.isCredit(); }
  isSuccess(): boolean { return this.status.isSuccess(); }
  isFinal(): boolean { return this.status.isFinal(); }
  isRetryable(): boolean { return this.status.isRetryable(); }
}

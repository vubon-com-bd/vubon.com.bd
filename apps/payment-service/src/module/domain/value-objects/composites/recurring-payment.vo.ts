import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RecurringIdVO } from '../primitives/recurring-id.vo';
import { RecurringFrequencyVO } from '../primitives/recurring-frequency.vo';
import { RecurringStatusVO } from '../primitives/recurring-status.vo';
import { PaymentIdVO } from '../primitives/payment-id.vo';
import { PaymentAmountVO } from '../primitives/payment-amount.vo';
import { PaymentCurrencyVO } from '../primitives/payment-currency.vo';

export interface RecurringPaymentVOProps {
  readonly id: RecurringIdVO;
  readonly paymentId: PaymentIdVO;
  readonly frequency: RecurringFrequencyVO;
  readonly status: RecurringStatusVO;
  readonly amount: PaymentAmountVO;
  readonly currency: PaymentCurrencyVO;
  readonly nextRunAt: Date;
  readonly completedCycles: number;
}

export class RecurringPaymentVO extends BaseVO<RecurringPaymentVOProps> {
  private constructor(props: RecurringPaymentVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: RecurringPaymentVOProps): RecurringPaymentVO {
    return new RecurringPaymentVO(props);
  }

  get id(): RecurringIdVO { return this.value.id; }
  get paymentId(): PaymentIdVO { return this.value.paymentId; }
  get frequency(): RecurringFrequencyVO { return this.value.frequency; }
  get status(): RecurringStatusVO { return this.value.status; }
  get amount(): PaymentAmountVO { return this.value.amount; }
  get currency(): PaymentCurrencyVO { return this.value.currency; }
  get nextRunAt(): Date { return this.value.nextRunAt; }
  get completedCycles(): number { return this.value.completedCycles; }
}

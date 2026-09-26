import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CheckoutIdVO } from '../primitives/checkout-id.vo';
import { CheckoutStatusVO } from '../primitives/checkout-status.vo';
import { CheckoutStepVO } from '../primitives/checkout-step.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';

export interface CheckoutProps {
  readonly id: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly status: CheckoutStatusVO;
  readonly step: CheckoutStepVO;
}

export class CheckoutVO extends BaseVO<CheckoutProps> {
  private constructor(props: CheckoutProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CheckoutProps): CheckoutVO {
    return new CheckoutVO(props);
  }

  get id(): CheckoutIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get status(): CheckoutStatusVO { return this.value.status; }
  get step(): CheckoutStepVO { return this.value.step; }
}

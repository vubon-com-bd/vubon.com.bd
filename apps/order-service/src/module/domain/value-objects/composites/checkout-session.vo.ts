import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CheckoutIdVO } from '../primitives/checkout-id.vo';
import { CustomerIdVO } from '../primitives/customer-id.vo';
import { CheckoutStatusVO } from '../primitives/checkout-status.vo';

export interface CheckoutSessionProps {
  readonly id: CheckoutIdVO;
  readonly customerId: CustomerIdVO;
  readonly status: CheckoutStatusVO;
  readonly expiresAt: Date | null;
}

export class CheckoutSessionVO extends BaseVO<CheckoutSessionProps> {
  private constructor(props: CheckoutSessionProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CheckoutSessionProps): CheckoutSessionVO {
    return new CheckoutSessionVO(props);
  }

  get id(): CheckoutIdVO { return this.value.id; }
  get customerId(): CustomerIdVO { return this.value.customerId; }
  get status(): CheckoutStatusVO { return this.value.status; }
  get expiresAt(): Date | null { return this.value.expiresAt; }

  isExpired(now: Date = new Date()): boolean {
    if (!this.value.expiresAt) return false;
    return this.value.expiresAt.getTime() <= now.getTime();
  }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { SubscriptionIdVO } from '../primitives/subscription-id.vo';
import { SubscriptionPlanVO } from '../primitives/subscription-plan.vo';
import { SubscriptionStatusVO } from '../primitives/subscription-status.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { PaymentMethodIdVO } from '../primitives/payment-method-id.vo';

export interface SubscriptionVOProps {
  readonly id: SubscriptionIdVO;
  readonly userId: UserIdVO;
  readonly plan: SubscriptionPlanVO;
  readonly status: SubscriptionStatusVO;
  readonly paymentMethodId: PaymentMethodIdVO | null;
  readonly currentPeriodFrom: Date;
  readonly currentPeriodTo: Date;
}

export class SubscriptionVO extends BaseVO<SubscriptionVOProps> {
  private constructor(props: SubscriptionVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SubscriptionVOProps): SubscriptionVO {
    return new SubscriptionVO(props);
  }

  get id(): SubscriptionIdVO { return this.value.id; }
  get userId(): UserIdVO { return this.value.userId; }
  get plan(): SubscriptionPlanVO { return this.value.plan; }
  get status(): SubscriptionStatusVO { return this.value.status; }
  get paymentMethodId(): PaymentMethodIdVO | null { return this.value.paymentMethodId; }
  get currentPeriodFrom(): Date { return this.value.currentPeriodFrom; }
  get currentPeriodTo(): Date { return this.value.currentPeriodTo; }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AbandonedCartIdVO } from '../primitives/abandoned-cart-id.vo';
import { AbandonedCartStatusVO } from '../primitives/abandoned-cart-status.vo';
import { AbandonedCartReminderVO } from '../primitives/abandoned-cart-reminder.vo';
import { CartIdVO } from '../primitives/cart-id.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface AbandonedCartVOProps {
  readonly id: AbandonedCartIdVO;
  readonly cartId: CartIdVO;
  readonly userId: UserIdVO | null;
  readonly itemCount: number;
  readonly subtotalAmount: number;
  readonly currency: string;
  readonly status: AbandonedCartStatusVO;
  readonly reminder: AbandonedCartReminderVO;
  readonly abandonedAt: Date;
}

export class AbandonedCartVO extends BaseVO<AbandonedCartVOProps> {
  private constructor(props: AbandonedCartVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: AbandonedCartVOProps): AbandonedCartVO {
    return new AbandonedCartVO(props);
  }

  get id(): AbandonedCartIdVO { return this.value.id; }
  get cartId(): CartIdVO { return this.value.cartId; }
  get userId(): UserIdVO | null { return this.value.userId; }
  get itemCount(): number { return this.value.itemCount; }
  get subtotalAmount(): number { return this.value.subtotalAmount; }
  get currency(): string { return this.value.currency; }
  get status(): AbandonedCartStatusVO { return this.value.status; }
  get reminder(): AbandonedCartReminderVO { return this.value.reminder; }
  get abandonedAt(): Date { return this.value.abandonedAt; }
}

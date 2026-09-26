import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { CartIdVO } from '../primitives/cart-id.vo';
import { CartStatusVO } from '../primitives/cart-status.vo';
import { CartTypeVO } from '../primitives/cart-type.vo';
import { UserIdVO } from '../primitives/user-id.vo';

export interface CartVOProps {
  readonly id: CartIdVO;
  readonly userId: UserIdVO | null;
  readonly type: CartTypeVO;
  readonly status: CartStatusVO;
  readonly itemCount: number;
  readonly subtotalAmount: number;
  readonly currency: string;
}

export class CartVO extends BaseVO<CartVOProps> {
  private constructor(props: CartVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartVOProps): CartVO {
    return new CartVO(props);
  }

  get id(): CartIdVO { return this.value.id; }
  get userId(): UserIdVO | null { return this.value.userId; }
  get type(): CartTypeVO { return this.value.type; }
  get status(): CartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get subtotalAmount(): number { return this.value.subtotalAmount; }
  get currency(): string { return this.value.currency; }
}

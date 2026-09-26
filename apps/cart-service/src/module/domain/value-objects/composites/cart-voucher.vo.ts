import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { VoucherCodeVO } from '../primitives/voucher-code.vo';
import { VoucherStatusVO } from '../primitives/voucher-status.vo';
import { VoucherTypeVO } from '../primitives/voucher-type.vo';

export interface CartVoucherVOProps {
  readonly code: VoucherCodeVO;
  readonly status: VoucherStatusVO;
  readonly type: VoucherTypeVO;
  readonly amount: number;
  readonly appliedAt: Date;
}

export class CartVoucherVO extends BaseVO<CartVoucherVOProps> {
  private constructor(props: CartVoucherVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: CartVoucherVOProps): CartVoucherVO {
    return new CartVoucherVO(props);
  }

  get code(): VoucherCodeVO { return this.value.code; }
  get status(): VoucherStatusVO { return this.value.status; }
  get type(): VoucherTypeVO { return this.value.type; }
  get amount(): number { return this.value.amount; }
  get appliedAt(): Date { return this.value.appliedAt; }
}

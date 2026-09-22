import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { GuestCartIdVO } from '../primitives/guest-cart-id.vo';
import { GuestCartStatusVO } from '../primitives/guest-cart-status.vo';
import { GuestTokenVO } from '../primitives/guest-token.vo';

export interface GuestCartVOProps {
  readonly id: GuestCartIdVO;
  readonly token: GuestTokenVO;
  readonly status: GuestCartStatusVO;
  readonly itemCount: number;
  readonly expiresAt: Date;
}

export class GuestCartVO extends BaseVO<GuestCartVOProps> {
  private constructor(props: GuestCartVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: GuestCartVOProps): GuestCartVO {
    return new GuestCartVO(props);
  }

  get id(): GuestCartIdVO { return this.value.id; }
  get token(): GuestTokenVO { return this.value.token; }
  get status(): GuestCartStatusVO { return this.value.status; }
  get itemCount(): number { return this.value.itemCount; }
  get expiresAt(): Date { return this.value.expiresAt; }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { WalletAddressVO } from '../primitives/wallet-address.vo';
import { PaymentMethodProviderVO } from '../primitives/payment-method-provider.vo';

export interface WalletDetailsVOProps {
  readonly address: WalletAddressVO;
  readonly provider: PaymentMethodProviderVO;
}

export class WalletDetailsVO extends BaseVO<WalletDetailsVOProps> {
  private constructor(props: WalletDetailsVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: WalletDetailsVOProps): WalletDetailsVO {
    return new WalletDetailsVO(props);
  }

  get address(): WalletAddressVO { return this.value.address; }
  get provider(): PaymentMethodProviderVO { return this.value.provider; }
}

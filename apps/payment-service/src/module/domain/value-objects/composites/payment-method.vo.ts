import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PaymentMethodIdVO } from '../primitives/payment-method-id.vo';
import { PaymentMethodTypeVO } from '../primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '../primitives/payment-method-provider.vo';
import { CardTokenVO } from '../primitives/card-token.vo';
import { CardLast4VO } from '../primitives/card-last4.vo';
import { CardBrandVO } from '../primitives/card-brand.vo';
import { CardExpiryVO } from '../primitives/card-expiry.vo';
import { WalletAddressVO } from '../primitives/wallet-address.vo';

export interface PaymentMethodVOProps {
  readonly id: PaymentMethodIdVO;
  readonly type: PaymentMethodTypeVO;
  readonly provider: PaymentMethodProviderVO | null;
  readonly cardToken: CardTokenVO | null;
  readonly cardLast4: CardLast4VO | null;
  readonly cardBrand: CardBrandVO | null;
  readonly cardExpiry: CardExpiryVO | null;
  readonly walletAddress: WalletAddressVO | null;
  readonly isDefault: boolean;
}

export class PaymentMethodVO extends BaseVO<PaymentMethodVOProps> {
  private constructor(props: PaymentMethodVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PaymentMethodVOProps): PaymentMethodVO {
    return new PaymentMethodVO(props);
  }

  get id(): PaymentMethodIdVO { return this.value.id; }
  get type(): PaymentMethodTypeVO { return this.value.type; }
  get provider(): PaymentMethodProviderVO | null { return this.value.provider; }
  get cardToken(): CardTokenVO | null { return this.value.cardToken; }
  get cardLast4(): CardLast4VO | null { return this.value.cardLast4; }
  get cardBrand(): CardBrandVO | null { return this.value.cardBrand; }
  get cardExpiry(): CardExpiryVO | null { return this.value.cardExpiry; }
  get walletAddress(): WalletAddressVO | null { return this.value.walletAddress; }
  get isDefault(): boolean { return this.value.isDefault; }
}

import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PaymentGatewayVO as GatewayTypeVO } from '../primitives/payment-gateway.vo';
import { PaymentMethodTypeVO } from '../primitives/payment-method-type.vo';
import { PaymentMethodProviderVO } from '../primitives/payment-method-provider.vo';
import { GatewayReferenceVO } from '../primitives/gateway-reference.vo';

export interface PaymentGatewayVOProps {
  readonly gateway: GatewayTypeVO;
  readonly methodType: PaymentMethodTypeVO;
  readonly provider: PaymentMethodProviderVO | null;
  readonly reference: GatewayReferenceVO | null;
  readonly isLocal: boolean;
}

export class PaymentGatewayCompositeVO extends BaseVO<PaymentGatewayVOProps> {
  private constructor(props: PaymentGatewayVOProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: PaymentGatewayVOProps): PaymentGatewayCompositeVO {
    return new PaymentGatewayCompositeVO(props);
  }

  get gateway(): GatewayTypeVO { return this.value.gateway; }
  get methodType(): PaymentMethodTypeVO { return this.value.methodType; }
  get provider(): PaymentMethodProviderVO | null { return this.value.provider; }
  get reference(): GatewayReferenceVO | null { return this.value.reference; }
  get isLocal(): boolean { return this.value.isLocal; }
}

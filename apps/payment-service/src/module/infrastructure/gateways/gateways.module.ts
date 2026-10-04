/**
 * GatewaysModule — registers all gateway adapters + resolver
 * @module payment-service/infrastructure/gateways
 */
import { Global, Module } from '@nestjs/common';
import { PAYMENT_GATEWAY_ADAPTERS } from './payment-gateway.adapter.js';
import { BkashGatewayAdapter } from './bkash.gateway.adapter.js';
import { NagadGatewayAdapter } from './nagad.gateway.adapter.js';
import { RocketGatewayAdapter } from './rocket.gateway.adapter.js';
import { SslcommerzGatewayAdapter } from './sslcommerz.gateway.adapter.js';
import { StripeGatewayAdapter } from './stripe.gateway.adapter.js';
import { PaypalGatewayAdapter } from './paypal.gateway.adapter.js';
import { CodGatewayAdapter } from './cod.gateway.adapter.js';
import { GatewayResolverService } from './gateway-resolver.service.js';

const ADAPTERS = [
  BkashGatewayAdapter,
  NagadGatewayAdapter,
  RocketGatewayAdapter,
  SslcommerzGatewayAdapter,
  StripeGatewayAdapter,
  PaypalGatewayAdapter,
  CodGatewayAdapter,
];

@Global()
@Module({
  providers: [
    BkashGatewayAdapter,
    NagadGatewayAdapter,
    RocketGatewayAdapter,
    SslcommerzGatewayAdapter,
    StripeGatewayAdapter,
    PaypalGatewayAdapter,
    CodGatewayAdapter,
    {
      provide: PAYMENT_GATEWAY_ADAPTERS,
      useFactory: (
        bkash: BkashGatewayAdapter,
        nagad: NagadGatewayAdapter,
        rocket: RocketGatewayAdapter,
        sslc: SslcommerzGatewayAdapter,
        stripe: StripeGatewayAdapter,
        paypal: PaypalGatewayAdapter,
        cod: CodGatewayAdapter,
      ) => [bkash, nagad, rocket, sslc, stripe, paypal, cod],
      inject: ADAPTERS,
    },
    GatewayResolverService,
  ],
  exports: [GatewayResolverService, PAYMENT_GATEWAY_ADAPTERS, ...ADAPTERS],
})
export class GatewaysModule {}

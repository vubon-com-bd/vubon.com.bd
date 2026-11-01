/**
 * Gateways Module — aggregates all concrete gateway adapters
 * @module payment-service/infrastructure/gateways
 *
 * Registers all 7+ gateway adapters in a single PAYMENT_GATEWAY_ADAPTERS token.
 * The GatewayResolverService uses this token to look up adapters by id.
 */
import { Module } from '@nestjs/common';
import { BkashModule } from './bkash/bkash.module.js';
import { NagadModule } from './nagad/nagad.module.js';
import { RocketModule } from './rocket/rocket.module.js';
import { StripeModule } from './stripe/stripe.module.js';
import { PaypalModule } from './paypal/paypal.module.js';
import { SslcommerzModule } from './sslcommerz/sslcommerz.module.js';
import { AamarpayModule } from './aamarpay/aamarpay.module.js';
import { CodModule } from './cod/cod.module.js';

import { BkashGatewayAdapter } from './bkash/bkash.gateway.js';
import { NagadGatewayAdapter } from './nagad/nagad.gateway.js';
import { RocketGatewayAdapter } from './rocket/rocket.gateway.js';
import { StripeGatewayAdapter } from './stripe/stripe.gateway.js';
import { PaypalGatewayAdapter } from './paypal/paypal.gateway.js';
import { SslcommerzGatewayAdapter } from './sslcommerz/sslcommerz.gateway.js';
import { AamarpayGatewayAdapter } from './aamarpay/aamarpay.gateway.js';
import { CodGatewayAdapter } from './cod/cod.gateway.js';

import { PAYMENT_GATEWAY_ADAPTERS } from './base/gateway.interface.js';
import { GatewayResolverService } from './gateway-resolver.service.js';

@Module({
  imports: [
    BkashModule,
    NagadModule,
    RocketModule,
    StripeModule,
    PaypalModule,
    SslcommerzModule,
    AamarpayModule,
    CodModule,
  ],
  providers: [
    {
      provide: PAYMENT_GATEWAY_ADAPTERS,
      useFactory: (
        bkash: BkashGatewayAdapter,
        nagad: NagadGatewayAdapter,
        rocket: RocketGatewayAdapter,
        stripe: StripeGatewayAdapter,
        paypal: PaypalGatewayAdapter,
        sslcommerz: SslcommerzGatewayAdapter,
        aamarpay: AamarpayGatewayAdapter,
        cod: CodGatewayAdapter,
      ) => [
        bkash,
        nagad,
        rocket,
        stripe,
        paypal,
        sslcommerz,
        aamarpay,
        cod,
      ],
      inject: [
        BkashGatewayAdapter,
        NagadGatewayAdapter,
        RocketGatewayAdapter,
        StripeGatewayAdapter,
        PaypalGatewayAdapter,
        SslcommerzGatewayAdapter,
        AamarpayGatewayAdapter,
        CodGatewayAdapter,
      ],
    },
    GatewayResolverService,
  ],
  exports: [PAYMENT_GATEWAY_ADAPTERS, GatewayResolverService],
})
export class GatewaysModule {}

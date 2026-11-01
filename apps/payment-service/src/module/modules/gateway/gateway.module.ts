/**
 * GatewayModule — feature-level aggregate for all gateway adapters
 * @module payment-service/modules/gateway
 *
 * Aggregates the eight infrastructure gateway modules plus a crypto
 * placeholder. This gives the AppModule a single import point for
 * payment gateway wiring.
 */
import { Module } from '@nestjs/common';
import {
  AamarpayModule,
  BkashModule,
  CodModule,
  CryptoModule,
  NagadModule,
  PaypalModule,
  RocketModule,
  SslcommerzModule,
  StripeModule,
} from './gateways/index.js';

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
    CryptoModule,
  ],
  exports: [
    BkashModule,
    NagadModule,
    RocketModule,
    StripeModule,
    PaypalModule,
    SslcommerzModule,
    AamarpayModule,
    CodModule,
    CryptoModule,
  ],
})
export class GatewayModule {}

/**
 * COD Gateway Module
 * @module payment-service/infrastructure/gateways/cod
 */
import { Module } from '@nestjs/common';
import { CodGatewayAdapter } from './cod.gateway.js';

@Module({
  providers: [CodGatewayAdapter],
  exports: [CodGatewayAdapter],
})
export class CodModule {}

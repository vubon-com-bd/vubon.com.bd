/**
 * Shipping Module
 * @module order-service/infrastructure/external/shipping
 */
import { Global, Module } from '@nestjs/common';
import { ShippingService } from './shipping.service.js';

@Global()
@Module({
  providers: [ShippingService],
  exports: [ShippingService],
})
export class OrderShippingModule {}

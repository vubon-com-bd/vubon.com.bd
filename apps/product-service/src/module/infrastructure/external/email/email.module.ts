/**
 * Email Module
 * @module product-service/infrastructure/external/email
 */
import { Global, Module } from '@nestjs/common';
import { ProductEmailService } from './email.service.js';

@Global()
@Module({
  providers: [ProductEmailService],
  exports: [ProductEmailService],
})
export class ProductEmailModule {}

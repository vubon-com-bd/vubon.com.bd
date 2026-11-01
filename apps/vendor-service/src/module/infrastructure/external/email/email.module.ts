/**
 * Vendor Email Module
 * @module vendor-service/infrastructure/external/email
 */
import { Global, Module } from '@nestjs/common';
import { VendorEmailService } from './email.service.js';

@Global()
@Module({
  providers: [VendorEmailService],
  exports: [VendorEmailService],
})
export class VendorEmailModule {}

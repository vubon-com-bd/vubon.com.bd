/**
 * CartEmailModule
 * @module cart-service/infrastructure/external/email
 */
import { Global, Module } from '@nestjs/common';
import { EmailModule as KernelEmailModule } from '@vubon/shared-kernel/infrastructure/external/email';
import { CartEmailService } from './email.service.js';

@Global()
@Module({
  imports: [KernelEmailModule],
  providers: [CartEmailService],
  exports: [CartEmailService],
})
export class CartEmailModule {}

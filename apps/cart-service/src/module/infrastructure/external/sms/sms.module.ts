/**
 * CartSmsModule
 * @module cart-service/infrastructure/external/sms
 */
import { Global, Module } from '@nestjs/common';
import { SmsModule as KernelSmsModule } from '@vubon/shared-kernel/infrastructure/external/sms';
import { CartSmsService } from './sms.service.js';

@Global()
@Module({
  imports: [KernelSmsModule],
  providers: [CartSmsService],
  exports: [CartSmsService],
})
export class CartSmsModule {}

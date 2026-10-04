import { Module } from '@nestjs/common';
import { SmsModule as KernelSmsModule } from '@vubon/shared-kernel/infrastructure';
import { CartSmsService } from './sms.service.js';

@Module({
  imports: [KernelSmsModule],
  providers: [CartSmsService],
  exports: [CartSmsService],
})
export class CartSmsModule {}

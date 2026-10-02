import { Module } from '@nestjs/common';
import { EmailModule as KernelEmailModule } from '@vubon/shared-kernel/infrastructure';
import { CartEmailService } from './email.service.js';

@Module({
  imports: [KernelEmailModule],
  providers: [CartEmailService],
  exports: [CartEmailService],
})
export class CartEmailModule {}

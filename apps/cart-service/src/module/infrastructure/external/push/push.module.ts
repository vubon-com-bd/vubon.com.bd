import { Module } from '@nestjs/common';
import { PushModule as KernelPushModule } from '@vubon/shared-kernel/infrastructure';
import { CartPushService } from './push.service.js';

@Module({
  imports: [KernelPushModule],
  providers: [CartPushService],
  exports: [CartPushService],
})
export class CartPushModule {}

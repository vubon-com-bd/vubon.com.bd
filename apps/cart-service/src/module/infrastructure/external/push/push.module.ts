/**
 * CartPushModule
 * @module cart-service/infrastructure/external/push
 */
import { Global, Module } from '@nestjs/common';
import { PushModule as KernelPushModule } from '@vubon/shared-kernel/infrastructure/external/push';
import { CartPushService } from './push.service.js';

@Global()
@Module({
  imports: [KernelPushModule],
  providers: [CartPushService],
  exports: [CartPushService],
})
export class CartPushModule {}

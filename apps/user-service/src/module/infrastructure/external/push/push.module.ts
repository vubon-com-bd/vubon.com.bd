/**
 * User Push Module
 */
import { Global, Module } from '@nestjs/common';
import { PushService } from '@vubon/shared-kernel/infrastructure';
import { UserPushService } from './push.service.js';

@Global()
@Module({
  providers: [PushService, UserPushService],
  exports: [PushService, UserPushService],
})
export class UserPushModule {}

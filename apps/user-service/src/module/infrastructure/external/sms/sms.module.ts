/**
 * User SMS Module
 * @module user-service/infrastructure/external/sms
 *
 * Provides SmsService (kernel) + UserSmsService (wrapper).
 * Registers SmsService directly here so DI resolves without relying
 * on kernel's @Global() module import chain.
 */
import { Global, Module } from '@nestjs/common';
import { SmsService } from '@vubon/shared-kernel/infrastructure';
import { UserSmsService } from './sms.service.js';

@Global()
@Module({
  providers: [SmsService, UserSmsService],
  exports: [SmsService, UserSmsService],
})
export class UserSmsModule {}

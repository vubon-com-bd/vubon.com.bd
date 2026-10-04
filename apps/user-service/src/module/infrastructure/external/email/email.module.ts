/**
 * User Email Module
 */
import { Global, Module } from '@nestjs/common';
import { EmailService } from '@vubon/shared-kernel/infrastructure';
import { UserEmailService } from './email.service.js';

@Global()
@Module({
  providers: [EmailService, UserEmailService],
  exports: [EmailService, UserEmailService],
})
export class UserEmailModule {}

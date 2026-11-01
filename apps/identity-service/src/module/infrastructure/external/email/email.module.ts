/**
 * Auth Email Module
 * @module identity-service/infrastructure/external/email
 */
import { Global, Module } from '@nestjs/common';
import { EmailModule as KernelEmailModule } from '@vubon/shared-kernel/infrastructure/external/email';
import { AuthEmailService } from './email.service.js';

@Global()
@Module({
  imports: [KernelEmailModule],
  providers: [AuthEmailService],
  exports: [AuthEmailService],
})
export class AuthEmailModule {}

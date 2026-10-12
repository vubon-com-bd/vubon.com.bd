/**
 * Email Module
 */
import { Global, Module } from '@nestjs/common';
import { EmailModule as KernelEmailModule } from '@vubon/shared-kernel/infrastructure/external/email';
import { AnalyticsEmailService } from './email.service.js';

@Global()
@Module({
  imports: [KernelEmailModule],
  providers: [AnalyticsEmailService],
  exports: [AnalyticsEmailService],
})
export class AnalyticsEmailModule {}

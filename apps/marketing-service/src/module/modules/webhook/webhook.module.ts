import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { KernelCommonModule } from '@vubon/shared-kernel/modules';

import { WebhookSignatureGuard } from '../../interfaces/guards/webhook-signature.guard';

@Module({
  imports: [KernelCommonModule, CqrsModule],
  providers: [WebhookSignatureGuard],
  exports: [WebhookSignatureGuard],
})
export class WebhookModule {}

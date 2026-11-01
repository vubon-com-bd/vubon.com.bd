/**
 * ApplicationWebhooksModule — all courier webhook handlers
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TrackingModule } from '../tracking/index.js';
import { WEBHOOK_COMMAND_HANDLERS } from '@application/commands/webhook/handlers.index';

@Module({
  imports: [CqrsModule, TrackingModule],
  providers: [...(WEBHOOK_COMMAND_HANDLERS as unknown as never[])],
})
export class ApplicationWebhooksModule {}

/**
 * SubscriptionModule — feature wiring for subscriptions
 * @module payment-service/modules/subscription
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

// ─── Controller ─────────────────────────────
import { SubscriptionController } from '@interfaces/controllers/rest/subscription.controller';

// ─── Handler arrays ─────────────────────────
import { SUBSCRIPTION_COMMAND_HANDLERS } from './commands/index.js';
import { SUBSCRIPTION_QUERY_HANDLERS } from './queries/index.js';
import { SUBSCRIPTION_SAGAS } from './sagas/index.js';

// ─── Service + interface token ──────────────
import { SubscriptionService } from '@application/services/impl/subscription.service';
import { SUBSCRIPTION_SERVICE } from '@application/services/interfaces/subscription.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule],
  controllers: [SubscriptionController],
  providers: [
    SubscriptionService,
    { provide: SUBSCRIPTION_SERVICE, useExisting: SubscriptionService },
    ...(SUBSCRIPTION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(SUBSCRIPTION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(SUBSCRIPTION_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [SubscriptionService, SUBSCRIPTION_SERVICE],
})
export class SubscriptionModule {}

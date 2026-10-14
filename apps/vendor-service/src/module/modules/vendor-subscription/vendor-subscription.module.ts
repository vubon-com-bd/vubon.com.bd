import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorSubscriptionController } from '../../interfaces/controllers/rest/vendor-subscription.controller.js';

import { VENDOR_SUBSCRIPTION_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_SUBSCRIPTION_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_SUBSCRIPTION_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_SUBSCRIPTION_SAGAS } from './sagas/index.js';

import { VendorSubscriptionService } from '../../application/services/impl/vendor-subscription.service.js';
import { VENDOR_SUBSCRIPTION_SERVICE } from '../../application/services/interfaces/vendor-subscription.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorSubscriptionController],
  providers: [
    VendorSubscriptionService,
    { provide: VENDOR_SUBSCRIPTION_SERVICE, useExisting: VendorSubscriptionService },
    ...(VENDOR_SUBSCRIPTION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUBSCRIPTION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUBSCRIPTION_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUBSCRIPTION_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorSubscriptionService, VENDOR_SUBSCRIPTION_SERVICE],
})
export class VendorSubscriptionModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorPayoutController } from '../../interfaces/controllers/rest/vendor-payout.controller.js';

import { VENDOR_PAYOUT_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_PAYOUT_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_PAYOUT_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_PAYOUT_SAGAS } from './sagas/index.js';

import { VendorPayoutService } from '../../application/services/impl/vendor-payout.service.js';
import { VENDOR_PAYOUT_SERVICE } from '../../application/services/interfaces/vendor-payout.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorPayoutController],
  providers: [
    VendorPayoutService,
    { provide: VENDOR_PAYOUT_SERVICE, useExisting: VendorPayoutService },
    ...(VENDOR_PAYOUT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PAYOUT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PAYOUT_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PAYOUT_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorPayoutService, VENDOR_PAYOUT_SERVICE],
})
export class VendorPayoutModule {}

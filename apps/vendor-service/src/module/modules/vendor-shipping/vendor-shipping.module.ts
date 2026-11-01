import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorShippingController } from '../../interfaces/controllers/rest/vendor-shipping.controller.js';

import { VENDOR_SHIPPING_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_SHIPPING_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_SHIPPING_EVENT_HANDLERS } from './events/index.js';

import { VendorShippingService } from '../../application/services/impl/vendor-shipping.service.js';
import { VENDOR_SHIPPING_SERVICE } from '../../application/services/interfaces/vendor-shipping.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorShippingController],
  providers: [
    VendorShippingService,
    { provide: VENDOR_SHIPPING_SERVICE, useExisting: VendorShippingService },
    ...(VENDOR_SHIPPING_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SHIPPING_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SHIPPING_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorShippingService, VENDOR_SHIPPING_SERVICE],
})
export class VendorShippingModule {}

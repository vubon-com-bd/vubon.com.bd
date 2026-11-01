import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorWarrantyController } from '../../interfaces/controllers/rest/vendor-warranty.controller.js';

import { VENDOR_WARRANTY_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_WARRANTY_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_WARRANTY_EVENT_HANDLERS } from './events/index.js';

import { VendorWarrantyService } from '../../application/services/impl/vendor-warranty.service.js';
import { VENDOR_WARRANTY_SERVICE } from '../../application/services/interfaces/vendor-warranty.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorWarrantyController],
  providers: [
    VendorWarrantyService,
    { provide: VENDOR_WARRANTY_SERVICE, useExisting: VendorWarrantyService },
    ...(VENDOR_WARRANTY_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_WARRANTY_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_WARRANTY_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorWarrantyService, VENDOR_WARRANTY_SERVICE],
})
export class VendorWarrantyModule {}

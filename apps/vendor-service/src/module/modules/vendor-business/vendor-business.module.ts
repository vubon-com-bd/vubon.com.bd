/**
 * VendorBusinessModule
 * @module vendor-service/modules/vendor-business
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorBusinessController } from '../../interfaces/controllers/rest/vendor-business.controller.js';

import { VENDOR_BUSINESS_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_BUSINESS_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_BUSINESS_EVENT_HANDLERS } from './events/index.js';

import { VendorBusinessService } from '../../application/services/impl/vendor-business.service.js';
import { VENDOR_BUSINESS_SERVICE } from '../../application/services/interfaces/vendor-business.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorBusinessController],
  providers: [
    VendorBusinessService,
    { provide: VENDOR_BUSINESS_SERVICE, useExisting: VendorBusinessService },
    ...(VENDOR_BUSINESS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_BUSINESS_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_BUSINESS_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorBusinessService, VENDOR_BUSINESS_SERVICE],
})
export class VendorBusinessModule {}

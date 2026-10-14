/**
 * VendorAddressModule
 * @module vendor-service/modules/vendor-address
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorAddressController } from '../../interfaces/controllers/rest/vendor-address.controller.js';

import { VENDOR_ADDRESS_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_ADDRESS_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_ADDRESS_EVENT_HANDLERS } from './events/index.js';

import { VendorAddressService } from '../../application/services/impl/vendor-address.service.js';
import { VENDOR_ADDRESS_SERVICE } from '../../application/services/interfaces/vendor-address.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorAddressController],
  providers: [
    VendorAddressService,
    { provide: VENDOR_ADDRESS_SERVICE, useExisting: VendorAddressService },
    ...(VENDOR_ADDRESS_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_ADDRESS_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_ADDRESS_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorAddressService, VENDOR_ADDRESS_SERVICE],
})
export class VendorAddressModule {}

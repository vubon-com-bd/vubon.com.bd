/**
 * VendorContactModule
 * @module vendor-service/modules/vendor-contact
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorContactController } from '../../interfaces/controllers/rest/vendor-contact.controller.js';

import { VENDOR_CONTACT_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_CONTACT_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_CONTACT_EVENT_HANDLERS } from './events/index.js';

import { VendorContactService } from '../../application/services/impl/vendor-contact.service.js';
import { VENDOR_CONTACT_SERVICE } from '../../application/services/interfaces/vendor-contact.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorContactController],
  providers: [
    VendorContactService,
    { provide: VENDOR_CONTACT_SERVICE, useExisting: VendorContactService },
    ...(VENDOR_CONTACT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_CONTACT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_CONTACT_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorContactService, VENDOR_CONTACT_SERVICE],
})
export class VendorContactModule {}

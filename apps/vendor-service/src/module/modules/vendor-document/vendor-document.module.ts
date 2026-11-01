/**
 * VendorDocumentModule
 * @module vendor-service/modules/vendor-document
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorDocumentController } from '../../interfaces/controllers/rest/vendor-document.controller.js';

import { VENDOR_DOCUMENT_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_DOCUMENT_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_DOCUMENT_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_DOCUMENT_SAGAS } from './sagas/index.js';

import { VendorDocumentService } from '../../application/services/impl/vendor-document.service.js';
import { VENDOR_DOCUMENT_SERVICE } from '../../application/services/interfaces/vendor-document.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorDocumentController],
  providers: [
    VendorDocumentService,
    { provide: VENDOR_DOCUMENT_SERVICE, useExisting: VendorDocumentService },
    ...(VENDOR_DOCUMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_DOCUMENT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_DOCUMENT_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_DOCUMENT_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorDocumentService, VENDOR_DOCUMENT_SERVICE],
})
export class VendorDocumentModule {}

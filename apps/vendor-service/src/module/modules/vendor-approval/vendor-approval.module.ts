/**
 * VendorApprovalModule
 * @module vendor-service/modules/vendor-approval
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorApprovalController } from '../../interfaces/controllers/rest/vendor-approval.controller.js';

import { VENDOR_APPROVAL_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_APPROVAL_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_APPROVAL_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_APPROVAL_SAGAS } from './sagas/index.js';

import { VendorApprovalService } from '../../application/services/impl/vendor-approval.service.js';
import { VENDOR_APPROVAL_SERVICE } from '../../application/services/interfaces/vendor-approval.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorApprovalController],
  providers: [
    VendorApprovalService,
    { provide: VENDOR_APPROVAL_SERVICE, useExisting: VendorApprovalService },
    ...(VENDOR_APPROVAL_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_APPROVAL_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_APPROVAL_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_APPROVAL_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorApprovalService, VENDOR_APPROVAL_SERVICE],
})
export class VendorApprovalModule {}

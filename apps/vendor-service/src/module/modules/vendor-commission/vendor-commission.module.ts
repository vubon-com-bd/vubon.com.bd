import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorCommissionController } from '../../interfaces/controllers/rest/vendor-commission.controller.js';

import { VENDOR_COMMISSION_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_COMMISSION_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_COMMISSION_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_COMMISSION_SAGAS } from './sagas/index.js';

import { VendorCommissionService } from '../../application/services/impl/vendor-commission.service.js';
import { VENDOR_COMMISSION_SERVICE } from '../../application/services/interfaces/vendor-commission.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorCommissionController],
  providers: [
    VendorCommissionService,
    { provide: VENDOR_COMMISSION_SERVICE, useExisting: VendorCommissionService },
    ...(VENDOR_COMMISSION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_COMMISSION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_COMMISSION_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_COMMISSION_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorCommissionService, VENDOR_COMMISSION_SERVICE],
})
export class VendorCommissionModule {}

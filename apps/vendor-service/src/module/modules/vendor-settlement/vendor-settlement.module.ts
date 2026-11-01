import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorSettlementController } from '../../interfaces/controllers/rest/vendor-settlement.controller.js';

import { VENDOR_SETTLEMENT_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_SETTLEMENT_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_SETTLEMENT_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_SETTLEMENT_SAGAS } from './sagas/index.js';

import { VendorSettlementService } from '../../application/services/impl/vendor-settlement.service.js';
import { VENDOR_SETTLEMENT_SERVICE } from '../../application/services/interfaces/vendor-settlement.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorSettlementController],
  providers: [
    VendorSettlementService,
    { provide: VENDOR_SETTLEMENT_SERVICE, useExisting: VendorSettlementService },
    ...(VENDOR_SETTLEMENT_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SETTLEMENT_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SETTLEMENT_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SETTLEMENT_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorSettlementService, VENDOR_SETTLEMENT_SERVICE],
})
export class VendorSettlementModule {}

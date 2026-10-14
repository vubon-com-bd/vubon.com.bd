import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorPerformanceController } from '../../interfaces/controllers/rest/vendor-performance.controller.js';

import { VENDOR_PERFORMANCE_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_PERFORMANCE_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_PERFORMANCE_EVENT_HANDLERS } from './events/index.js';

import { VendorPerformanceService } from '../../application/services/impl/vendor-performance.service.js';
import { VENDOR_PERFORMANCE_SERVICE } from '../../application/services/interfaces/vendor-performance.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorPerformanceController],
  providers: [
    VendorPerformanceService,
    { provide: VENDOR_PERFORMANCE_SERVICE, useExisting: VendorPerformanceService },
    ...(VENDOR_PERFORMANCE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PERFORMANCE_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PERFORMANCE_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorPerformanceService, VENDOR_PERFORMANCE_SERVICE],
})
export class VendorPerformanceModule {}

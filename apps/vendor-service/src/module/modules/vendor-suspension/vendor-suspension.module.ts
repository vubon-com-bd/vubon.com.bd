/**
 * VendorSuspensionModule
 * @module vendor-service/modules/vendor-suspension
 */
import { Module, forwardRef } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorSuspensionController } from '../../interfaces/controllers/rest/vendor-suspension.controller.js';

import { VENDOR_SUSPENSION_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_SUSPENSION_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_SUSPENSION_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_SUSPENSION_SAGAS } from './sagas/index.js';

import { VendorSuspensionService } from '../../application/services/impl/vendor-suspension.service.js';
import { VENDOR_SUSPENSION_SERVICE } from '../../application/services/interfaces/vendor-suspension.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, forwardRef(() => VendorModule)],
  controllers: [VendorSuspensionController],
  providers: [
    VendorSuspensionService,
    { provide: VENDOR_SUSPENSION_SERVICE, useExisting: VendorSuspensionService },
    ...(VENDOR_SUSPENSION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUSPENSION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUSPENSION_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_SUSPENSION_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorSuspensionService, VENDOR_SUSPENSION_SERVICE],
})
export class VendorSuspensionModule {}

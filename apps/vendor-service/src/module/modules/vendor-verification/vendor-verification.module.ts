/**
 * VendorVerificationModule
 * @module vendor-service/modules/vendor-verification
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorVerificationController } from '../../interfaces/controllers/rest/vendor-verification.controller.js';

import { VENDOR_VERIFICATION_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_VERIFICATION_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_VERIFICATION_EVENT_HANDLERS } from './events/index.js';
import { VENDOR_VERIFICATION_SAGAS } from './sagas/index.js';

import { VendorVerificationService } from '../../application/services/impl/vendor-verification.service.js';
import { VENDOR_VERIFICATION_SERVICE } from '../../application/services/interfaces/vendor-verification.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorVerificationController],
  providers: [
    VendorVerificationService,
    { provide: VENDOR_VERIFICATION_SERVICE, useExisting: VendorVerificationService },
    ...(VENDOR_VERIFICATION_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_VERIFICATION_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_VERIFICATION_EVENT_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_VERIFICATION_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [VendorVerificationService, VENDOR_VERIFICATION_SERVICE],
})
export class VendorVerificationModule {}

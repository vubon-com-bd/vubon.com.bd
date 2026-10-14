/**
 * VendorProfileModule
 * @module vendor-service/modules/vendor-profile
 *
 * Re-uses VendorService (from VendorModule) for profile-specific operations.
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorProfileController } from '../../interfaces/controllers/rest/vendor-profile.controller.js';

import { VENDOR_PROFILE_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_PROFILE_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_PROFILE_EVENT_HANDLERS } from './events/index.js';

import { VendorProfileService } from '../../application/services/impl/vendor-profile.service.js';
import { VENDOR_PROFILE_SERVICE } from '../../application/services/interfaces/vendor-profile.service.interface.js';

// ⚠️ Import VendorModule to access VENDOR_SERVICE and shared handlers
import { VendorModule } from '../vendor/index.js';

@Module({
  imports: [
    CqrsModule,
    EventBridgeModule,
    VendorModule,  // ← VendorService + VENDOR_SERVICE + UpdateProfileHandler all available
  ],
  controllers: [VendorProfileController],
  providers: [
    VendorProfileService,
    { provide: VENDOR_PROFILE_SERVICE, useExisting: VendorProfileService },
    ...(VENDOR_PROFILE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PROFILE_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_PROFILE_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorProfileService, VENDOR_PROFILE_SERVICE],
})
export class VendorProfileModule {}

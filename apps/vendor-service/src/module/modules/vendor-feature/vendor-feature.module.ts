import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorFeatureController } from '../../interfaces/controllers/rest/vendor-feature.controller.js';

import { VENDOR_FEATURE_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_FEATURE_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_FEATURE_EVENT_HANDLERS } from './events/index.js';

import { VendorFeatureService } from '../../application/services/impl/vendor-feature.service.js';
import { VENDOR_FEATURE_SERVICE } from '../../application/services/interfaces/vendor-feature.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorFeatureController],
  providers: [
    VendorFeatureService,
    { provide: VENDOR_FEATURE_SERVICE, useExisting: VendorFeatureService },
    ...(VENDOR_FEATURE_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_FEATURE_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_FEATURE_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorFeatureService, VENDOR_FEATURE_SERVICE],
})
export class VendorFeatureModule {}

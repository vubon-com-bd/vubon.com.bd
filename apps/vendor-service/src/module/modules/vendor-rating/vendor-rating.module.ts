import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorRatingController } from '../../interfaces/controllers/rest/vendor-rating.controller.js';

import { VENDOR_RATING_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_RATING_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_RATING_EVENT_HANDLERS } from './events/index.js';

import { VendorRatingService } from '../../application/services/impl/vendor-rating.service.js';
import { VENDOR_RATING_SERVICE } from '../../application/services/interfaces/vendor-rating.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorRatingController],
  providers: [
    VendorRatingService,
    { provide: VENDOR_RATING_SERVICE, useExisting: VendorRatingService },
    ...(VENDOR_RATING_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_RATING_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_RATING_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorRatingService, VENDOR_RATING_SERVICE],
})
export class VendorRatingModule {}

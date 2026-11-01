import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorModule } from '../vendor/index.js';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';

import { VendorReviewController } from '../../interfaces/controllers/rest/vendor-review.controller.js';

import { VENDOR_REVIEW_COMMAND_HANDLERS } from './commands/index.js';
import { VENDOR_REVIEW_QUERY_HANDLERS } from './queries/index.js';
import { VENDOR_REVIEW_EVENT_HANDLERS } from './events/index.js';

import { VendorReviewService } from '../../application/services/impl/vendor-review.service.js';
import { VENDOR_REVIEW_SERVICE } from '../../application/services/interfaces/vendor-review.service.interface.js';

@Module({
  imports: [CqrsModule, EventBridgeModule, VendorModule],
  controllers: [VendorReviewController],
  providers: [
    VendorReviewService,
    { provide: VENDOR_REVIEW_SERVICE, useExisting: VendorReviewService },
    ...(VENDOR_REVIEW_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_REVIEW_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(VENDOR_REVIEW_EVENT_HANDLERS as readonly unknown[] as never[]),
  ],
  exports: [VendorReviewService, VENDOR_REVIEW_SERVICE],
})
export class VendorReviewModule {}

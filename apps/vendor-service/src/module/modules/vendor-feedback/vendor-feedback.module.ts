/**
 * VendorFeedbackModule — rating + review + performance
 * @module vendor-service/modules/vendor-feedback
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// ─── Controllers ───
import { VendorRatingController } from '../../interfaces/controllers/rest/vendor-rating.controller.js';
import { VendorReviewController } from '../../interfaces/controllers/rest/vendor-review.controller.js';
import { VendorPerformanceController } from '../../interfaces/controllers/rest/vendor-performance.controller.js';

// ─── Services ───
import { VendorRatingService } from '../../application/services/impl/vendor-rating.service.js';
import { VendorReviewService } from '../../application/services/impl/vendor-review.service.js';
import { VendorPerformanceService } from '../../application/services/impl/vendor-performance.service.js';

import { VENDOR_RATING_SERVICE } from '../../application/services/interfaces/vendor-rating.service.interface.js';
import { VENDOR_REVIEW_SERVICE } from '../../application/services/interfaces/vendor-review.service.interface.js';
import { VENDOR_PERFORMANCE_SERVICE } from '../../application/services/interfaces/vendor-performance.service.interface.js';

// ─── Guards ───
import { VendorOwnerGuard } from '../../interfaces/guards/vendor-owner.guard.js';

// ─── Review command handlers ───
import {
  SubmitVendorReviewHandler,
  ApproveVendorReviewHandler,
} from '../../application/commands/rating/index.js';

// ─── Rating query handlers ───
import { GetVendorRatingHandler } from '../../application/queries/rating/index.js';

// ─── Review query handlers ───
import {
  GetVendorReviewHandler,
  ListVendorReviewsHandler,
  ListPublicVendorReviewsHandler,
} from '../../application/queries/review/index.js';

// ─── Performance query handlers ───
import {
  GetVendorPerformanceHandler,
  ListVendorPerformanceHandler,
} from '../../application/queries/performance/index.js';

const SERVICES = [
  VendorRatingService,
  VendorReviewService,
  VendorPerformanceService,
  { provide: VENDOR_RATING_SERVICE, useExisting: VendorRatingService },
  { provide: VENDOR_REVIEW_SERVICE, useExisting: VendorReviewService },
  { provide: VENDOR_PERFORMANCE_SERVICE, useExisting: VendorPerformanceService },
];

const COMMAND_HANDLERS = [
  SubmitVendorReviewHandler,
  ApproveVendorReviewHandler,
];

const QUERY_HANDLERS = [
  // rating
  GetVendorRatingHandler,
  // review
  GetVendorReviewHandler,
  ListVendorReviewsHandler,
  ListPublicVendorReviewsHandler,
  // performance
  GetVendorPerformanceHandler,
  ListVendorPerformanceHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [
    VendorRatingController,
    VendorReviewController,
    VendorPerformanceController,
  ],
  providers: [
    ...SERVICES,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    VendorOwnerGuard,
  ],
  exports: [
    VendorRatingService,
    VENDOR_RATING_SERVICE,
    VendorReviewService,
    VENDOR_REVIEW_SERVICE,
    VendorPerformanceService,
    VENDOR_PERFORMANCE_SERVICE,
  ],
})
export class VendorFeedbackModule {}

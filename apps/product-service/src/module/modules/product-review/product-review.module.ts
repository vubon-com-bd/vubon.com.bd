/**
 * ProductReviewModule — review feature wiring
 * @module product-service/modules/product-review
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductReviewController } from '../../interfaces/controllers/rest/product-review.controller.js';

import { REVIEW_COMMAND_HANDLERS } from './commands/index.js';
import { REVIEW_QUERY_HANDLERS } from './queries/index.js';
import { REVIEW_SAGAS } from './sagas/index.js';

import { ProductReviewService } from '../../application/services/impl/product-review.service.js';
import { REVIEW_SERVICE } from '../../application/services/interfaces/product-review.service.interface.js';

@Module({
  imports: [CqrsModule],
  controllers: [ProductReviewController],
  providers: [
    ProductReviewService,
    { provide: REVIEW_SERVICE, useExisting: ProductReviewService },
    ...(REVIEW_COMMAND_HANDLERS as readonly unknown[] as never[]),
    ...(REVIEW_QUERY_HANDLERS as readonly unknown[] as never[]),
    ...(REVIEW_SAGAS as readonly unknown[] as never[]),
  ],
  exports: [ProductReviewService, REVIEW_SERVICE],
})
export class ProductReviewModule {}

import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ProductReviewController } from '../../interfaces/controllers/rest/product-review.controller';
import { ProductReviewService } from '../../application/services/impl/product-review.service';
import { ReviewMapper } from '../../application/mappers/review.mapper';
import {
  SubmitReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler,
  ApproveReviewHandler,
  RejectReviewHandler,
} from '../../application/commands/review';
import {
  ListReviewsHandler,
  GetReviewStatsHandler,
} from '../../application/queries/review';
import { ProductReviewSaga } from '../../application/sagas';
import { ProductReviewPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/product-review.prisma.repository';
import { ProductReviewCacheRepository } from '../../infrastructure/persistence/cache/repositories/product-review.cache.repository';
import { RatingCalculatorService } from '../../infrastructure/services/internal/rating-calculator.service';

const COMMAND_HANDLERS = [
  SubmitReviewHandler,
  UpdateReviewHandler,
  DeleteReviewHandler,
  ApproveReviewHandler,
  RejectReviewHandler,
];

const QUERY_HANDLERS = [ListReviewsHandler, GetReviewStatsHandler];

@Module({
  imports: [CqrsModule],
  controllers: [ProductReviewController],
  providers: [
    ProductReviewPrismaRepository,
    ProductReviewCacheRepository,
    RatingCalculatorService,
    ProductReviewService,
    ReviewMapper,
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ProductReviewSaga,
  ],
  exports: [ProductReviewService, ProductReviewPrismaRepository],
})
export class ProductReviewModule {}

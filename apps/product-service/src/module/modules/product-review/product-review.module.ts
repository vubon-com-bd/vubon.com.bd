/**
 * ProductReviewModule
 */
import { Module } from '@nestjs/common';
import { PrismaRepositoriesModule } from '../../infrastructure/persistence/prisma/repositories.module.js';
import { ProductReviewController } from '../../interfaces/controllers/rest/product-review.controller.js';
import { ReviewService } from '../../application/services/impl/review.service.js';
import { REVIEW_SERVICE } from '../../application/services/interfaces/review.service.interface.js';
import { REVIEW_COMMAND_HANDLERS } from '../../application/commands/review/index.js';
import { REVIEW_QUERY_HANDLERS } from '../../application/queries/review/index.js';
import { ReviewModerationSaga } from '../../application/sagas/review-moderation.saga.js';
import { ReviewValidator, REVIEW_VALIDATOR } from '../../interfaces/validators/review.validator.js';

@Module({
  imports: [PrismaRepositoriesModule],
  controllers: [ProductReviewController],
  providers: [
    ReviewService,
    { provide: REVIEW_SERVICE, useExisting: ReviewService },
    ReviewValidator,
    { provide: REVIEW_VALIDATOR, useExisting: ReviewValidator },
    ...REVIEW_COMMAND_HANDLERS,
    ...REVIEW_QUERY_HANDLERS,
    ReviewModerationSaga],
  exports: [ReviewService, REVIEW_SERVICE],
})
export class ProductReviewModule {}

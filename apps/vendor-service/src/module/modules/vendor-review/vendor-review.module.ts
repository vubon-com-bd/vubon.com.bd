import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorReviewController } from '../../interfaces/controllers/rest/vendor-review.controller';
import { SubmitReviewHandler } from '../../application/commands/review';
import { RespondReviewHandler } from '../../application/commands/review';
import { ListReviewsHandler } from '../../application/queries/review';
import { GetReviewStatsHandler } from '../../application/queries/review';
import { VendorReviewPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-review.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [VendorReviewController],
  providers: [
    VendorReviewPrismaRepository,
    SubmitReviewHandler,
    RespondReviewHandler,
    ListReviewsHandler,
    GetReviewStatsHandler,
  ],
  exports: [VendorReviewPrismaRepository],
})
export class VendorReviewModule {}

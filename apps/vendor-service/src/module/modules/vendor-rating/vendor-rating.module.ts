import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VendorRatingController } from '../../interfaces/controllers/rest/vendor-rating.controller';
import { GetReviewStatsHandler } from '../../application/queries/review';
import { VendorRatingPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/vendor-rating.prisma.repository';
import { RatingCalculatorService } from '../../infrastructure/services/internal/rating-calculator.service';

@Module({
  imports: [CqrsModule],
  controllers: [VendorRatingController],
  providers: [
    VendorRatingPrismaRepository,
    RatingCalculatorService,
    GetReviewStatsHandler,
  ],
  exports: [VendorRatingPrismaRepository, RatingCalculatorService],
})
export class VendorRatingModule {}

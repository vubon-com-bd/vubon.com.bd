/**
 * RatingCalculatorService — internal helper for rating computation
 * @module vendor-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';
import {
  RatingCalculatorService as DomainRatingCalculator,
  type RatingReviewSnapshot,
} from '../../../domain/services/rating-calculator.service.js';

@Injectable()
export class RatingCalculatorService {
  compute(reviews: readonly RatingReviewSnapshot[]) {
    return DomainRatingCalculator.compute(reviews);
  }

  weighted(reviews: readonly RatingReviewSnapshot[]) {
    return DomainRatingCalculator.computeWeighted(reviews);
  }
}

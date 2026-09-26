import { RatingValueVO } from '../value-objects/primitives/rating-value.vo';
import { VendorReviewEntity } from '../entities/vendor-review.entity';

export class RatingCalculatorService {
  calculate(reviews: readonly VendorReviewEntity[]): RatingValueVO {
    if (reviews.length === 0) {
      return RatingValueVO.create(0);
    }
    const total = reviews.reduce((sum, r) => sum + r.rating.value, 0);
    const avg = total / reviews.length;
    return RatingValueVO.create(Math.round(avg * 100) / 100);
  }

  distribution(reviews: readonly VendorReviewEntity[]): Record<number, number> {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) {
      const star = Math.round(r.rating.value);
      if (star >= 1 && star <= 5) dist[star] += 1;
    }
    return dist;
  }
}

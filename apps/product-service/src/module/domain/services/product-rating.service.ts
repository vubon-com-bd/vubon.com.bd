import { ProductReviewEntity } from '../entities/product-review.entity';

export class ProductRatingService {
  static calculateAverage(reviews: readonly ProductReviewEntity[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating.value, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }

  static distribution(
    reviews: readonly ProductReviewEntity[],
  ): Readonly<Record<number, number>> {
    const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    for (const r of reviews) {
      dist[r.rating.value] = (dist[r.rating.value] ?? 0) + 1;
    }
    return Object.freeze(dist);
  }
}

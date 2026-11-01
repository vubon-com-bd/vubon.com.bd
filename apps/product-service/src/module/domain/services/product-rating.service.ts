/**
 * ProductRatingService — Real business logic
 * @module product-service/domain/services
 *
 * Responsibilities:
 *  - Rating aggregation (simple + Bayesian average)
 *  - Rating distribution
 *  - Spam/abuse threshold detection
 *  - Quality score (Wilson score)
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { REVIEW_RATING } from '@vubon/shared-constants/business';

export interface RatingDistribution {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface RatingSummary {
  readonly totalReviews: number;
  readonly averageRating: number;
  readonly distribution: RatingDistribution;
  readonly verifiedCount: number;
}

export interface BayesianInput {
  readonly averageRating: number;
  readonly totalReviews: number;
  readonly globalAverage?: number;
  readonly confidenceWeight?: number;
}

export interface WilsonScoreInput {
  readonly positiveCount: number;
  readonly totalCount: number;
  readonly confidence?: number;
}

export class ProductRatingService {
  private static readonly GLOBAL_AVERAGE = 3.5;
  private static readonly CONFIDENCE_WEIGHT = 20;

  /**
   * Simple average + distribution।
   */
  static summarize(ratings: readonly number[], verifiedCount = 0): RatingSummary {
    const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (ratings.length === 0) {
      return { totalReviews: 0, averageRating: 0, distribution, verifiedCount };
    }

    let sum = 0;
    const dist = distribution as unknown as Record<number, number>;
    for (const r of ratings) {
      if (!Number.isInteger(r) || r < REVIEW_RATING.MIN || r > REVIEW_RATING.MAX) {
        throw new BusinessRuleError(
          `Invalid rating value: ${r}`,
          'RATING_INVALID',
          { rating: r },
        );
      }
      sum += r;
      dist[r]++;
    }

    const averageRating = Math.round((sum / ratings.length) * 100) / 100;
    return { totalReviews: ratings.length, averageRating, distribution, verifiedCount };
  }

  /**
   * Bayesian average — কম review-এ over-trust এড়াতে।
   */
  static bayesianAverage(input: BayesianInput): number {
    if (input.totalReviews < 0) {
      throw new BusinessRuleError(
        'Total reviews cannot be negative',
        'RATING_INVALID_TOTAL',
        { totalReviews: input.totalReviews },
      );
    }
    if (input.totalReviews === 0) return input.globalAverage ?? this.GLOBAL_AVERAGE;

    const C = input.confidenceWeight ?? this.CONFIDENCE_WEIGHT;
    const m = input.globalAverage ?? this.GLOBAL_AVERAGE;
    const R = input.averageRating;

    const score = (C * m + input.totalReviews * R) / (C + input.totalReviews);
    return Math.round(score * 100) / 100;
  }

  /**
   * Wilson score — "helpful" reviews এর confidence-based ranking।
   */
  static wilsonScore(input: WilsonScoreInput): number {
    const { positiveCount, totalCount } = input;
    if (totalCount === 0) return 0;

    const z = input.confidence ?? 1.96; // 95% confidence
    const phat = positiveCount / totalCount;
    const z2 = z * z;

    const numerator =
      phat + z2 / (2 * totalCount) -
      z * Math.sqrt((phat * (1 - phat) + z2 / (4 * totalCount)) / totalCount);
    const denominator = 1 + z2 / totalCount;

    return Math.round((numerator / denominator) * 10000) / 10000;
  }

  /**
   * Rating distribution থেকে percent breakdown।
   */
  static distributionPercent(distribution: RatingDistribution): Record<1 | 2 | 3 | 4 | 5, number> {
    const total =
      distribution[1] + distribution[2] + distribution[3] + distribution[4] + distribution[5];

    if (total === 0) return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    const round = (v: number) => Math.round((v / total) * 10000) / 100;
    return {
      1: round(distribution[1]),
      2: round(distribution[2]),
      3: round(distribution[3]),
      4: round(distribution[4]),
      5: round(distribution[5]),
    };
  }

  /**
   * Review abuse detection — too many low ratings in a short window।
   */
  static isSuspiciousSpike(recentRatings: readonly number[], windowHours = 24): boolean {
    if (recentRatings.length < 5) return false;

    const low = recentRatings.filter((r) => r <= 2).length;
    const lowRatio = low / recentRatings.length;

    const avg = recentRatings.reduce((a, b) => a + b, 0) / recentRatings.length;

    return lowRatio >= 0.6 && avg <= 2.5 && windowHours <= 24;
  }
}

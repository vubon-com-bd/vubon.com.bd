/**
 * VendorRatingCalculatorService
 * @module vendor-service/domain/services
 *
 * Pure computations for aggregating ratings from reviews.
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RatingScoreVO } from '../value-objects/primitives/rating-score.vo.js';
import { VendorReviewEntity } from '../entities/vendor-review.entity.js';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

export interface Distribution {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface RatingCalculationResult {
  readonly overall: RatingScoreVO;
  readonly totalReviews: number;
  readonly distribution: Distribution;
  readonly positiveRatio: number;
  readonly negativeRatio: number;
}

export class VendorRatingCalculatorService {
  static emptyDistribution(): Distribution {
    return { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  /** Build distribution from a list of reviews (visible only). */
  static distributionFromReviews(reviews: readonly VendorReviewEntity[]): Distribution {
    const dist = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } as Record<1 | 2 | 3 | 4 | 5, number>;
    for (const r of reviews) {
      const rounded = Math.round(r.rating.value) as 1 | 2 | 3 | 4 | 5;
      if (rounded >= 1 && rounded <= 5) dist[rounded] += 1;
    }
    return {
      1: dist[1],
      2: dist[2],
      3: dist[3],
      4: dist[4],
      5: dist[5],
    };
  }

  /** Compute overall from a distribution. */
  static computeOverall(dist: Distribution): RatingScoreVO {
    const total = dist[1] + dist[2] + dist[3] + dist[4] + dist[5];
    if (total === 0) return RatingScoreVO.zero();
    const weighted =
      (dist[1] * 1 + dist[2] * 2 + dist[3] * 3 + dist[4] * 4 + dist[5] * 5) / total;
    return RatingScoreVO.create(weighted);
  }

  /** Full calculation from raw reviews. */
  static calculate(reviews: readonly VendorReviewEntity[]): RatingCalculationResult {
    const visible = reviews.filter((r) => r.isPubliclyVisible());
    const distribution = VendorRatingCalculatorService.distributionFromReviews(visible);
    const total = visible.length;
    const overall = VendorRatingCalculatorService.computeOverall(distribution);
    const positive = distribution[4] + distribution[5];
    const negative = distribution[1] + distribution[2];
    return {
      overall,
      totalReviews: total,
      distribution,
      positiveRatio: total === 0 ? 0 : Math.round((positive / total) * 100) / 100,
      negativeRatio: total === 0 ? 0 : Math.round((negative / total) * 100) / 100,
    };
  }

  /**
   * Weighted average: recent reviews count more.
   * recentAvg & historicalAvg are on 0-5 scale.
   */
  static weightedAverage(
    recentAvg: number,
    historicalAvg: number,
    recentCount: number,
  ): RatingScoreVO {
    if (recentCount === 0) return RatingScoreVO.create(historicalAvg);
    if (recentCount < 5) {
      // Not enough recent signal — no weighting
      const combined = (recentAvg * recentCount + historicalAvg * (5 - recentCount)) / 5;
      return RatingScoreVO.create(combined);
    }
    const weight = VENDOR_RATING.RECENT_WEIGHT_FACTOR;
    const combined = (recentAvg * weight + historicalAvg) / (weight + 1);
    return RatingScoreVO.create(combined);
  }

  /** Should this vendor's rating be auto-hidden? */
  static shouldAutoHide(overall: RatingScoreVO, totalReviews: number): boolean {
    if (totalReviews < VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY) return false;
    return overall.shouldAutoHide();
  }

  /** Should this vendor's rating be flagged for review? */
  static shouldAutoFlag(overall: RatingScoreVO, totalReviews: number): boolean {
    if (totalReviews < VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY) return false;
    return overall.shouldAutoFlag();
  }

  /** Star percentage breakdown. */
  static percentageFor(dist: Distribution, stars: 1 | 2 | 3 | 4 | 5): number {
    const total = dist[1] + dist[2] + dist[3] + dist[4] + dist[5];
    if (total === 0) return 0;
    return Math.round((dist[stars] / total) * 100);
  }

  /**
   * Compute a composite category score with weights.
   * categories: [{category, score, count}]
   */
  static categoryComposite(
    categories: ReadonlyArray<{ score: number; count: number }>,
  ): number {
    if (categories.length === 0) return 0;
    let weightedSum = 0;
    let totalWeight = 0;
    for (const c of categories) {
      if (c.count <= 0) continue;
      weightedSum += c.score * c.count;
      totalWeight += c.count;
    }
    if (totalWeight === 0) return 0;
    return Math.round((weightedSum / totalWeight) * 10) / 10;
  }

  /** Growth trend — compare recent vs older window. */
  static trend(
    recentOverall: RatingScoreVO,
    previousOverall: RatingScoreVO,
  ): 'improving' | 'stable' | 'declining' {
    const delta = recentOverall.value - previousOverall.value;
    if (delta > 0.2) return 'improving';
    if (delta < -0.2) return 'declining';
    return 'stable';
  }

  /** Guard: validate review list is not empty when computing. */
  static assertNonEmpty(reviews: readonly unknown[]): void {
    if (reviews.length === 0) {
      throw new ValidationError('No reviews to compute rating', 'reviews');
    }
  }
}

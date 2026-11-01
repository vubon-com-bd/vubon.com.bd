/**
 * RatingCalculatorService — Real business logic
 * @module vendor-service/domain/services
 *
 * Responsibilities:
 *  - Compute overall rating from individual reviews
 *  - Compute weighted rating (recent boost)
 *  - Compute distribution
 *  - Determine if rating should be hidden/flagged
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { VENDOR_RATING } from '@vubon/shared-constants/business';

// ─── Review Snapshot (lightweight, no full entity) ───
export interface RatingReviewSnapshot {
  readonly rating: number; // 1-5
  readonly submittedAt: string;
  readonly isRecent?: boolean;
}

// ─── Category Rating Snapshot ─────────────
export interface CategoryRatingSnapshot {
  readonly categoryId: string;
  readonly averageRating: number;
  readonly reviewCount: number;
}

// ─── Rating Computation Result ────────────
export interface RatingComputationResult {
  readonly overall: number;
  readonly totalReviews: number;
  readonly recentReviews: number;
  readonly distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
  readonly positivePercent: number;
  readonly negativePercent: number;
  readonly neutralPercent: number;
}

// ─── Weighted Rating Result ───────────────
export interface WeightedRatingResult {
  readonly rawAverage: number;
  readonly weightedScore: number;
  readonly recentWeight: number;
  readonly recentRatio: number;
}

const RECENT_WINDOW_DAYS = 90;

export class RatingCalculatorService {
  /**
   * Individual reviews থেকে overall rating compute করো।
   */
  static compute(reviews: readonly RatingReviewSnapshot[]): RatingComputationResult {
    if (reviews.length === 0) {
      return {
        overall: 0,
        totalReviews: 0,
        recentReviews: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        positivePercent: 0,
        negativePercent: 0,
        neutralPercent: 0,
      };
    }

    this.validateReviews(reviews);

    const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0,
    };
    let sum = 0;
    let recentCount = 0;
    const now = Date.now();
    const recentThresholdMs = RECENT_WINDOW_DAYS * 24 * 60 * 60 * 1000;

    for (const r of reviews) {
      const star = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5;
      if (star >= 1 && star <= 5) distribution[star] += 1;
      sum += r.rating;

      const ageMs = now - new Date(r.submittedAt).getTime();
      const isRecent =
        r.isRecent !== undefined ? r.isRecent : ageMs <= recentThresholdMs;
      if (isRecent) recentCount += 1;
    }

    const total = reviews.length;
    const overall = this.roundTo1(sum / total);
    const positive = distribution[4] + distribution[5];
    const negative = distribution[1] + distribution[2];
    const neutral = distribution[3];

    return {
      overall,
      totalReviews: total,
      recentReviews: recentCount,
      distribution,
      positivePercent: this.round((positive / total) * 100),
      negativePercent: this.round((negative / total) * 100),
      neutralPercent: this.round((neutral / total) * 100),
    };
  }

  /**
   * Weighted score — recent reviews weighted higher।
   */
  static computeWeighted(
    reviews: readonly RatingReviewSnapshot[],
  ): WeightedRatingResult {
    if (reviews.length === 0) {
      return {
        rawAverage: 0,
        weightedScore: 0,
        recentWeight: 0,
        recentRatio: 0,
      };
    }

    const base = this.compute(reviews);
    const recentRatio = base.totalReviews === 0
      ? 0
      : base.recentReviews / base.totalReviews;
    const recentWeight = recentRatio * VENDOR_RATING.RECENT_WEIGHT_FACTOR;

    // Weighted score = raw + recent boost, capped at 5
    const weighted = Math.min(5, base.overall + recentWeight * 0.5);

    return {
      rawAverage: base.overall,
      weightedScore: this.roundTo1(weighted),
      recentWeight: this.round(recentWeight),
      recentRatio: this.round(recentRatio * 100) / 100,
    };
  }

  /**
   * Should the rating be hidden (auto-hide threshold)।
   */
  static shouldAutoHide(overall: number, totalReviews: number): boolean {
    if (totalReviews < VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY) return false;
    return overall > 0 && overall < VENDOR_RATING.AUTO_HIDE_BELOW;
  }

  /**
   * Should the rating be flagged for review।
   */
  static shouldAutoFlag(overall: number, totalReviews: number): boolean {
    if (totalReviews < VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY) return false;
    return (
      overall >= VENDOR_RATING.AUTO_HIDE_BELOW &&
      overall < VENDOR_RATING.AUTO_FLAG_BELOW
    );
  }

  /**
   * Category-wise rating compute করো।
   */
  static computeCategories(
    snapshots: readonly CategoryRatingSnapshot[],
  ): {
    readonly byCategory: Readonly<Record<string, number>>;
    readonly strongestCategory: string | null;
    readonly weakestCategory: string | null;
  } {
    if (snapshots.length === 0) {
      return { byCategory: {}, strongestCategory: null, weakestCategory: null };
    }

    const byCategory: Record<string, number> = {};
    for (const s of snapshots) {
      if (s.reviewCount === 0) continue;
      byCategory[s.categoryId] = this.roundTo1(s.averageRating);
    }

    const entries = Object.entries(byCategory);
    if (entries.length === 0) {
      return { byCategory, strongestCategory: null, weakestCategory: null };
    }

    entries.sort((a, b) => b[1] - a[1]);
    const strongest = entries[0]![0];
    const weakest = entries[entries.length - 1]![0];

    return {
      byCategory,
      strongestCategory: strongest,
      weakestCategory: weakest,
    };
  }

  /**
   * দুটি vendor compare — rating score delta।
   */
  static compare(
    a: { readonly overall: number; readonly totalReviews: number },
    b: { readonly overall: number; readonly totalReviews: number },
  ): {
    readonly difference: number;
    readonly winner: 'a' | 'b' | 'tie';
    readonly confidence: 'low' | 'medium' | 'high';
  } {
    const difference = this.roundTo1(a.overall - b.overall);
    const totalReviews = a.totalReviews + b.totalReviews;

    let confidence: 'low' | 'medium' | 'high' = 'low';
    if (totalReviews >= 100) confidence = 'high';
    else if (totalReviews >= 30) confidence = 'medium';

    if (Math.abs(difference) < 0.1) {
      return { difference: 0, winner: 'tie', confidence };
    }
    return {
      difference,
      winner: difference > 0 ? 'a' : 'b',
      confidence,
    };
  }

  /**
   * Percent for a specific star।
   */
  static percentFor(
    distribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>,
    star: 1 | 2 | 3 | 4 | 5,
  ): number {
    const total = Object.values(distribution).reduce((s, v) => s + v, 0);
    if (total === 0) return 0;
    return this.round(((distribution[star] ?? 0) / total) * 100);
  }

  /**
   * Meets the display threshold।
   */
  static meetsDisplayThreshold(totalReviews: number): boolean {
    return totalReviews >= VENDOR_RATING.MIN_REVIEWS_FOR_DISPLAY;
  }

  // ═══════════════════════════════════════════
  // PRIVATE HELPERS
  // ═══════════════════════════════════════════

  private static round(n: number): number {
    return Math.round(n * 100) / 100;
  }

  private static roundTo1(n: number): number {
    return Math.round(n * 10) / 10;
  }

  private static validateReviews(reviews: readonly RatingReviewSnapshot[]): void {
    for (const r of reviews) {
      if (!Number.isFinite(r.rating) || r.rating < 0 || r.rating > 5) {
        throw new BusinessRuleError(
          'rating must be between 0 and 5',
          'INVALID_RATING',
          { rating: r.rating },
        );
      }
      if (!r.submittedAt) {
        throw new BusinessRuleError(
          'submittedAt is required',
          'MISSING_SUBMITTED_AT',
        );
      }
    }
  }
}

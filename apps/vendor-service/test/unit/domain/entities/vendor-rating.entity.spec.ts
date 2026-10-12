/**
 * VendorRatingEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorRatingEntity } from '../../../../src/module/domain/entities/vendor-rating.entity.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorRatingCategoryVO } from '../../../../src/module/domain/value-objects/primitives/vendor-rating-category.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const NOW = '2025-01-01T00:00:00.000Z';

function makeRating() {
  return VendorRatingEntity.create({
    id: UUID,
    vendorId: VENDOR,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorRatingEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      overall: RatingScoreVO.zero(),
      totalReviews: 0,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
      categories: [],
      recentWeight: 0,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorRatingEntity — creation', () => {
  it('creates empty rating', () => {
    const r = makeRating();
    expect(r.vendorId).toBe(VENDOR);
    expect(r.totalReviews).toBe(0);
    expect(r.overall.value).toBe(0);
  });
});

describe('VendorRatingEntity — invariants', () => {
  it('rejects non-integer totalReviews', () => {
    expect(() => reconstitute({ totalReviews: 1.5 })).toThrow();
  });

  it('rejects negative totalReviews', () => {
    expect(() => reconstitute({ totalReviews: -1 })).toThrow();
  });

  it('rejects distribution sum mismatch', () => {
    expect(() =>
      reconstitute({
        totalReviews: 5,
        distribution: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 0 },
      }),
    ).toThrow();
  });

  it('rejects > 20 categories', () => {
    expect(() =>
      reconstitute({
        categories: new Array(21).fill({
          category: VendorRatingCategoryVO.create('product_quality'),
          score: 4,
          count: 1,
        }),
      }),
    ).toThrow();
  });

  it('rejects negative recentWeight', () => {
    expect(() => reconstitute({ recentWeight: -1 })).toThrow();
  });
});

describe('VendorRatingEntity — getters', () => {
  it('returns scalar getters', () => {
    const r = reconstitute({
      totalReviews: 4,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 4, '5': 0 },
      overall: RatingScoreVO.create(4),
    });
    expect(r.overall.value).toBe(4);
    expect(r.totalReviews).toBe(4);
    expect(r.distribution['4']).toBe(4);
    expect(r.categories).toEqual([]);
    expect(r.recentWeight).toBe(0);
  });
});

describe('VendorRatingEntity — ratios', () => {
  it('positiveRatio 0 when empty', () => {
    expect(makeRating().positiveRatio()).toBe(0);
  });

  it('positiveRatio correct', () => {
    const r = reconstitute({
      totalReviews: 10,
      distribution: { '1': 0, '2': 0, '3': 2, '4': 4, '5': 4 },
      overall: RatingScoreVO.create(4.2),
    });
    expect(r.positiveRatio()).toBe(0.8);
  });

  it('negativeRatio 0 when empty', () => {
    expect(makeRating().negativeRatio()).toBe(0);
  });

  it('negativeRatio correct', () => {
    const r = reconstitute({
      totalReviews: 10,
      distribution: { '1': 2, '2': 3, '3': 3, '4': 1, '5': 1 },
      overall: RatingScoreVO.create(2.6),
    });
    expect(r.negativeRatio()).toBe(0.5);
  });

  it('percentageFor 0 when empty', () => {
    expect(makeRating().percentageFor('5')).toBe(0);
  });

  it('percentageFor each star', () => {
    const r = reconstitute({
      totalReviews: 10,
      distribution: { '1': 1, '2': 1, '3': 1, '4': 1, '5': 6 },
      overall: RatingScoreVO.create(4),
    });
    expect(r.percentageFor('5')).toBe(60);
    expect(r.percentageFor('1')).toBe(10);
  });
});

describe('VendorRatingEntity — computeOverall', () => {
  it('returns 0 for empty', () => {
    expect(makeRating().computeOverall().value).toBe(0);
  });

  it('computes weighted average', () => {
    const r = reconstitute({
      totalReviews: 10,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 10, '5': 0 },
      overall: RatingScoreVO.create(4),
    });
    expect(r.computeOverall().value).toBe(4);
  });

  it('computes mixed distribution', () => {
    const r = reconstitute({
      totalReviews: 4,
      distribution: { '1': 1, '2': 1, '3': 1, '4': 0, '5': 1 },
      overall: RatingScoreVO.zero(),
    });
    const computed = r.computeOverall();
    expect(computed.value).toBeGreaterThan(0);
  });
});

describe('VendorRatingEntity — recordReview', () => {
  it('records valid rating', () => {
    const r = makeRating();
    r.recordReview(5, NOW);
    expect(r.totalReviews).toBe(1);
    expect(r.distribution['5']).toBe(1);
    expect(r.overall.value).toBe(5);
  });

  it('rejects non-integer rating', () => {
    const r = makeRating();
    expect(() => r.recordReview(3.5, NOW)).toThrow();
  });

  it('rejects rating < 1', () => {
    const r = makeRating();
    expect(() => r.recordReview(0, NOW)).toThrow();
  });

  it('rejects rating > 5', () => {
    const r = makeRating();
    expect(() => r.recordReview(6, NOW)).toThrow();
  });

  it('increments distribution correctly', () => {
    const r = makeRating();
    r.recordReview(4, NOW);
    r.recordReview(4, NOW);
    r.recordReview(3, NOW);
    expect(r.totalReviews).toBe(3);
    expect(r.distribution['4']).toBe(2);
    expect(r.distribution['3']).toBe(1);
  });
});

describe('VendorRatingEntity — removeReview', () => {
  it('removes existing rating', () => {
    const r = makeRating();
    r.recordReview(5, NOW);
    r.removeReview(5, NOW);
    expect(r.totalReviews).toBe(0);
    expect(r.distribution['5']).toBe(0);
  });

  it('rejects non-integer rating', () => {
    const r = makeRating();
    expect(() => r.removeReview(3.5, NOW)).toThrow();
  });

  it('rejects rating < 1 or > 5', () => {
    const r = makeRating();
    expect(() => r.removeReview(0, NOW)).toThrow();
    expect(() => r.removeReview(6, NOW)).toThrow();
  });

  it('does nothing when rating count is 0', () => {
    const r = makeRating();
    const version = r.version;
    r.removeReview(5, NOW);
    expect(r.version).toBe(version);
  });
});

describe('VendorRatingEntity — updateCategory', () => {
  it('adds new category', () => {
    const r = makeRating();
    const cat = VendorRatingCategoryVO.create('product_quality');
    r.updateCategory(cat, 4.5, 10, NOW);
    expect(r.categories.length).toBe(1);
    expect(r.categories[0]!.score).toBe(4.5);
  });

  it('updates existing category', () => {
    const r = makeRating();
    const cat = VendorRatingCategoryVO.create('product_quality');
    r.updateCategory(cat, 4.0, 5, NOW);
    r.updateCategory(cat, 4.5, 10, NOW);
    expect(r.categories.length).toBe(1);
    expect(r.categories[0]!.score).toBe(4.5);
  });

  it('rejects score < 0', () => {
    const r = makeRating();
    expect(() => r.updateCategory(VendorRatingCategoryVO.create('product_quality'), -1, 1, NOW)).toThrow();
  });

  it('rejects score > 5', () => {
    const r = makeRating();
    expect(() => r.updateCategory(VendorRatingCategoryVO.create('product_quality'), 6, 1, NOW)).toThrow();
  });

  it('rejects non-integer count', () => {
    const r = makeRating();
    expect(() => r.updateCategory(VendorRatingCategoryVO.create('product_quality'), 4, 1.5, NOW)).toThrow();
  });

  it('rejects negative count', () => {
    const r = makeRating();
    expect(() => r.updateCategory(VendorRatingCategoryVO.create('product_quality'), 4, -1, NOW)).toThrow();
  });
});

describe('VendorRatingEntity — getCategoryScore', () => {
  it('returns undefined for missing category', () => {
    const r = makeRating();
    expect(r.getCategoryScore(VendorRatingCategoryVO.create('product_quality'))).toBeUndefined();
  });

  it('returns score for existing category', () => {
    const r = makeRating();
    const cat = VendorRatingCategoryVO.create('product_quality');
    r.updateCategory(cat, 4, 5, NOW);
    expect(r.getCategoryScore(cat)).toBe(4);
  });
});

describe('VendorRatingEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const r = reconstitute({ version: 4 });
    expect(r.version).toBe(4);
  });
});

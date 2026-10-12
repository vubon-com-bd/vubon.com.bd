/**
 * VendorReviewEntity — branch coverage
 * @module vendor-service/test/unit/domain/entities
 */
import { describe, it, expect } from '@jest/globals';

import { VendorReviewEntity } from '../../../../src/module/domain/entities/vendor-review.entity.js';
import { RatingScoreVO } from '../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VendorReviewStatusVO } from '../../../../src/module/domain/value-objects/primitives/vendor-review-status.vo.js';
import { VendorReviewCategoryVO } from '../../../../src/module/domain/value-objects/primitives/vendor-review-category.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const VENDOR = '22222222-2222-4222-8222-222222222222';
const USER = '33333333-3333-4333-8333-333333333333';
const ORDER = '44444444-4444-4444-8444-444444444444';
const NOW = '2025-01-01T00:00:00.000Z';

function makeReview(overrides: {
  rating?: number;
  comment?: string;
  categories?: Array<{ category: string; score: number }>;
  isVerifiedPurchase?: boolean;
} = {}) {
  return VendorReviewEntity.create({
    id: UUID,
    vendorId: VENDOR,
    userId: USER,
    orderId: ORDER,
    rating: RatingScoreVO.create(overrides.rating ?? 5),
    comment: overrides.comment,
    categories: (overrides.categories ?? []).map((c) => ({
      category: VendorReviewCategoryVO.create(c.category),
      score: c.score,
    })),
    isVerifiedPurchase: overrides.isVerifiedPurchase ?? false,
    now: NOW,
  });
}

function reconstitute(overrides: Record<string, unknown> = {}) {
  const { version, deletedAt, ...propsOverrides } = overrides as {
    version?: number;
    deletedAt?: string | null;
    [k: string]: unknown;
  };
  return VendorReviewEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: VENDOR,
      userId: USER,
      orderId: ORDER,
      rating: RatingScoreVO.create(5),
      status: VendorReviewStatusVO.pending(),
      categories: [],
      isVerifiedPurchase: false,
      flagCount: 0,
      createdAt: NOW,
      ...propsOverrides,
    } as never,
    ...(version !== undefined ? { version } : {}),
    ...(deletedAt !== undefined ? { deletedAt } : {}),
  });
}

describe('VendorReviewEntity — creation', () => {
  it('creates pending review', () => {
    const r = makeReview();
    expect(r.vendorId).toBe(VENDOR);
    expect(r.userId).toBe(USER);
    expect(r.orderId).toBe(ORDER);
    expect(r.rating.value).toBe(5);
    expect(r.status.isPending()).toBe(true);
  });

  it('creates with comment and categories', () => {
    const r = makeReview({
      comment: 'Great product and fast shipping',
      categories: [{ category: 'product_quality', score: 5 }],
    });
    expect(r.hasComment()).toBe(true);
    expect(r.categories.length).toBe(1);
  });
});

describe('VendorReviewEntity — invariants', () => {
  it('rejects comment < MIN_CONTENT_LENGTH', () => {
    expect(() => reconstitute({ comment: 'short' })).toThrow();
  });

  it('rejects comment > MAX_CONTENT_LENGTH', () => {
    expect(() => reconstitute({ comment: 'x'.repeat(6000) })).toThrow();
  });

  it('rejects > 20 categories', () => {
    expect(() =>
      reconstitute({
        categories: new Array(21).fill({
          category: VendorReviewCategoryVO.create('product_quality'),
          score: 4,
        }),
      }),
    ).toThrow();
  });

  it('rejects negative flagCount', () => {
    expect(() => reconstitute({ flagCount: -1 })).toThrow();
  });

  it('rejects non-integer flagCount', () => {
    expect(() => reconstitute({ flagCount: 1.5 })).toThrow();
  });
});

describe('VendorReviewEntity — getters', () => {
  it('returns scalar getters', () => {
    const r = makeReview();
    expect(r.vendorId).toBe(VENDOR);
    expect(r.userId).toBe(USER);
    expect(r.orderId).toBe(ORDER);
    expect(r.rating.value).toBe(5);
    expect(r.comment).toBeUndefined();
    expect(r.categories).toEqual([]);
    expect(r.isVerifiedPurchase).toBe(false);
    expect(r.flagCount).toBe(0);
  });
});

describe('VendorReviewEntity — predicates', () => {
  it('isApproved true for approved', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.approved() });
    expect(r.isApproved()).toBe(true);
  });

  it('isFlagged true for flagged', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.flagged() });
    expect(r.isFlagged()).toBe(true);
  });

  it('isHidden true for hidden', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.hidden() });
    expect(r.isHidden()).toBe(true);
  });

  it('isPubliclyVisible true only for approved', () => {
    expect(reconstitute({ status: VendorReviewStatusVO.approved() }).isPubliclyVisible()).toBe(true);
    expect(reconstitute({ status: VendorReviewStatusVO.pending() }).isPubliclyVisible()).toBe(false);
  });

  it('hasComment false when empty', () => {
    expect(makeReview().hasComment()).toBe(false);
  });

  it('hasComment true when comment exists', () => {
    const r = makeReview({ comment: 'Excellent product quality' });
    expect(r.hasComment()).toBe(true);
  });
});

describe('VendorReviewEntity — getCategoryScore', () => {
  it('returns undefined for missing category', () => {
    const r = makeReview();
    expect(r.getCategoryScore(VendorReviewCategoryVO.create('product_quality'))).toBeUndefined();
  });

  it('returns score for existing category', () => {
    const r = makeReview({
      categories: [{ category: 'product_quality', score: 5 }],
    });
    expect(r.getCategoryScore(VendorReviewCategoryVO.create('product_quality'))).toBe(5);
  });
});

describe('VendorReviewEntity — approve', () => {
  it('approves from pending', () => {
    const r = makeReview();
    r.approve(NOW);
    expect(r.status.isApproved()).toBe(true);
  });

  it('throws from invalid status', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.approved() });
    expect(() => r.approve(NOW)).toThrow();
  });
});

describe('VendorReviewEntity — reject', () => {
  it('rejects from pending', () => {
    const r = makeReview();
    r.reject('spam content', NOW);
    expect(r.status.isRejected()).toBe(true);
    expect(r.hiddenReason).toBe('spam content');
  });

  it('throws from invalid status', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.approved() });
    expect(() => r.reject('reason', NOW)).toThrow();
  });
});

describe('VendorReviewEntity — flag', () => {
  it('flags from pending (below threshold)', () => {
    const r = makeReview();
    r.flag('inappropriate', NOW);
    expect(r.status.isFlagged()).toBe(true);
    expect(r.flagCount).toBe(1);
  });

  it('flags from approved', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.approved() });
    r.flag('reason', NOW);
    expect(r.flagCount).toBe(1);
  });

  it('auto-hides when reaching FLAG_THRESHOLD', () => {
    // Start from approved (can transition to flagged) with flagCount just below threshold
    const r = reconstitute({
      status: VendorReviewStatusVO.approved(),
      flagCount: 2, // threshold = 3
    });
    r.flag('reason', NOW);
    // flagCount = 3 ≥ FLAG_THRESHOLD → auto-hidden
    expect(r.flagCount).toBe(3);
    expect(r.status.isHidden()).toBe(true);
  });

  it('throws from invalid status', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.hidden() });
    expect(() => r.flag('reason', NOW)).toThrow();
  });
});

describe('VendorReviewEntity — hide', () => {
  it('hides from approved', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.approved() });
    r.hide('policy violation', NOW);
    expect(r.status.isHidden()).toBe(true);
  });

  it('hides from flagged', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.flagged(), flagCount: 1 });
    r.hide('reason', NOW);
    expect(r.status.isHidden()).toBe(true);
  });

  it('throws from invalid status', () => {
    const r = makeReview(); // pending
    expect(() => r.hide('reason', NOW)).toThrow();
  });
});

describe('VendorReviewEntity — restore', () => {
  it('restores from hidden', () => {
    const r = reconstitute({ status: VendorReviewStatusVO.hidden() });
    r.restore(NOW);
    expect(r.status.isApproved()).toBe(true);
    expect(r.flagCount).toBe(0);
  });

  it('restores from flagged', () => {
    const r = reconstitute({
      status: VendorReviewStatusVO.flagged(),
      flagCount: 2,
    });
    r.restore(NOW);
    expect(r.status.isApproved()).toBe(true);
  });

  it('throws when not hidden/flagged', () => {
    const r = makeReview();
    expect(() => r.restore(NOW)).toThrow();
  });
});

describe('VendorReviewEntity — reconstitute version', () => {
  it('reconstitute with version', () => {
    const r = reconstitute({ version: 2 });
    expect(r.version).toBe(2);
  });
});

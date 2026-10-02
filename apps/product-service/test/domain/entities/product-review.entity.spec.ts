/**
 * ProductReviewEntity — unit tests
 */
import { ProductReviewEntity } from '../../../src/module/domain/entities/product-review.entity.js';
import { ReviewCommentVO } from '../../../src/module/domain/value-objects/primitives/review-comment.vo.js';
import { ReviewRatingVO } from '../../../src/module/domain/value-objects/primitives/review-rating.vo.js';
import { REVIEW_STATUS } from '@vubon/shared-constants/business/product';
import {
  ReviewSubmittedEvent, ReviewApprovedEvent, ReviewRejectedEvent,
  ReviewDeletedEvent, ReviewHelpfulMarkedEvent, ReviewReportedEvent,
} from '../../../src/module/domain/events/review.events.js';
import { buildReview } from '../../fixtures.js';
import { USER_ID, NOW, LATER } from '../../helpers.js';

describe('ProductReviewEntity', () => {
  describe('create()', () => {
    it('should emit ReviewSubmittedEvent', () => {
      const review = ProductReviewEntity.create({
        id: 'rev-x',
        now: NOW,
        props: {
          productId: buildReview().productId,
          userId: USER_ID,
          rating: ReviewRatingVO.create(5),
          comment: ReviewCommentVO.create('Great product with excellent quality'),
          images: [],
          status: REVIEW_STATUS.PENDING,
          isVerifiedPurchase: true,
          helpfulCount: 0,
          reportCount: 0,
          createdAt: NOW,
          updatedAt: NOW,
        },
      });
      const events = review.pullDomainEvents();
      expect(events[0]).toBeInstanceOf(ReviewSubmittedEvent);
    });
  });

  describe('approve()', () => {
    it('should set status to APPROVED and emit event', () => {
      const review = buildReview();
      review.pullDomainEvents();
      review.approve(USER_ID);
      expect(review.status).toBe(REVIEW_STATUS.APPROVED);
      expect(review.isApproved()).toBe(true);
      expect(review.pullDomainEvents()[0]).toBeInstanceOf(ReviewApprovedEvent);
    });

    it('should reject approving a deleted review', () => {
      const review = buildReview({ status: REVIEW_STATUS.DELETED });
      expect(() => review.approve(USER_ID)).toThrow(Error);
    });
  });

  describe('reject()', () => {
    it('should set status to REJECTED and emit event', () => {
      const review = buildReview();
      review.pullDomainEvents();
      review.reject(USER_ID, 'off-topic');
      expect(review.status).toBe(REVIEW_STATUS.REJECTED);
      expect(review.pullDomainEvents()[0]).toBeInstanceOf(ReviewRejectedEvent);
    });
  });

  describe('markAsSpam()', () => {
    it('should set status to SPAM', () => {
      const review = buildReview();
      review.markAsSpam(USER_ID);
      expect(review.status).toBe(REVIEW_STATUS.SPAM);
    });
  });

  describe('softDelete()', () => {
    it('should set status to DELETED and emit event', () => {
      const review = buildReview();
      review.pullDomainEvents();
      review.softDelete(USER_ID);
      expect(review.status).toBe(REVIEW_STATUS.DELETED);
      expect(review.pullDomainEvents()[0]).toBeInstanceOf(ReviewDeletedEvent);
    });
  });

  describe('markHelpful()', () => {
    it('should increment helpfulCount and emit event', () => {
      const review = buildReview();
      review.pullDomainEvents();
      review.markHelpful(USER_ID);
      expect(review.helpfulCount).toBe(1);
      expect(review.pullDomainEvents()[0]).toBeInstanceOf(ReviewHelpfulMarkedEvent);
    });

    it('should reject on deleted review', () => {
      const review = buildReview({ status: REVIEW_STATUS.DELETED });
      expect(() => review.markHelpful(USER_ID)).toThrow(Error);
    });
  });

  describe('report()', () => {
    it('should increment reportCount and emit event', () => {
      const review = buildReview();
      review.pullDomainEvents();
      review.report(USER_ID, 'spam');
      expect(review.reportCount).toBe(1);
      expect(review.pullDomainEvents()[0]).toBeInstanceOf(ReviewReportedEvent);
    });

    it('should reject empty reason', () => {
      const review = buildReview();
      expect(() => review.report(USER_ID, '')).toThrow(Error);
    });
  });

  describe('isEditable()', () => {
    it('returns true for pending review within window', () => {
      const review = buildReview({ createdAt: NOW, status: REVIEW_STATUS.PENDING });
      expect(review.isEditable(NOW)).toBe(true);
    });

    it('returns false for rejected review', () => {
      const review = buildReview({ status: REVIEW_STATUS.REJECTED });
      expect(review.isEditable(NOW)).toBe(false);
    });

    it('returns false after edit window expires', () => {
      const review = buildReview({ createdAt: NOW });
      const wayLater = new Date(new Date(NOW).getTime() + 48 * 3600 * 1000).toISOString();
      expect(review.isEditable(wayLater)).toBe(false);
    });
  });

  describe('isSpamSuspicious()', () => {
    it('false when reportCount below threshold', () => {
      const review = buildReview({ reportCount: 2 });
      expect(review.isSpamSuspicious()).toBe(false);
    });

    it('true when reportCount >= 5', () => {
      const review = buildReview({ reportCount: 5 });
      expect(review.isSpamSuspicious()).toBe(true);
    });
  });

  describe('isHighQuality()', () => {
    it('true when rating positive + long comment', () => {
      const review = buildReview({
        rating: ReviewRatingVO.create(5),
        comment: ReviewCommentVO.create('A'.repeat(150)),
      });
      expect(review.isHighQuality()).toBe(true);
    });

    it('false when rating negative', () => {
      const review = buildReview({
        rating: ReviewRatingVO.create(2),
        comment: ReviewCommentVO.create('A'.repeat(150)),
      });
      expect(review.isHighQuality()).toBe(false);
    });
  });

  describe('updateContent()', () => {
    it('should update rating within edit window', () => {
      const review = buildReview({ status: REVIEW_STATUS.PENDING });
      review.pullDomainEvents();
      review.updateContent({ rating: ReviewRatingVO.create(3), now: LATER });
      expect(review.rating.value).toBe(3);
    });

    it('should reject when edit window expired', () => {
      const oldCreated = new Date(new Date(NOW).getTime() - 48 * 3600 * 1000).toISOString();
      const review = ProductReviewEntity.reconstitute({
        id: 'revw-old',
        createdAt: oldCreated,
        updatedAt: oldCreated,
        props: {
          productId: buildReview().productId,
          userId: USER_ID,
          rating: ReviewRatingVO.create(5),
          comment: ReviewCommentVO.create('Old review with valid comment here'),
          images: [],
          status: REVIEW_STATUS.PENDING,
          isVerifiedPurchase: true,
          helpfulCount: 0,
          reportCount: 0,
          createdAt: oldCreated,
          updatedAt: oldCreated,
        },
      });
      expect(() =>
        review.updateContent({ rating: ReviewRatingVO.create(3), now: NOW }),
      ).toThrow(Error);
    });
  });
});

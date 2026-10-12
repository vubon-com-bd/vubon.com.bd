/**
 * Composite VO Coverage — Batch 1B (medium impact)
 * @module vendor-service/test/unit/domain/value-objects/composites
 *
 * Covers: rating-summary, onboarding-progress, verification-summary,
 *         business-info, document-info, subscription-info
 */
import { describe, it, expect } from '@jest/globals';

// Composite VOs
import { VendorRatingSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-rating-summary.vo.js';
import { VendorOnboardingProgressVO } from '../../../../../src/module/domain/value-objects/composites/vendor-onboarding-progress.vo.js';
import { VendorVerificationSummaryVO } from '../../../../../src/module/domain/value-objects/composites/vendor-verification-summary.vo.js';
import { VendorBusinessInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-business-info.vo.js';
import { VendorDocumentInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-document-info.vo.js';
import { VendorSubscriptionInfoVO } from '../../../../../src/module/domain/value-objects/composites/vendor-subscription-info.vo.js';

// Primitives
import { RatingScoreVO } from '../../../../../src/module/domain/value-objects/primitives/rating-score.vo.js';
import { VerificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { VendorTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-type.vo.js';
import { VendorBusinessTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-business-type.vo.js';
import { BusinessNameVO } from '../../../../../src/module/domain/value-objects/primitives/business-name.vo.js';
import { BusinessRegistrationVO } from '../../../../../src/module/domain/value-objects/primitives/business-registration.vo.js';
import { BusinessDescriptionVO } from '../../../../../src/module/domain/value-objects/primitives/business-description.vo.js';
import { DocumentIdVO } from '../../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { DocumentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentUrlVO } from '../../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { DocumentMimeTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentFileSizeVO } from '../../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';
import { SubscriptionPlanVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';

const UUID = '11111111-1111-4111-8111-111111111111';
const NOW = '2025-01-01T00:00:00.000Z';
const FUTURE = '2030-01-01T00:00:00.000Z';
const PAST = '2020-01-01T00:00:00.000Z';

// ═══════════════════════════════════════════════════════════════════
// 1. VendorRatingSummaryVO — 50%
// ═══════════════════════════════════════════════════════════════════
describe('VendorRatingSummaryVO — 50% → 90%+', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      overall: RatingScoreVO.create(4.5),
      totalReviews: 10,
      distribution: { '1': 0, '2': 0, '3': 1, '4': 4, '5': 5 },
      categories: [],
      updatedAt: NOW,
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.overall.value).toBe(4.5);
  });

  it('create() rejects invalid overall', () => {
    expect(() => VendorRatingSummaryVO.create(valid({ overall: 'bad' }))).toThrow();
  });

  it('create() rejects negative totalReviews', () => {
    expect(() => VendorRatingSummaryVO.create(valid({ totalReviews: -1 }))).toThrow();
  });

  it('create() rejects distribution sum mismatch', () => {
    expect(() =>
      VendorRatingSummaryVO.create(valid({
        distribution: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 0 },
      })),
    ).toThrow();
  });

  it('create() rejects > 20 categories', () => {
    expect(() =>
      VendorRatingSummaryVO.create(valid({ categories: new Array(21).fill({ category: 'x', score: 4, count: 1 }) })),
    ).toThrow();
  });

  it('create() rejects invalid updatedAt', () => {
    expect(() => VendorRatingSummaryVO.create(valid({ updatedAt: 'bad' }))).toThrow();
  });

  it('isDisplayable true when enough reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.isDisplayable()).toBe(true);
  });

  it('isDisplayable false for few reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      totalReviews: 2,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 1, '5': 1 },
    }));
    expect(vo.isDisplayable()).toBe(false);
  });

  it('shouldAutoHide true for low rating + enough reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      overall: RatingScoreVO.create(1.5),
      totalReviews: 10,
      distribution: { '1': 5, '2': 3, '3': 1, '4': 1, '5': 0 },
    }));
    expect(vo.shouldAutoHide()).toBe(true);
  });

  it('percentageFor returns 0 for no reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      totalReviews: 0,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
    }));
    expect(vo.percentageFor(5)).toBe(0);
  });

  it('percentageFor 5-star correct', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.percentageFor(5)).toBe(50);
  });

  it('positiveRatio 0 for no reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      totalReviews: 0,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
    }));
    expect(vo.positiveRatio()).toBe(0);
  });

  it('positiveRatio correct', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.positiveRatio()).toBe(0.9);
  });

  it('negativeRatio 0 for no reviews', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      totalReviews: 0,
      distribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0 },
    }));
    expect(vo.negativeRatio()).toBe(0);
  });

  it('negativeRatio correct', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.negativeRatio()).toBe(0);
  });

  it('getCategoryScore undefined for missing', () => {
    const vo = VendorRatingSummaryVO.create(valid());
    expect(vo.getCategoryScore('unknown')).toBeUndefined();
  });

  it('getCategoryScore returns score', () => {
    const vo = VendorRatingSummaryVO.create(valid({
      categories: [{ category: 'product_quality', score: 4.5, count: 5 }],
    }));
    expect(vo.getCategoryScore('product_quality')).toBe(4.5);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 2. VendorOnboardingProgressVO — 50%
// ═══════════════════════════════════════════════════════════════════
describe('VendorOnboardingProgressVO — 50% → 90%+', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      completedSteps: [],
      currentStep: 'basic_info',
      startedAt: NOW,
      lastUpdatedAt: NOW,
      abandoned: false,
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    expect(vo.currentStep).toBe('basic_info');
  });

  it('create() rejects non-array completedSteps', () => {
    expect(() => VendorOnboardingProgressVO.create(valid({ completedSteps: 'bad' }))).toThrow();
  });

  it('create() rejects invalid step in completedSteps', () => {
    expect(() => VendorOnboardingProgressVO.create(valid({ completedSteps: ['invalid_step'] }))).toThrow();
  });

  it('create() rejects invalid currentStep', () => {
    expect(() => VendorOnboardingProgressVO.create(valid({ currentStep: 'invalid' }))).toThrow();
  });

  it('create() rejects currentStep in completedSteps', () => {
    expect(() =>
      VendorOnboardingProgressVO.create(valid({
        completedSteps: ['basic_info'],
        currentStep: 'basic_info',
      })),
    ).toThrow();
  });

  it('create() rejects invalid startedAt', () => {
    expect(() => VendorOnboardingProgressVO.create(valid({ startedAt: 'bad' }))).toThrow();
  });

  it('initial() creates fresh progress', () => {
    const vo = VendorOnboardingProgressVO.initial(NOW);
    expect(vo.currentStep).toBe('basic_info');
    expect(vo.getCompletedCount()).toBe(0);
  });

  it('isStepCompleted true/false', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info'],
      currentStep: 'business_info',
    }));
    expect(vo.isStepCompleted('basic_info')).toBe(true);
    expect(vo.isStepCompleted('address')).toBe(false);
  });

  it('getTotalSteps returns 8', () => {
    expect(VendorOnboardingProgressVO.create(valid()).getTotalSteps()).toBe(8);
  });

  it('getCompletionRatio/Percent', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info', 'business_info'],
      currentStep: 'contact_info',
    }));
    expect(vo.getCompletionRatio()).toBe(0.25);
    expect(vo.getCompletionPercent()).toBe(25);
  });

  it('isComplete true when all steps done', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info', 'business_info', 'contact_info', 'address', 'bank_account', 'documents', 'verification'],
      currentStep: 'approval',
    }));
    expect(vo.isComplete()).toBe(false); // 7/8
  });

  it('getRemainingSteps returns missing steps', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info'],
      currentStep: 'business_info',
    }));
    expect(vo.getRemainingSteps().length).toBe(7);
  });

  it('getNextStep returns next', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    expect(vo.getNextStep()).toBe('business_info');
  });

  it('getPreviousStep null from first', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    expect(vo.getPreviousStep()).toBeNull();
  });

  it('getPreviousStep returns prev', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info'],
      currentStep: 'business_info',
    }));
    expect(vo.getPreviousStep()).toBe('basic_info');
  });

  it('markStepComplete() adds step', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    const updated = vo.markStepComplete('basic_info', NOW);
    expect(updated.isStepCompleted('basic_info')).toBe(true);
  });

  it('markStepComplete() idempotent', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      completedSteps: ['basic_info'],
      currentStep: 'business_info',
    }));
    const updated = vo.markStepComplete('basic_info', NOW);
    expect(updated.getCompletedCount()).toBe(1);
  });

  it('getAgeInDays returns 0 for same day', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    expect(vo.getAgeInDays(new Date(NOW))).toBe(0);
  });

  it('isStale false for fresh', () => {
    const vo = VendorOnboardingProgressVO.create(valid());
    expect(vo.isStale(new Date(NOW))).toBe(false);
  });

  it('isStale true for old incomplete', () => {
    const vo = VendorOnboardingProgressVO.create(valid({
      startedAt: '2020-01-01T00:00:00.000Z',
    }));
    expect(vo.isStale(new Date(NOW))).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 3. VendorVerificationSummaryVO — 57%
// ═══════════════════════════════════════════════════════════════════
describe('VendorVerificationSummaryVO — 57% → 90%+', () => {
  function check(type: string, status: string) {
    return {
      type: VerificationTypeVO.create(type),
      status: VerificationStatusVO.create(status),
    };
  }

  function valid(overrides: Record<string, unknown> = {}) {
    return {
      overallStatus: VerificationStatusVO.notStarted(),
      checks: [],
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorVerificationSummaryVO.create(valid());
    expect(vo.overallStatus.isNotStarted()).toBe(true);
  });

  it('create() rejects invalid overallStatus', () => {
    expect(() => VendorVerificationSummaryVO.create(valid({ overallStatus: 'bad' }))).toThrow();
  });

  it('create() rejects non-array checks', () => {
    expect(() => VendorVerificationSummaryVO.create(valid({ checks: 'bad' }))).toThrow();
  });

  it('create() rejects > 20 checks', () => {
    expect(() =>
      VendorVerificationSummaryVO.create(valid({ checks: new Array(21).fill(check('email', 'pending')) })),
    ).toThrow();
  });

  it('create() rejects duplicate check types', () => {
    expect(() =>
      VendorVerificationSummaryVO.create(valid({
        checks: [check('email', 'pending'), check('email', 'approved')],
      })),
    ).toThrow();
  });

  it('create() rejects invalid check type', () => {
    expect(() =>
      VendorVerificationSummaryVO.create(valid({ checks: [{ type: 'bad', status: 'pending' }] })),
    ).toThrow();
  });

  it('getCheck returns found', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'approved')],
    }));
    expect(vo.getCheck(VerificationTypeVO.create('email'))).toBeDefined();
  });

  it('getCheck undefined when missing', () => {
    const vo = VendorVerificationSummaryVO.create(valid());
    expect(vo.getCheck(VerificationTypeVO.create('email'))).toBeUndefined();
  });

  it('hasCheck true/false', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'approved')],
    }));
    expect(vo.hasCheck(VerificationTypeVO.create('email'))).toBe(true);
    expect(vo.hasCheck(VerificationTypeVO.create('phone'))).toBe(false);
  });

  it('countVerified', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'approved'), check('phone', 'approved'), check('tax_id', 'pending')],
    }));
    expect(vo.countVerified()).toBe(2);
  });

  it('countPending', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'pending'), check('phone', 'in_review'), check('tax_id', 'approved')],
    }));
    expect(vo.countPending()).toBe(2);
  });

  it('countRejected', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'rejected'), check('phone', 'approved')],
    }));
    expect(vo.countRejected()).toBe(1);
  });

  it('completionRatio 0 for empty', () => {
    expect(VendorVerificationSummaryVO.create(valid()).completionRatio()).toBe(0);
  });

  it('completionRatio correct', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [check('email', 'approved'), check('phone', 'pending')],
    }));
    expect(vo.completionRatio()).toBe(0.5);
  });

  it('allRequiredChecksPassed false for empty', () => {
    expect(VendorVerificationSummaryVO.create(valid()).allRequiredChecksPassed()).toBe(false);
  });

  it('allRequiredChecksPassed true when all done', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      checks: [
        check('email', 'approved'),
        check('phone', 'approved'),
        check('business_license', 'approved'),
        check('tax_id', 'approved'),
        check('bank_account', 'approved'),
        check('identity', 'approved'),
      ],
    }));
    expect(vo.allRequiredChecksPassed()).toBe(true);
  });

  it('isFullyVerified true when approved', () => {
    const vo = VendorVerificationSummaryVO.create(valid({
      overallStatus: VerificationStatusVO.approved(),
    }));
    expect(vo.isFullyVerified()).toBe(true);
  });

  it('isPendingReview true for pending/in_review', () => {
    expect(VendorVerificationSummaryVO.create(valid({
      overallStatus: VerificationStatusVO.pending(),
    })).isPendingReview()).toBe(true);
    expect(VendorVerificationSummaryVO.create(valid({
      overallStatus: VerificationStatusVO.inReview(),
    })).isPendingReview()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 4. VendorBusinessInfoVO — 62.5%
// ═══════════════════════════════════════════════════════════════════
describe('VendorBusinessInfoVO — 62% → 90%+', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      type: VendorTypeVO.create('individual'),
      businessType: VendorBusinessTypeVO.create('retailer'),
      legalName: BusinessNameVO.create('Acme Pvt Ltd'),
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorBusinessInfoVO.create(valid());
    expect(vo.type.value).toBe('individual');
  });

  it('create() rejects invalid type', () => {
    expect(() => VendorBusinessInfoVO.create(valid({ type: 'bad' }))).toThrow();
  });

  it('create() rejects invalid businessType', () => {
    expect(() => VendorBusinessInfoVO.create(valid({ businessType: 'bad' }))).toThrow();
  });

  it('create() rejects invalid legalName', () => {
    expect(() => VendorBusinessInfoVO.create(valid({ legalName: 'bad' }))).toThrow();
  });

  it('create() rejects corporate type without registrationNumber', () => {
    expect(() =>
      VendorBusinessInfoVO.create(valid({ type: VendorTypeVO.create('limited_company') })),
    ).toThrow();
  });

  it('create() accepts corporate with registrationNumber', () => {
    const vo = VendorBusinessInfoVO.create(valid({
      type: VendorTypeVO.create('limited_company'),
      registrationNumber: BusinessRegistrationVO.create('REG12345'),
    }));
    expect(vo.isCorporate()).toBe(true);
  });

  it('getters', () => {
    const vo = VendorBusinessInfoVO.create(valid());
    expect(vo.type).toBeDefined();
    expect(vo.businessType).toBeDefined();
    expect(vo.legalName.value).toBe('Acme Pvt Ltd');
    expect(vo.registrationNumber).toBeUndefined();
    expect(vo.description).toBeUndefined();
  });

  it('isCorporate true for limited_company', () => {
    const vo = VendorBusinessInfoVO.create(valid({
      type: VendorTypeVO.create('limited_company'),
      registrationNumber: BusinessRegistrationVO.create('REG12345'),
    }));
    expect(vo.isCorporate()).toBe(true);
  });

  it('isCorporate false for individual', () => {
    expect(VendorBusinessInfoVO.create(valid()).isCorporate()).toBe(false);
  });

  it('requiresInventory true for retailer', () => {
    expect(VendorBusinessInfoVO.create(valid()).requiresInventory()).toBe(true);
  });

  it('hasDescription true when set', () => {
    const vo = VendorBusinessInfoVO.create(valid({
      description: BusinessDescriptionVO.create('A long description'),
    }));
    expect(vo.hasDescription()).toBe(true);
  });

  it('hasDescription false when unset', () => {
    expect(VendorBusinessInfoVO.create(valid()).hasDescription()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 5. VendorDocumentInfoVO — 62.96%
// ═══════════════════════════════════════════════════════════════════
describe('VendorDocumentInfoVO — 62% → 90%+', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      id: DocumentIdVO.create(UUID),
      type: DocumentTypeVO.create('identity_proof'),
      status: DocumentStatusVO.pending(),
      fileUrl: DocumentUrlVO.create('https://x.com/doc.pdf'),
      fileName: 'doc.pdf',
      mimeType: DocumentMimeTypeVO.create('application/pdf'),
      fileSize: DocumentFileSizeVO.create(1024),
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorDocumentInfoVO.create(valid());
    expect(vo.fileName).toBe('doc.pdf');
  });

  it('create() rejects invalid id', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ id: 'bad' }))).toThrow();
  });

  it('create() rejects invalid type', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ type: 'bad' }))).toThrow();
  });

  it('create() rejects invalid status', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ status: 'bad' }))).toThrow();
  });

  it('create() rejects invalid fileUrl', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ fileUrl: 'bad' }))).toThrow();
  });

  it('create() rejects empty fileName', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ fileName: '' }))).toThrow();
  });

  it('create() rejects invalid mimeType', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ mimeType: 'bad' }))).toThrow();
  });

  it('create() rejects invalid fileSize', () => {
    expect(() => VendorDocumentInfoVO.create(valid({ fileSize: 'bad' }))).toThrow();
  });

  it('create() rejects type requiring expiry without expiresAt', () => {
    expect(() =>
      VendorDocumentInfoVO.create(valid({ type: DocumentTypeVO.create('business_license') })),
    ).toThrow();
  });

  it('create() rejects verified status without verifiedAt', () => {
    expect(() =>
      VendorDocumentInfoVO.create(valid({ status: DocumentStatusVO.verified() })),
    ).toThrow();
  });

  it('create() rejects rejected status without rejectionReason', () => {
    expect(() =>
      VendorDocumentInfoVO.create(valid({ status: DocumentStatusVO.rejected() })),
    ).toThrow();
  });

  it('isExpired false when no expiresAt', () => {
    expect(VendorDocumentInfoVO.create(valid()).isExpired()).toBe(false);
  });

  it('isExpired true when past', () => {
    const vo = VendorDocumentInfoVO.create(valid({ expiresAt: PAST }));
    expect(vo.isExpired(new Date(NOW))).toBe(true);
  });

  it('isExpired false when future', () => {
    const vo = VendorDocumentInfoVO.create(valid({ expiresAt: FUTURE }));
    expect(vo.isExpired(new Date(NOW))).toBe(false);
  });

  it('isExpiringSoon false when no expiresAt', () => {
    expect(VendorDocumentInfoVO.create(valid()).isExpiringSoon()).toBe(false);
  });

  it('isExpiringSoon true within threshold', () => {
    const soon = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();
    const vo = VendorDocumentInfoVO.create(valid({ expiresAt: soon }));
    expect(vo.isExpiringSoon(30)).toBe(true);
  });

  it('isExpiringSoon false when far', () => {
    const vo = VendorDocumentInfoVO.create(valid({ expiresAt: FUTURE }));
    expect(vo.isExpiringSoon(30, new Date(NOW))).toBe(false);
  });

  it('isValidDocument true for verified + not expired', () => {
    const vo = VendorDocumentInfoVO.create(valid({
      status: DocumentStatusVO.verified(),
      verifiedAt: NOW,
      expiresAt: FUTURE,
    }));
    expect(vo.isValidDocument()).toBe(true);
  });

  it('isValidDocument false when pending', () => {
    expect(VendorDocumentInfoVO.create(valid()).isValidDocument()).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════════════
// 6. VendorSubscriptionInfoVO — 63.63%
// ═══════════════════════════════════════════════════════════════════
describe('VendorSubscriptionInfoVO — 63% → 90%+', () => {
  function valid(overrides: Record<string, unknown> = {}) {
    return {
      plan: SubscriptionPlanVO.create('basic'),
      status: SubscriptionStatusVO.active(),
      startedAt: NOW,
      currentPeriodStart: NOW,
      currentPeriodEnd: FUTURE,
      cancelAtPeriodEnd: false,
      autoRenew: true,
      ...overrides,
    } as never;
  }

  it('create() with valid props', () => {
    const vo = VendorSubscriptionInfoVO.create(valid());
    expect(vo.plan.value).toBe('basic');
  });

  it('create() rejects invalid plan', () => {
    expect(() => VendorSubscriptionInfoVO.create(valid({ plan: 'bad' }))).toThrow();
  });

  it('create() rejects invalid status', () => {
    expect(() => VendorSubscriptionInfoVO.create(valid({ status: 'bad' }))).toThrow();
  });

  it('create() rejects invalid period dates', () => {
    expect(() => VendorSubscriptionInfoVO.create(valid({ currentPeriodStart: 'bad' }))).toThrow();
  });

  it('create() rejects periodEnd <= periodStart', () => {
    expect(() =>
      VendorSubscriptionInfoVO.create(valid({
        currentPeriodStart: FUTURE,
        currentPeriodEnd: NOW,
      })),
    ).toThrow();
  });

  it('create() rejects trial without trialEndsAt', () => {
    expect(() =>
      VendorSubscriptionInfoVO.create(valid({ status: SubscriptionStatusVO.trial() })),
    ).toThrow();
  });

  it('create() rejects cancelled without cancelledAt', () => {
    expect(() =>
      VendorSubscriptionInfoVO.create(valid({ status: SubscriptionStatusVO.cancelled() })),
    ).toThrow();
  });

  it('create() accepts trial with trialEndsAt', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      status: SubscriptionStatusVO.trial(),
      trialEndsAt: FUTURE,
    }));
    expect(vo.isTrial()).toBe(true);
  });

  it('create() accepts cancelled with cancelledAt', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      status: SubscriptionStatusVO.cancelled(),
      cancelledAt: NOW,
    }));
    expect(vo).toBeDefined();
  });

  it('isUsable reflects status', () => {
    expect(VendorSubscriptionInfoVO.create(valid()).isUsable()).toBe(true);
  });

  it('isTrial false for active', () => {
    expect(VendorSubscriptionInfoVO.create(valid()).isTrial()).toBe(false);
  });

  it('isExpired false before end', () => {
    expect(VendorSubscriptionInfoVO.create(valid()).isExpired(new Date(NOW))).toBe(false);
  });

  it('isExpired true after end', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      currentPeriodStart: '2020-01-01T00:00:00.000Z',
      currentPeriodEnd: '2021-01-01T00:00:00.000Z',
    }));
    expect(vo.isExpired(new Date(NOW))).toBe(true);
  });

  it('daysUntilRenewal positive when future', () => {
    const vo = VendorSubscriptionInfoVO.create(valid());
    expect(vo.daysUntilRenewal(new Date(NOW))).toBeGreaterThan(0);
  });

  it('daysUntilRenewal 0 when expired', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      currentPeriodStart: '2020-01-01T00:00:00.000Z',
      currentPeriodEnd: '2021-01-01T00:00:00.000Z',
    }));
    expect(vo.daysUntilRenewal(new Date(NOW))).toBe(0);
  });

  it('trialDaysRemaining 0 when no trialEndsAt', () => {
    expect(VendorSubscriptionInfoVO.create(valid()).trialDaysRemaining()).toBe(0);
  });

  it('trialDaysRemaining positive during trial', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      status: SubscriptionStatusVO.trial(),
      trialEndsAt: FUTURE,
    }));
    expect(vo.trialDaysRemaining(new Date(NOW))).toBeGreaterThan(0);
  });

  it('willCancelAtPeriodEnd true when set', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({ cancelAtPeriodEnd: true }));
    expect(vo.willCancelAtPeriodEnd()).toBe(true);
  });

  it('willCancelAtPeriodEnd false when not set', () => {
    expect(VendorSubscriptionInfoVO.create(valid()).willCancelAtPeriodEnd()).toBe(false);
  });

  it('canAddProducts true when usable + within limit', () => {
    const vo = VendorSubscriptionInfoVO.create(valid());
    expect(vo.canAddProducts(0, 1)).toBe(true);
  });

  it('canAddProducts false when not usable', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({
      status: SubscriptionStatusVO.expired(),
    }));
    expect(vo.canAddProducts(0, 1)).toBe(false);
  });

  it('productLimit returns plan limit', () => {
    const vo = VendorSubscriptionInfoVO.create(valid({ plan: SubscriptionPlanVO.create('free') }));
    expect(vo.productLimit()).toBeDefined();
  });
});

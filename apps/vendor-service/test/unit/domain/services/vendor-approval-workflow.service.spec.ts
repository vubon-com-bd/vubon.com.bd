import { VendorApprovalWorkflowService } from '../../../../src/module/domain/services/vendor-approval-workflow.service.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVerification(checks: Array<{ type: string; status: string }> = []): VendorVerificationEntity {
  return VendorVerificationEntity.reconstitute({
    id: UUID, createdAt: NOW, updatedAt: NOW,
    props: {
      vendorId: UUID,
      overallStatus: VerificationStatusVO.pending(),
      checks: checks.map((c) => ({
        type: VerificationTypeVO.create(c.type),
        status: VerificationStatusVO.create(c.status),
      })),
    },
  });
}

function allApproved() {
  return [
    { type: 'email', status: 'approved' },
    { type: 'phone', status: 'approved' },
    { type: 'business_license', status: 'approved' },
    { type: 'tax_id', status: 'approved' },
    { type: 'bank_account', status: 'approved' },
    { type: 'identity', status: 'approved' },
  ];
}

describe('VendorApprovalWorkflowService', () => {
  describe('computeSlaDeadline / isSlaBreached / hoursRemaining', () => {
    it('computeSlaDeadline returns future date', () => {
      const d = VendorApprovalWorkflowService.computeSlaDeadline(NOW);
      expect(d.getTime()).toBeGreaterThan(Date.parse(NOW));
    });

    it('isSlaBreached false fresh', () => {
      expect(VendorApprovalWorkflowService.isSlaBreached(NOW, new Date('2026-01-01T01:00:00Z'))).toBe(false);
    });

    it('isSlaBreached true after window', () => {
      expect(VendorApprovalWorkflowService.isSlaBreached(NOW, new Date('2026-03-01T00:00:00Z'))).toBe(true);
    });

    it('hoursRemaining > 0 fresh', () => {
      expect(VendorApprovalWorkflowService.hoursRemaining(NOW, new Date(NOW))).toBeGreaterThan(0);
    });

    it('hoursRemaining 0 after SLA', () => {
      expect(VendorApprovalWorkflowService.hoursRemaining(NOW, new Date('2026-03-01T00:00:00Z'))).toBe(0);
    });
  });

  describe('checkEligibility', () => {
    it('canSubmit true when all satisfied', () => {
      const r = VendorApprovalWorkflowService.checkEligibility({
        verification: makeVerification(allApproved()),
        hasContactInfo: true,
        hasLocation: true,
        hasBankAccount: true,
        hasRequiredDocuments: true,
      });
      expect(r.canSubmit).toBe(true);
      expect(r.blockers).toHaveLength(0);
    });

    it('lists blockers when missing', () => {
      const r = VendorApprovalWorkflowService.checkEligibility({
        verification: makeVerification([]),
        hasContactInfo: false,
        hasLocation: false,
        hasBankAccount: false,
        hasRequiredDocuments: false,
      });
      expect(r.canSubmit).toBe(false);
      expect(r.blockers.length).toBeGreaterThanOrEqual(4);
    });
  });

  describe('shouldAutoApprove', () => {
    it('true for high score without flags', () => {
      expect(VendorApprovalWorkflowService.shouldAutoApprove({
        verificationScore: 95, hasFraudFlags: false, isDuplicate: false,
      })).toBe(true);
    });

    it('false with fraud flags', () => {
      expect(VendorApprovalWorkflowService.shouldAutoApprove({
        verificationScore: 95, hasFraudFlags: true, isDuplicate: false,
      })).toBe(false);
    });

    it('false when duplicate', () => {
      expect(VendorApprovalWorkflowService.shouldAutoApprove({
        verificationScore: 95, hasFraudFlags: false, isDuplicate: true,
      })).toBe(false);
    });

    it('false for low score', () => {
      expect(VendorApprovalWorkflowService.shouldAutoApprove({
        verificationScore: 50, hasFraudFlags: false, isDuplicate: false,
      })).toBe(false);
    });
  });

  describe('decide', () => {
    it('rejects on fraud', () => {
      const r = VendorApprovalWorkflowService.decide({
        verified: true, documentsValid: true,
        hasFraudFlags: true, isDuplicate: false, autoApproved: false,
      });
      expect(r.status.isRejected()).toBe(true);
      expect(r.reason?.value).toBe('fraud_suspected');
    });

    it('rejects on duplicate', () => {
      const r = VendorApprovalWorkflowService.decide({
        verified: true, documentsValid: true,
        hasFraudFlags: false, isDuplicate: true, autoApproved: false,
      });
      expect(r.status.isRejected()).toBe(true);
      expect(r.reason?.value).toBe('duplicate_account');
    });

    it('info_requested when unverified', () => {
      const r = VendorApprovalWorkflowService.decide({
        verified: false, documentsValid: true,
        hasFraudFlags: false, isDuplicate: false, autoApproved: false,
      });
      expect(r.status.isInfoRequested()).toBe(true);
    });

    it('info_requested when documents invalid', () => {
      const r = VendorApprovalWorkflowService.decide({
        verified: true, documentsValid: false,
        hasFraudFlags: false, isDuplicate: false, autoApproved: false,
      });
      expect(r.status.isInfoRequested()).toBe(true);
    });

    it('approves when all good', () => {
      const r = VendorApprovalWorkflowService.decide({
        verified: true, documentsValid: true,
        hasFraudFlags: false, isDuplicate: false, autoApproved: true,
      });
      expect(r.status.isApproved()).toBe(true);
      expect(r.autoApproved).toBe(true);
    });
  });

  describe('computeAppealDeadline / canAppeal / canResubmit', () => {
    it('computeAppealDeadline returns future date', () => {
      const d = VendorApprovalWorkflowService.computeAppealDeadline(NOW);
      expect(d.getTime()).toBeGreaterThan(Date.parse(NOW));
    });

    it('canAppeal true within window', () => {
      expect(VendorApprovalWorkflowService.canAppeal(NOW, new Date('2026-01-05T00:00:00Z'))).toBe(true);
    });

    it('canAppeal false after window', () => {
      expect(VendorApprovalWorkflowService.canAppeal(NOW, new Date('2026-06-01T00:00:00Z'))).toBe(false);
    });

    it('canResubmit true below limit', () => {
      expect(VendorApprovalWorkflowService.canResubmit(1)).toBe(true);
    });

    it('canResubmit false at limit', () => {
      expect(VendorApprovalWorkflowService.canResubmit(999)).toBe(false);
    });
  });

  describe('suggestReason', () => {
    it('invalid_documents', () => {
      expect(VendorApprovalWorkflowService.suggestReason({
        verificationFailed: false, missingDocuments: false, invalidDocuments: true,
      }).value).toBe('invalid_documents');
    });

    it('incomplete_documents', () => {
      expect(VendorApprovalWorkflowService.suggestReason({
        verificationFailed: false, missingDocuments: true, invalidDocuments: false,
      }).value).toBe('incomplete_documents');
    });

    it('policy_violation', () => {
      expect(VendorApprovalWorkflowService.suggestReason({
        verificationFailed: true, missingDocuments: false, invalidDocuments: false,
      }).value).toBe('policy_violation');
    });

    it('complete', () => {
      expect(VendorApprovalWorkflowService.suggestReason({
        verificationFailed: false, missingDocuments: false, invalidDocuments: false,
      }).value).toBe('complete');
    });
  });

  describe('estimateReviewHours', () => {
    it('fast for high score', () => {
      const fast = VendorApprovalWorkflowService.estimateReviewHours(100, 0);
      const slow = VendorApprovalWorkflowService.estimateReviewHours(0, 20);
      expect(fast).toBeLessThan(slow);
    });

    it('throws on negative score', () => {
      expect(() => VendorApprovalWorkflowService.estimateReviewHours(-1, 5)).toThrow(ValidationError);
    });

    it('throws on score above 100', () => {
      expect(() => VendorApprovalWorkflowService.estimateReviewHours(101, 5)).toThrow(ValidationError);
    });
  });
});

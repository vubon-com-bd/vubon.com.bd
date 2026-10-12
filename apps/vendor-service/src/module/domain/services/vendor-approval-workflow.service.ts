/**
 * VendorApprovalWorkflowService
 * @module vendor-service/domain/services
 *
 * Pure workflow rules for the approval process:
 *  - Decide if auto-approval applies
 *  - Compute SLA deadlines & breaches
 *  - Suggest reasons from check results
 */
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ApprovalStatusVO } from '../value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../value-objects/primitives/approval-reason.vo.js';
import { VendorVerificationEntity } from '../entities/vendor-verification.entity.js';
import { VENDOR_APPROVAL } from '@vubon/shared-constants/business';

export interface ApprovalDecision {
  readonly status: ApprovalStatusVO;
  readonly reason?: ApprovalReasonVO;
  readonly autoApproved: boolean;
  readonly note?: string;
}

export interface ApprovalEligibility {
  readonly canSubmit: boolean;
  readonly blockers: readonly string[];
}

export class VendorApprovalWorkflowService {
  /** SLA deadline from submission timestamp. */
  static computeSlaDeadline(submittedAt: string): Date {
    return new Date(Date.parse(submittedAt) + VENDOR_APPROVAL.REVIEW_SLA_HOURS * 60 * 60 * 1000);
  }

  /** Is the approval past review SLA? */
  static isSlaBreached(submittedAt: string, at: Date = new Date()): boolean {
    return at.getTime() > VendorApprovalWorkflowService.computeSlaDeadline(submittedAt).getTime();
  }

  /** Hours remaining until SLA deadline (0 if breached). */
  static hoursRemaining(submittedAt: string, at: Date = new Date()): number {
    const deadline = VendorApprovalWorkflowService.computeSlaDeadline(submittedAt).getTime();
    const diff = deadline - at.getTime();
    return diff <= 0 ? 0 : Math.floor(diff / (60 * 60 * 1000));
  }

  /**
   * Check if a vendor's submission is eligible for approval.
   */
  static checkEligibility(params: {
    verification: VendorVerificationEntity;
    hasContactInfo: boolean;
    hasLocation: boolean;
    hasBankAccount: boolean;
    hasRequiredDocuments: boolean;
  }): ApprovalEligibility {
    const blockers: string[] = [];
    if (!params.verification.hasAllRequiredChecks()) {
      blockers.push('verification_incomplete');
    }
    if (!params.hasContactInfo) blockers.push('missing_contact_info');
    if (!params.hasLocation) blockers.push('missing_location');
    if (!params.hasBankAccount) blockers.push('missing_bank_account');
    if (!params.hasRequiredDocuments) blockers.push('missing_required_documents');
    return { canSubmit: blockers.length === 0, blockers };
  }

  /**
   * Auto-approval: if verification score >= AUTO_APPROVE_THRESHOLD,
   * skip manual review (unless flagged).
   */
  static shouldAutoApprove(params: {
    verificationScore: number;
    hasFraudFlags: boolean;
    isDuplicate: boolean;
  }): boolean {
    if (params.hasFraudFlags || params.isDuplicate) return false;
    return params.verificationScore >= VENDOR_APPROVAL.AUTO_APPROVE_THRESHOLD;
  }

  /**
   * Full decision: status + reason based on the outcome.
   */
  static decide(params: {
    verified: boolean;
    documentsValid: boolean;
    hasFraudFlags: boolean;
    isDuplicate: boolean;
    autoApproved: boolean;
    note?: string;
  }): ApprovalDecision {
    if (params.hasFraudFlags) {
      return {
        status: ApprovalStatusVO.rejected(),
        reason: ApprovalReasonVO.reconstitute('fraud_suspected'),
        autoApproved: false,
        note: params.note ?? 'Fraud signals detected',
      };
    }
    if (params.isDuplicate) {
      return {
        status: ApprovalStatusVO.rejected(),
        reason: ApprovalReasonVO.reconstitute('duplicate_account'),
        autoApproved: false,
        note: params.note ?? 'Duplicate account detected',
      };
    }
    if (!params.verified) {
      return {
        status: ApprovalStatusVO.infoRequested(),
        reason: ApprovalReasonVO.reconstitute('incomplete_documents'),
        autoApproved: false,
        note: params.note ?? 'Verification not complete',
      };
    }
    if (!params.documentsValid) {
      return {
        status: ApprovalStatusVO.infoRequested(),
        reason: ApprovalReasonVO.reconstitute('invalid_documents'),
        autoApproved: false,
        note: params.note ?? 'Some documents are invalid or expired',
      };
    }
    return {
      status: ApprovalStatusVO.approved(),
      reason: ApprovalReasonVO.reconstitute('complete'),
      autoApproved: params.autoApproved,
      note: params.note,
    };
  }

  /** Appeal window deadline from rejection. */
  static computeAppealDeadline(rejectedAt: string): Date {
    return new Date(Date.parse(rejectedAt) + VENDOR_APPROVAL.APPEAL_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  }

  /** Can the vendor appeal? */
  static canAppeal(rejectedAt: string, at: Date = new Date()): boolean {
    return at.getTime() <= VendorApprovalWorkflowService.computeAppealDeadline(rejectedAt).getTime();
  }

  /**
   * Should the vendor be allowed to resubmit?
   */
  static canResubmit(currentCount: number): boolean {
    return currentCount < VENDOR_APPROVAL.MAX_RESUBMISSIONS;
  }

  /**
   * Suggest a reason from verification state (for auto decisions).
   */
  static suggestReason(params: {
    verificationFailed: boolean;
    missingDocuments: boolean;
    invalidDocuments: boolean;
  }): ApprovalReasonVO {
    if (params.invalidDocuments) {
      return ApprovalReasonVO.reconstitute('invalid_documents');
    }
    if (params.missingDocuments) {
      return ApprovalReasonVO.reconstitute('incomplete_documents');
    }
    if (params.verificationFailed) {
      return ApprovalReasonVO.reconstitute('policy_violation');
    }
    return ApprovalReasonVO.complete();
  }

  /**
   * Compute expected review time (in hours) for SLA estimation.
   */
  static estimateReviewHours(verificationScore: number, documentCount: number): number {
    if (!Number.isFinite(verificationScore) || verificationScore < 0 || verificationScore > 100) {
      throw new ValidationError('Verification score must be between 0 and 100', 'verificationScore');
    }
    const base = VENDOR_APPROVAL.REVIEW_SLA_HOURS;
    const scoreFactor = 1 - Math.min(1, verificationScore / 100); // higher score → faster
    const docFactor = Math.min(1, documentCount / 20);
    return Math.round(base * (0.3 + scoreFactor * 0.4 + docFactor * 0.3));
  }
}

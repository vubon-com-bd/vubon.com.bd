/**
 * Vendor Approval Errors
 * @module vendor-service/domain/errors
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { NotFoundError } from '@vubon/shared-kernel/domain/errors/not-found.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class VendorApprovalNotFoundError extends NotFoundError {
  constructor(approvalId: string) {
    super('VendorApproval', approvalId);
    this.name = 'VendorApprovalNotFoundError';
  }
}

export class InvalidApprovalStatusError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid approval status "${value}". Allowed: ${allowed.join(', ')}`, 'status');
    this.name = 'InvalidApprovalStatusError';
  }
}

export class InvalidApprovalReasonError extends ValidationError {
  constructor(value: string, allowed: readonly string[]) {
    super(`Invalid approval reason "${value}". Allowed: ${allowed.join(', ')}`, 'reason');
    this.name = 'InvalidApprovalReasonError';
  }
}

export class ApprovalRejectionRequiresReasonError extends BusinessRuleError {
  constructor(vendorId: string) {
    super(
      `Rejecting vendor "${vendorId}" requires a reason`,
      'APPROVAL_REJECTION_REASON_REQUIRED',
      { vendorId },
    );
    this.name = 'ApprovalRejectionRequiresReasonError';
  }
}

export class MaxResubmissionsExceededError extends BusinessRuleError {
  constructor(vendorId: string, max: number) {
    super(
      `Vendor "${vendorId}" exceeded max resubmissions (${max})`,
      'MAX_RESUBMISSIONS_EXCEEDED',
      { vendorId, max },
    );
    this.name = 'MaxResubmissionsExceededError';
  }
}

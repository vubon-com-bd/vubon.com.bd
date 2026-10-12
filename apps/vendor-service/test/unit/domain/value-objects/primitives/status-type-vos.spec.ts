/**
 * Bulk tests — status/type VOs
 */
import { ApprovalStatusVO } from '../../../../../src/module/domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';
import { DocumentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { InvoiceStatusVO } from '../../../../../src/module/domain/value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../../../../../src/module/domain/value-objects/primitives/invoice-type.vo.js';
import { PayoutStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payout-status.vo.js';
import { PayoutMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutCycleVO } from '../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { SubscriptionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';
import { SubscriptionPlanVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionCycleVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';
import { VerificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { TeamInviteStatusVO } from '../../../../../src/module/domain/value-objects/primitives/team-invite-status.vo.js';
import { TeamMemberStatusVO } from '../../../../../src/module/domain/value-objects/primitives/team-member-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('ApprovalStatusVO', () => {
  it('creates valid', () => expect(ApprovalStatusVO.create('pending').value).toBe('pending'));
  it('rejects invalid', () => expect(() => ApprovalStatusVO.create('x')).toThrow(ValidationError));
  it('named constructors work', () => {
    expect(ApprovalStatusVO.pending().isPending()).toBe(true);
    expect(ApprovalStatusVO.approved().isApproved()).toBe(true);
    expect(ApprovalStatusVO.rejected().isRejected()).toBe(true);
    expect(ApprovalStatusVO.infoRequested().isInfoRequested()).toBe(true);
    expect(ApprovalStatusVO.underAppeal().isUnderAppeal()).toBe(true);
  });
  it('isFinal / isActionableByVendor', () => {
    expect(ApprovalStatusVO.approved().isFinal()).toBe(true);
    expect(ApprovalStatusVO.infoRequested().isActionableByVendor()).toBe(true);
  });
  it('canTransitionTo', () => {
    expect(ApprovalStatusVO.pending().canTransitionTo('approved')).toBe(true);
    expect(ApprovalStatusVO.approved().canTransitionTo('pending')).toBe(false);
  });
});

describe('ApprovalReasonVO', () => {
  it('creates valid', () => expect(ApprovalReasonVO.create('complete').value).toBe('complete'));
  it('rejects invalid', () => expect(() => ApprovalReasonVO.create('x')).toThrow(ValidationError));
  it('isPositive', () => expect(ApprovalReasonVO.complete().isPositive()).toBe(true));
  it('isFraudRelated', () => {
    expect(ApprovalReasonVO.create('fraud_suspected').isFraudRelated()).toBe(true);
  });
  it('isDocumentRelated', () => {
    expect(ApprovalReasonVO.create('invalid_documents').isDocumentRelated()).toBe(true);
  });
});

describe('DocumentStatusVO', () => {
  it('creates valid', () => expect(DocumentStatusVO.create('pending').value).toBe('pending'));
  it('rejects invalid', () => expect(() => DocumentStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(DocumentStatusVO.pending().isPending()).toBe(true);
    expect(DocumentStatusVO.verified().isVerified()).toBe(true);
    expect(DocumentStatusVO.rejected().isRejected()).toBe(true);
    expect(DocumentStatusVO.expired().isExpired()).toBe(true);
    expect(DocumentStatusVO.resubmitted().isResubmitted()).toBe(true);
  });
  it('isValid', () => expect(DocumentStatusVO.verified().isValid()).toBe(true));
  it('canTransitionTo', () => {
    expect(DocumentStatusVO.pending().canTransitionTo('verified')).toBe(true);
  });
});

describe('DocumentTypeVO', () => {
  it('creates valid', () => expect(DocumentTypeVO.create('business_license').value).toBe('business_license'));
  it('rejects invalid', () => expect(() => DocumentTypeVO.create('x')).toThrow());
  it('requiresExpiry', () => {
    expect(DocumentTypeVO.create('business_license').requiresExpiry()).toBe(true);
    expect(DocumentTypeVO.create('identity_proof').requiresExpiry()).toBe(false);
  });
  it('isMandatory / isIdentityDocument / isFinancialDocument', () => {
    expect(DocumentTypeVO.create('business_license').isMandatory()).toBe(true);
    expect(DocumentTypeVO.create('identity_proof').isIdentityDocument()).toBe(true);
    expect(DocumentTypeVO.create('bank_statement').isFinancialDocument()).toBe(true);
  });
});

describe('InvoiceStatusVO', () => {
  it('creates valid', () => expect(InvoiceStatusVO.create('draft').value).toBe('draft'));
  it('rejects invalid', () => expect(() => InvoiceStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(InvoiceStatusVO.draft().isDraft()).toBe(true);
    expect(InvoiceStatusVO.sent().isSent()).toBe(true);
    expect(InvoiceStatusVO.viewed().isViewed()).toBe(true);
    expect(InvoiceStatusVO.paid().isPaid()).toBe(true);
    expect(InvoiceStatusVO.overdue().isOverdue()).toBe(true);
    expect(InvoiceStatusVO.cancelled().isCancelled()).toBe(true);
    expect(InvoiceStatusVO.refunded().isRefunded()).toBe(true);
  });
  it('isFinal / canTransitionTo', () => {
    expect(InvoiceStatusVO.paid().isFinal()).toBe(true);
    expect(InvoiceStatusVO.draft().canTransitionTo('sent')).toBe(true);
  });
});

describe('InvoiceTypeVO', () => {
  it('creates valid', () => expect(InvoiceTypeVO.create('commission').value).toBe('commission'));
  it('rejects invalid', () => expect(() => InvoiceTypeVO.create('x')).toThrow());
  it('isPayable / isOrderRelated / isPayoutRelated / isAdjustment', () => {
    expect(InvoiceTypeVO.create('commission').isPayable()).toBe(true);
    expect(InvoiceTypeVO.create('order').isOrderRelated()).toBe(true);
    expect(InvoiceTypeVO.create('payout').isPayoutRelated()).toBe(true);
    expect(InvoiceTypeVO.create('adjustment').isAdjustment()).toBe(true);
  });
});

describe('PayoutStatusVO', () => {
  it('creates valid', () => expect(PayoutStatusVO.create('pending').value).toBe('pending'));
  it('rejects invalid', () => expect(() => PayoutStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(PayoutStatusVO.pending().isPending()).toBe(true);
    expect(PayoutStatusVO.processing().isProcessing()).toBe(true);
    expect(PayoutStatusVO.approved().isApproved()).toBe(true);
    expect(PayoutStatusVO.paid().isPaid()).toBe(true);
    expect(PayoutStatusVO.failed().isFailed()).toBe(true);
    expect(PayoutStatusVO.rejected().isRejected()).toBe(true);
    expect(PayoutStatusVO.cancelled().isCancelled()).toBe(true);
    expect(PayoutStatusVO.onHold().isOnHold()).toBe(true);
  });
  it('isSuccessful / isFinal', () => {
    expect(PayoutStatusVO.paid().isSuccessful()).toBe(true);
    expect(PayoutStatusVO.paid().isFinal()).toBe(true);
  });
  it('canTransitionTo', () => {
    expect(PayoutStatusVO.pending().canTransitionTo('approved')).toBe(true);
  });
});

describe('PayoutMethodVO', () => {
  it('creates valid', () => expect(PayoutMethodVO.create('bank_transfer').value).toBe('bank_transfer'));
  it('rejects invalid', () => expect(() => PayoutMethodVO.create('x')).toThrow());
  it('requiresBankAccount', () => {
    expect(PayoutMethodVO.create('bank_transfer').requiresBankAccount()).toBe(true);
    expect(PayoutMethodVO.create('paypal').requiresBankAccount()).toBe(false);
  });
  it('isDigital / isManual', () => {
    expect(PayoutMethodVO.create('paypal').isDigital()).toBe(true);
    expect(PayoutMethodVO.create('cash').isManual()).toBe(true);
  });
});

describe('PayoutCycleVO', () => {
  it('creates valid', () => expect(PayoutCycleVO.create('weekly').value).toBe('weekly'));
  it('rejects invalid', () => expect(() => PayoutCycleVO.create('x')).toThrow());
  it('toHours', () => {
    expect(PayoutCycleVO.create('daily').toHours()).toBe(24);
    expect(PayoutCycleVO.create('weekly').toHours()).toBe(168);
    expect(PayoutCycleVO.create('on_demand').toHours()).toBe(0);
  });
  it('isOnDemand / isAutomatic', () => {
    expect(PayoutCycleVO.create('on_demand').isOnDemand()).toBe(true);
    expect(PayoutCycleVO.create('daily').isAutomatic()).toBe(true);
  });
});

describe('SubscriptionStatusVO', () => {
  it('creates valid', () => expect(SubscriptionStatusVO.create('active').value).toBe('active'));
  it('rejects invalid', () => expect(() => SubscriptionStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(SubscriptionStatusVO.trial().isTrial()).toBe(true);
    expect(SubscriptionStatusVO.active().isActive()).toBe(true);
    expect(SubscriptionStatusVO.pastDue().isPastDue()).toBe(true);
    expect(SubscriptionStatusVO.cancelled().isCancelled()).toBe(true);
    expect(SubscriptionStatusVO.expired().isExpired()).toBe(true);
    expect(SubscriptionStatusVO.suspended().isSuspended()).toBe(true);
  });
  it('isUsable / needsPayment / isTerminal', () => {
    expect(SubscriptionStatusVO.active().isUsable()).toBe(true);
    expect(SubscriptionStatusVO.pastDue().needsPayment()).toBe(true);
    expect(SubscriptionStatusVO.expired().isTerminal()).toBe(true);
  });
  it('canTransitionTo', () => {
    expect(SubscriptionStatusVO.trial().canTransitionTo('active')).toBe(true);
  });
});

describe('SubscriptionPlanVO', () => {
  it('creates valid', () => expect(SubscriptionPlanVO.create('basic').value).toBe('basic'));
  it('rejects invalid', () => expect(() => SubscriptionPlanVO.create('x')).toThrow());
  it('getProductLimit', () => {
    expect(SubscriptionPlanVO.create('basic').getProductLimit()).toBeGreaterThan(0);
  });
  it('isUnlimited for enterprise', () => {
    expect(SubscriptionPlanVO.create('enterprise').isUnlimited()).toBe(true);
  });
  it('canAddProducts', () => {
    const basic = SubscriptionPlanVO.create('basic');
    const limit = basic.getProductLimit();
    if (limit !== null) {
      expect(basic.canAddProducts(0)).toBe(true);
      expect(basic.canAddProducts(limit)).toBe(false);
    }
  });
  it('isFree / isPaid', () => {
    expect(SubscriptionPlanVO.free().isFree()).toBe(true);
    expect(SubscriptionPlanVO.create('basic').isPaid()).toBe(true);
  });
  it('comparison', () => {
    expect(SubscriptionPlanVO.create('premium').isHigherThan(SubscriptionPlanVO.create('basic'))).toBe(true);
    expect(SubscriptionPlanVO.create('free').isLowerThan(SubscriptionPlanVO.create('basic'))).toBe(true);
  });
});

describe('SubscriptionCycleVO', () => {
  it('creates valid', () => expect(SubscriptionCycleVO.create('monthly').value).toBe('monthly'));
  it('rejects invalid', () => expect(() => SubscriptionCycleVO.create('x')).toThrow());
  it('toDays', () => {
    expect(SubscriptionCycleVO.create('monthly').toDays()).toBe(30);
    expect(SubscriptionCycleVO.create('yearly').toDays()).toBe(365);
    expect(SubscriptionCycleVO.create('lifetime').toDays()).toBe(0);
  });
  it('isLifetime / isAnnual', () => {
    expect(SubscriptionCycleVO.create('lifetime').isLifetime()).toBe(true);
    expect(SubscriptionCycleVO.create('yearly').isAnnual()).toBe(true);
  });
  it('nextPeriodStart', () => {
    const d = SubscriptionCycleVO.create('monthly').nextPeriodStart(new Date('2026-01-01'));
    expect(d.getTime()).toBeGreaterThan(new Date('2026-01-01').getTime());
  });
});

describe('VerificationStatusVO', () => {
  it('creates valid', () => expect(VerificationStatusVO.create('pending').value).toBe('pending'));
  it('rejects invalid', () => expect(() => VerificationStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(VerificationStatusVO.notStarted().isNotStarted()).toBe(true);
    expect(VerificationStatusVO.pending().isPending()).toBe(true);
    expect(VerificationStatusVO.inReview().isInReview()).toBe(true);
    expect(VerificationStatusVO.approved().isApproved()).toBe(true);
    expect(VerificationStatusVO.rejected().isRejected()).toBe(true);
    expect(VerificationStatusVO.expired().isExpired()).toBe(true);
    expect(VerificationStatusVO.resubmitted().isResubmitted()).toBe(true);
  });
  it('isSuccessful / isTerminal', () => {
    expect(VerificationStatusVO.approved().isSuccessful()).toBe(true);
    expect(VerificationStatusVO.expired().isTerminal()).toBe(true);
  });
  it('canTransitionTo', () => {
    expect(VerificationStatusVO.notStarted().canTransitionTo('pending')).toBe(true);
  });
});

describe('VerificationTypeVO', () => {
  it('creates valid', () => expect(VerificationTypeVO.create('email').value).toBe('email'));
  it('rejects invalid', () => expect(() => VerificationTypeVO.create('x')).toThrow());
  it('isContactVerification', () => expect(VerificationTypeVO.create('email').isContactVerification()).toBe(true));
  it('isBusinessVerification', () => expect(VerificationTypeVO.create('business_license').isBusinessVerification()).toBe(true));
  it('isFinancialVerification', () => expect(VerificationTypeVO.create('bank_account').isFinancialVerification()).toBe(true));
  it('isIdentityVerification', () => expect(VerificationTypeVO.create('identity').isIdentityVerification()).toBe(true));
});

describe('TeamInviteStatusVO', () => {
  it('creates valid', () => expect(TeamInviteStatusVO.create('pending').value).toBe('pending'));
  it('rejects invalid', () => expect(() => TeamInviteStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(TeamInviteStatusVO.pending().isPending()).toBe(true);
    expect(TeamInviteStatusVO.accepted().isAccepted()).toBe(true);
    expect(TeamInviteStatusVO.rejected().isRejected()).toBe(true);
    expect(TeamInviteStatusVO.expired().isExpired()).toBe(true);
    expect(TeamInviteStatusVO.cancelled().isCancelled()).toBe(true);
  });
  it('isTerminal / canTransitionTo', () => {
    expect(TeamInviteStatusVO.accepted().isTerminal()).toBe(true);
    expect(TeamInviteStatusVO.pending().canTransitionTo('accepted')).toBe(true);
  });
});

describe('TeamMemberStatusVO', () => {
  it('creates valid', () => expect(TeamMemberStatusVO.create('active').value).toBe('active'));
  it('rejects invalid', () => expect(() => TeamMemberStatusVO.create('x')).toThrow());
  it('named constructors', () => {
    expect(TeamMemberStatusVO.active().isActive()).toBe(true);
    expect(TeamMemberStatusVO.inactive().isInactive()).toBe(true);
    expect(TeamMemberStatusVO.invited().isInvited()).toBe(true);
    expect(TeamMemberStatusVO.suspended().isSuspended()).toBe(true);
    expect(TeamMemberStatusVO.removed().isRemoved()).toBe(true);
  });
  it('canLogin', () => {
    expect(TeamMemberStatusVO.active().canLogin()).toBe(true);
    expect(TeamMemberStatusVO.invited().canLogin()).toBe(false);
  });
  it('isTerminal', () => expect(TeamMemberStatusVO.removed().isTerminal()).toBe(true));
  it('canTransitionTo', () => {
    expect(TeamMemberStatusVO.invited().canTransitionTo('active')).toBe(true);
  });
});

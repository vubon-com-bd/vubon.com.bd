/**
 * Remaining primitive VOs — bulk coverage tests
 * @module vendor-service/test/unit/domain/value-objects/primitives
 */
import { ApprovalStatusVO } from '../../../../../src/module/domain/value-objects/primitives/approval-status.vo.js';
import { ApprovalReasonVO } from '../../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';
import { DeliveryDaysVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-days.vo.js';
import { DocumentFileSizeVO } from '../../../../../src/module/domain/value-objects/primitives/document-file-size.vo.js';
import { DocumentIdVO } from '../../../../../src/module/domain/value-objects/primitives/document-id.vo.js';
import { DocumentMimeTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-mime-type.vo.js';
import { DocumentStatusVO } from '../../../../../src/module/domain/value-objects/primitives/document-status.vo.js';
import { DocumentTypeVO } from '../../../../../src/module/domain/value-objects/primitives/document-type.vo.js';
import { DocumentUrlVO } from '../../../../../src/module/domain/value-objects/primitives/document-url.vo.js';
import { InviteExpiryVO } from '../../../../../src/module/domain/value-objects/primitives/invite-expiry.vo.js';
import { InvoiceNumberVO } from '../../../../../src/module/domain/value-objects/primitives/invoice-number.vo.js';
import { InvoiceStatusVO } from '../../../../../src/module/domain/value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../../../../../src/module/domain/value-objects/primitives/invoice-type.vo.js';
import { MemberPermissionVO } from '../../../../../src/module/domain/value-objects/primitives/member-permission.vo.js';
import { MemberRoleVO } from '../../../../../src/module/domain/value-objects/primitives/member-role.vo.js';
import { OrderLimitVO } from '../../../../../src/module/domain/value-objects/primitives/order-limit.vo.js';
import { PayoutCycleVO } from '../../../../../src/module/domain/value-objects/primitives/payout-cycle.vo.js';
import { PayoutMethodVO } from '../../../../../src/module/domain/value-objects/primitives/payout-method.vo.js';
import { PayoutStatusVO } from '../../../../../src/module/domain/value-objects/primitives/payout-status.vo.js';
import { PerformanceGradeVO } from '../../../../../src/module/domain/value-objects/primitives/performance-grade.vo.js';
import { PerformanceMetricTypeVO } from '../../../../../src/module/domain/value-objects/primitives/performance-metric-type.vo.js';
import { ReturnPolicyNoteVO } from '../../../../../src/module/domain/value-objects/primitives/return-policy-note.vo.js';
import { ReturnTypeVO } from '../../../../../src/module/domain/value-objects/primitives/return-type.vo.js';
import { ReturnWindowDaysVO } from '../../../../../src/module/domain/value-objects/primitives/return-window-days.vo.js';
import { ShippingCostVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-cost.vo.js';
import { ShippingMethodVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-method.vo.js';
import { ShippingZoneVO } from '../../../../../src/module/domain/value-objects/primitives/shipping-zone.vo.js';
import { SubscriptionCycleVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-cycle.vo.js';
import { SubscriptionPlanVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-plan.vo.js';
import { SubscriptionStatusVO } from '../../../../../src/module/domain/value-objects/primitives/subscription-status.vo.js';
import { SuspensionReasonVO } from '../../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';
import { TeamInviteStatusVO } from '../../../../../src/module/domain/value-objects/primitives/team-invite-status.vo.js';
import { TeamMemberStatusVO } from '../../../../../src/module/domain/value-objects/primitives/team-member-status.vo.js';
import { VendorBannerVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-banner.vo.js';
import { VendorLogoVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-logo.vo.js';
import { VendorRatingCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-rating-category.vo.js';
import { VendorReportFormatVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js';
import { VendorReportStatusVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-report-status.vo.js';
import { VendorReportTypeVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReviewCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-review-category.vo.js';
import { VendorReviewStatusVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-review-status.vo.js';
import { VendorWebsiteVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-website.vo.js';
import { VerificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { WarrantyPeriodDaysVO } from '../../../../../src/module/domain/value-objects/primitives/warranty-period-days.vo.js';
import { WarrantyTypeVO } from '../../../../../src/module/domain/value-objects/primitives/warranty-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('Approval status/reason VOs', () => {
  it.each(['pending', 'approved', 'rejected', 'info_requested', 'under_appeal'])(
    'ApprovalStatusVO accepts %s',
    (s) => expect(ApprovalStatusVO.create(s).value).toBe(s),
  );
  it('ApprovalStatusVO throws on bogus', () => {
    expect(() => ApprovalStatusVO.create('bogus')).toThrow(ValidationError);
  });
  it('ApprovalStatusVO.isApproved', () => {
    expect(ApprovalStatusVO.approved().isApproved()).toBe(true);
  });
  it('ApprovalStatusVO.canTransitionTo', () => {
    expect(ApprovalStatusVO.pending().canTransitionTo('approved')).toBe(true);
  });
  it('ApprovalReasonVO accepts valid', () => {
    expect(ApprovalReasonVO.create('complete').value).toBe('complete');
  });
  it('ApprovalReasonVO throws on bogus', () => {
    expect(() => ApprovalReasonVO.create('bogus')).toThrow(ValidationError);
  });
  it('ApprovalReasonVO.complete()', () => {
    expect(ApprovalReasonVO.complete().value).toBe('complete');
  });
});

describe('Delivery & shipping VOs', () => {
  it('DeliveryDaysVO.create valid', () => {
    const d = DeliveryDaysVO.create(1, 3);
    expect(d.min).toBe(1);
    expect(d.max).toBe(3);
  });
  it('DeliveryDaysVO throws when min > max', () => {
    expect(() => DeliveryDaysVO.create(5, 1)).toThrow(ValidationError);
  });
  it('DeliveryDaysVO.isExpress', () => {
    expect(DeliveryDaysVO.create(1, 2).isExpress()).toBe(true);
  });
  it('DeliveryDaysVO.toString', () => {
    expect(DeliveryDaysVO.create(1, 3).toString()).toContain('1-3');
  });
  it('ShippingMethodVO accepts standard', () => {
    expect(ShippingMethodVO.create('standard').value).toBe('standard');
  });
  it('ShippingMethodVO throws bogus', () => {
    expect(() => ShippingMethodVO.create('bogus')).toThrow(ValidationError);
  });
  it('ShippingMethodVO.isPremium', () => {
    expect(ShippingMethodVO.create('same_day').isPremium()).toBe(true);
  });
  it('ShippingZoneVO accepts inside_city', () => {
    expect(ShippingZoneVO.create('inside_city').value).toBe('inside_city');
  });
  it('ShippingZoneVO.isInternational', () => {
    expect(ShippingZoneVO.create('international').isInternational()).toBe(true);
  });
  it('ShippingCostVO.create valid', () => {
    const c = ShippingCostVO.create(60, 'BDT');
    expect(c.amount).toBe(60);
    expect(c.currency).toBe('BDT');
  });
  it('ShippingCostVO throws on negative', () => {
    expect(() => ShippingCostVO.create(-1, 'BDT')).toThrow(ValidationError);
  });
  it('ShippingCostVO.calculateForOrder returns 0 above free-above', () => {
    const c = ShippingCostVO.create(60, 'BDT', 1000);
    expect(c.calculateForOrder(1500)).toBe(0);
  });
  it('ShippingCostVO.free()', () => {
    expect(ShippingCostVO.free('BDT').isFree()).toBe(true);
  });
});

describe('Document VOs', () => {
  it('DocumentIdVO.create UUID', () => {
    expect(DocumentIdVO.create('7c9e6679-7425-40de-944b-e07fc1f90ae7').value).toBe('7c9e6679-7425-40de-944b-e07fc1f90ae7');
  });
  it('DocumentIdVO throws invalid', () => {
    expect(() => DocumentIdVO.create('bogus')).toThrow(ValidationError);
  });
  it('DocumentTypeVO accepts business_license', () => {
    expect(DocumentTypeVO.create('business_license').value).toBe('business_license');
  });
  it('DocumentTypeVO.requiresExpiry', () => {
    expect(DocumentTypeVO.create('business_license').requiresExpiry()).toBe(true);
    expect(DocumentTypeVO.create('identity_proof').requiresExpiry()).toBe(false);
  });
  it('DocumentStatusVO accepts pending', () => {
    expect(DocumentStatusVO.create('pending').value).toBe('pending');
  });
  it('DocumentStatusVO.isVerified', () => {
    expect(DocumentStatusVO.verified().isVerified()).toBe(true);
  });
  it('DocumentUrlVO.create valid https', () => {
    expect(DocumentUrlVO.create('https://x.com/d.pdf').isHttps()).toBe(true);
  });
  it('DocumentUrlVO throws on non-url', () => {
    expect(() => DocumentUrlVO.create('not-url')).toThrow(ValidationError);
  });
  it('DocumentMimeTypeVO accepts pdf', () => {
    expect(DocumentMimeTypeVO.create('application/pdf').isPdf()).toBe(true);
  });
  it('DocumentMimeTypeVO throws disallowed', () => {
    expect(() => DocumentMimeTypeVO.create('application/x-msdownload')).toThrow(ValidationError);
  });
  it('DocumentFileSizeVO.create valid', () => {
    expect(DocumentFileSizeVO.create(1024).bytes).toBe(1024);
  });
  it('DocumentFileSizeVO throws on negative', () => {
    expect(() => DocumentFileSizeVO.create(-1)).toThrow(ValidationError);
  });
  it('DocumentFileSizeVO.toMB', () => {
    expect(DocumentFileSizeVO.create(1024 * 1024).toMB()).toBe(1);
  });
});

describe('Verification VOs', () => {
  it('VerificationTypeVO accepts email', () => {
    expect(VerificationTypeVO.create('email').value).toBe('email');
  });
  it('VerificationTypeVO.isContactVerification', () => {
    expect(VerificationTypeVO.create('email').isContactVerification()).toBe(true);
  });
  it('VerificationStatusVO accepts approved', () => {
    expect(VerificationStatusVO.create('approved').value).toBe('approved');
  });
  it('VerificationStatusVO.isSuccessful', () => {
    expect(VerificationStatusVO.approved().isSuccessful()).toBe(true);
  });
});

describe('Member VOs', () => {
  it('MemberRoleVO accepts vendor_owner', () => {
    expect(MemberRoleVO.create('vendor_owner').value).toBe('vendor_owner');
  });
  it('MemberRoleVO.isOwner', () => {
    expect(MemberRoleVO.create('vendor_owner').isOwner()).toBe(true);
  });
  it('MemberRoleVO.getLevel', () => {
    expect(MemberRoleVO.create('vendor_owner').getLevel()).toBeGreaterThan(0);
  });
  it('MemberPermissionVO accepts valid', () => {
    expect(MemberPermissionVO.create('vendor:product:create').value).toBe('vendor:product:create');
  });
  it('MemberPermissionVO throws bogus', () => {
    expect(() => MemberPermissionVO.create('bogus:x:y')).toThrow(ValidationError);
  });
  it('MemberPermissionVO.getResource', () => {
    expect(MemberPermissionVO.create('vendor:product:create').getResource()).toBe('product');
  });
  it('TeamInviteStatusVO accepts pending', () => {
    expect(TeamInviteStatusVO.create('pending').value).toBe('pending');
  });
  it('TeamMemberStatusVO.isActive', () => {
    expect(TeamMemberStatusVO.active().isActive()).toBe(true);
  });
  it('TeamMemberStatusVO.canLogin', () => {
    expect(TeamMemberStatusVO.active().canLogin()).toBe(true);
  });
});

describe('Payout & subscription VOs', () => {
  it('PayoutStatusVO accepts pending', () => {
    expect(PayoutStatusVO.create('pending').value).toBe('pending');
  });
  it('PayoutStatusVO.isSuccessful', () => {
    expect(PayoutStatusVO.paid().isSuccessful()).toBe(true);
  });
  it('PayoutMethodVO.isDigital', () => {
    expect(PayoutMethodVO.reconstitute('paypal').isDigital()).toBe(true);
  });
  it('PayoutMethodVO.requiresBankAccount', () => {
    expect(PayoutMethodVO.reconstitute('bank_transfer').requiresBankAccount()).toBe(true);
  });
  it('PayoutCycleVO.toHours', () => {
    expect(PayoutCycleVO.reconstitute('daily').toHours()).toBe(24);
  });
  it('PayoutCycleVO.isOnDemand', () => {
    expect(PayoutCycleVO.reconstitute('on_demand').isOnDemand()).toBe(true);
  });
  it('SubscriptionPlanVO accepts basic', () => {
    expect(SubscriptionPlanVO.create('basic').value).toBe('basic');
  });
  it('SubscriptionPlanVO.getRank', () => {
    expect(SubscriptionPlanVO.create('basic').getRank()).toBeGreaterThan(0);
  });
  it('SubscriptionCycleVO.toDays', () => {
    expect(SubscriptionCycleVO.create('monthly').toDays()).toBe(30);
  });
  it('SubscriptionStatusVO.isUsable', () => {
    expect(SubscriptionStatusVO.active().isUsable()).toBe(true);
  });
  it('SubscriptionStatusVO.needsPayment', () => {
    expect(SubscriptionStatusVO.pastDue().needsPayment()).toBe(true);
  });
});

describe('Review / rating VOs', () => {
  it('VendorReviewStatusVO accepts approved', () => {
    expect(VendorReviewStatusVO.create('approved').value).toBe('approved');
  });
  it('VendorReviewStatusVO.isPubliclyVisible', () => {
    expect(VendorReviewStatusVO.approved().isPubliclyVisible()).toBe(true);
  });
  it('VendorReviewCategoryVO accepts product_quality', () => {
    expect(VendorReviewCategoryVO.create('product_quality').value).toBe('product_quality');
  });
  it('VendorRatingCategoryVO.affectsProduct', () => {
    expect(VendorRatingCategoryVO.create('product_quality').affectsProduct()).toBe(true);
  });
});

describe('Report VOs', () => {
  it('VendorReportTypeVO accepts sales', () => {
    expect(VendorReportTypeVO.create('sales').value).toBe('sales');
  });
  it('VendorReportTypeVO.isFinancial', () => {
    expect(VendorReportTypeVO.create('sales').isFinancial()).toBe(true);
  });
  it('VendorReportFormatVO accepts pdf', () => {
    expect(VendorReportFormatVO.create('pdf').value).toBe('pdf');
  });
  it('VendorReportFormatVO.mimeType', () => {
    expect(VendorReportFormatVO.create('pdf').mimeType()).toContain('pdf');
  });
  it('VendorReportPeriodVO.resolveRange', () => {
    const r = VendorReportPeriodVO.create('last_7_days').resolveRange();
    expect(r.start).toBeDefined();
    expect(r.end).toBeDefined();
  });
  it('VendorReportStatusVO accepts ready', () => {
    expect(VendorReportStatusVO.create('ready').value).toBe('ready');
  });
});

describe('Performance VOs', () => {
  it('PerformanceGradeVO accepts a', () => {
    expect(PerformanceGradeVO.create('a').value).toBe('a');
  });
  it('PerformanceGradeVO.getLabel', () => {
    expect(PerformanceGradeVO.create('a_plus').getLabel()).toBe('A+');
  });
  it('PerformanceGradeVO.isTopGrade', () => {
    expect(PerformanceGradeVO.create('a').isTopGrade()).toBe(true);
  });
  it('PerformanceMetricTypeVO accepts order_fulfillment_rate', () => {
    expect(PerformanceMetricTypeVO.create('order_fulfillment_rate').value).toBe('order_fulfillment_rate');
  });
  it('PerformanceMetricTypeVO.isHigherBetter', () => {
    expect(PerformanceMetricTypeVO.create('order_fulfillment_rate').isHigherBetter()).toBe(true);
  });
});

describe('Return policy VOs', () => {
  it('ReturnTypeVO accepts full_return', () => {
    expect(ReturnTypeVO.create('full_return').value).toBe('full_return');
  });
  it('ReturnTypeVO.allowsRefund', () => {
    expect(ReturnTypeVO.create('full_return').allowsRefund()).toBe(true);
  });
  it('ReturnWindowDaysVO.create valid', () => {
    expect(ReturnWindowDaysVO.create(7).days).toBe(7);
  });
  it('ReturnWindowDaysVO throws above max', () => {
    expect(() => ReturnWindowDaysVO.create(100)).toThrow(ValidationError);
  });
  it('ReturnWindowDaysVO.isWithinWindow', () => {
    const w = ReturnWindowDaysVO.create(7);
    const delivered = new Date();
    expect(w.isWithinWindow(delivered, new Date())).toBe(true);
  });
  it('ReturnPolicyNoteVO.create valid', () => {
    expect(ReturnPolicyNoteVO.create('Returns accepted within 7 days.').value).toContain('Returns');
  });
  it('ReturnPolicyNoteVO.empty()', () => {
    expect(ReturnPolicyNoteVO.empty().isEmpty()).toBe(true);
  });
});

describe('Warranty & invoice VOs', () => {
  it('WarrantyTypeVO accepts seller', () => {
    expect(WarrantyTypeVO.create('seller').value).toBe('seller');
  });
  it('WarrantyTypeVO.hasWarranty', () => {
    expect(WarrantyTypeVO.create('seller').hasWarranty()).toBe(true);
    expect(WarrantyTypeVO.none().hasWarranty()).toBe(false);
  });
  it('WarrantyPeriodDaysVO.create valid', () => {
    expect(WarrantyPeriodDaysVO.create(30).days).toBe(30);
  });
  it('WarrantyPeriodDaysVO.calculateExpiry', () => {
    const w = WarrantyPeriodDaysVO.create(30);
    const start = new Date();
    expect(w.calculateExpiry(start).getTime()).toBeGreaterThan(start.getTime());
  });
  it('InvoiceNumberVO.generate', () => {
    expect(InvoiceNumberVO.generate(1).value).toContain('INV-');
  });
  it('InvoiceNumberVO.create throws invalid', () => {
    expect(() => InvoiceNumberVO.create('BAD')).toThrow(ValidationError);
  });
  it('InvoiceStatusVO.accepts draft', () => {
    expect(InvoiceStatusVO.create('draft').value).toBe('draft');
  });
  it('InvoiceTypeVO.isPayable', () => {
    expect(InvoiceTypeVO.create('commission').isPayable()).toBe(true);
  });
});

describe('URL / Banner / Logo VOs', () => {
  it('VendorWebsiteVO.create valid', () => {
    expect(VendorWebsiteVO.create('https://acme.com').isHttps()).toBe(true);
  });
  it('VendorWebsiteVO throws invalid', () => {
    expect(() => VendorWebsiteVO.create('not-url')).toThrow(ValidationError);
  });
  it('VendorLogoVO.create valid', () => {
    expect(VendorLogoVO.create('https://cdn.example.com/logo.png').isSupportedFormat()).toBe(true);
  });
  it('VendorBannerVO.create valid', () => {
    expect(VendorBannerVO.create('https://cdn.example.com/banner.jpg').isSupportedFormat()).toBe(true);
  });
});

describe('Suspension / invite VOs', () => {
  it('SuspensionReasonVO accepts fraud', () => {
    expect(SuspensionReasonVO.create('fraud').value).toBe('fraud');
  });
  it('SuspensionReasonVO.isSevere', () => {
    expect(SuspensionReasonVO.create('fraud').isSevere()).toBe(true);
  });
  it('InviteExpiryVO.fromNow', () => {
    const e = InviteExpiryVO.fromNow(7);
    expect(e.isExpired()).toBe(false);
  });
  it('InviteExpiryVO.daysRemaining', () => {
    expect(InviteExpiryVO.fromNow(7).daysRemaining()).toBeGreaterThan(0);
  });
  it('OrderLimitVO.defaults', () => {
    const o = OrderLimitVO.defaults('BDT');
    expect(o.currency).toBe('BDT');
  });
  it('OrderLimitVO.isWithinLimits', () => {
    const o = OrderLimitVO.defaults('BDT');
    expect(o.isWithinLimits(1000)).toBe(true);
  });
});

/**
 * All query handlers — bulk coverage with mocked services
 * @module vendor-service/test/unit/application/queries
 */
import { jest } from '@jest/globals';

// Vendor queries
import { GetVendorHandler } from '../../../../src/module/application/queries/vendor/get-vendor.handler.js';
import { GetVendorQuery } from '../../../../src/module/application/queries/vendor/get-vendor.query.js';
import { GetVendorPublicHandler } from '../../../../src/module/application/queries/vendor/get-vendor-public.handler.js';
import { GetVendorPublicQuery } from '../../../../src/module/application/queries/vendor/get-vendor-public.query.js';
import { GetVendorBySlugHandler } from '../../../../src/module/application/queries/vendor/get-vendor-by-slug.handler.js';
import { GetVendorBySlugQuery } from '../../../../src/module/application/queries/vendor/get-vendor-by-slug.query.js';
import { GetVendorSummaryHandler } from '../../../../src/module/application/queries/vendor/get-vendor-summary.handler.js';
import { GetVendorSummaryQuery } from '../../../../src/module/application/queries/vendor/get-vendor-summary.query.js';
import { ListVendorsHandler } from '../../../../src/module/application/queries/vendor/list-vendors.handler.js';
import { ListVendorsQuery } from '../../../../src/module/application/queries/vendor/list-vendors.query.js';
import { GetVendorStatsHandler } from '../../../../src/module/application/queries/vendor/get-vendor-stats.handler.js';
import { GetVendorStatsQuery } from '../../../../src/module/application/queries/vendor/get-vendor-stats.query.js';
import { CheckVendorSlugHandler } from '../../../../src/module/application/queries/vendor/check-vendor-slug.handler.js';
import { CheckVendorSlugQuery } from '../../../../src/module/application/queries/vendor/check-vendor-slug.query.js';
import { SuggestVendorSlugHandler } from '../../../../src/module/application/queries/vendor/suggest-vendor-slug.handler.js';
import { SuggestVendorSlugQuery } from '../../../../src/module/application/queries/vendor/suggest-vendor-slug.query.js';
import { GetSuspensionHandler } from '../../../../src/module/application/queries/vendor/get-suspension.handler.js';
import { GetSuspensionQuery } from '../../../../src/module/application/queries/vendor/get-suspension.query.js';
import { GetActiveSuspensionHandler } from '../../../../src/module/application/queries/vendor/get-active-suspension.handler.js';
import { GetActiveSuspensionQuery } from '../../../../src/module/application/queries/vendor/get-active-suspension.query.js';
import { ListSuspensionsHandler } from '../../../../src/module/application/queries/vendor/list-suspensions.handler.js';
import { ListSuspensionsQuery } from '../../../../src/module/application/queries/vendor/list-suspensions.query.js';

// Document queries
import { GetVendorDocumentHandler } from '../../../../src/module/application/queries/document/get-vendor-document.handler.js';
import { GetVendorDocumentQuery } from '../../../../src/module/application/queries/document/get-vendor-document.query.js';
import { ListVendorDocumentsHandler } from '../../../../src/module/application/queries/document/list-vendor-documents.handler.js';
import { ListVendorDocumentsQuery } from '../../../../src/module/application/queries/document/list-vendor-documents.query.js';
import { ListPublicDocumentsHandler } from '../../../../src/module/application/queries/document/list-public-documents.handler.js';
import { ListPublicDocumentsQuery } from '../../../../src/module/application/queries/document/list-public-documents.query.js';

// Verification, Approval queries
import { GetVendorVerificationHandler } from '../../../../src/module/application/queries/verification/get-vendor-verification.handler.js';
import { GetVendorVerificationQuery } from '../../../../src/module/application/queries/verification/get-vendor-verification.query.js';
import { GetVendorApprovalHandler } from '../../../../src/module/application/queries/approval/get-vendor-approval.handler.js';
import { GetVendorApprovalQuery } from '../../../../src/module/application/queries/approval/get-vendor-approval.query.js';

// Team queries
import { ListTeamMembersHandler } from '../../../../src/module/application/queries/team/list-team-members.handler.js';
import { ListTeamMembersQuery } from '../../../../src/module/application/queries/team/list-team-members.query.js';
import { GetTeamMemberHandler } from '../../../../src/module/application/queries/team/get-team-member.handler.js';
import { GetTeamMemberQuery } from '../../../../src/module/application/queries/team/get-team-member.query.js';

// Payout, Settlement, Invoice queries
import { GetPayoutHandler } from '../../../../src/module/application/queries/payout/get-payout.handler.js';
import { GetPayoutQuery } from '../../../../src/module/application/queries/payout/get-payout.query.js';
import { ListPayoutsByVendorHandler } from '../../../../src/module/application/queries/payout/list-payouts-by-vendor.handler.js';
import { ListPayoutsByVendorQuery } from '../../../../src/module/application/queries/payout/list-payouts-by-vendor.query.js';
import { GetPayoutSummaryHandler } from '../../../../src/module/application/queries/payout/get-payout-summary.handler.js';
import { GetPayoutSummaryQuery } from '../../../../src/module/application/queries/payout/get-payout-summary.query.js';
import { GetSettlementHandler } from '../../../../src/module/application/queries/settlement/get-settlement.handler.js';
import { GetSettlementQuery } from '../../../../src/module/application/queries/settlement/get-settlement.query.js';
import { ListSettlementsByVendorHandler } from '../../../../src/module/application/queries/settlement/list-settlements-by-vendor.handler.js';
import { ListSettlementsByVendorQuery } from '../../../../src/module/application/queries/settlement/list-settlements-by-vendor.query.js';
import { GetInvoiceHandler } from '../../../../src/module/application/queries/invoice/get-invoice.handler.js';
import { GetInvoiceQuery } from '../../../../src/module/application/queries/invoice/get-invoice.query.js';
import { ListInvoicesByVendorHandler } from '../../../../src/module/application/queries/invoice/list-invoices-by-vendor.handler.js';
import { ListInvoicesByVendorQuery } from '../../../../src/module/application/queries/invoice/list-invoices-by-vendor.query.js';

// Subscription, Commission queries
import { GetVendorSubscriptionHandler } from '../../../../src/module/application/queries/subscription/get-vendor-subscription.handler.js';
import { GetVendorSubscriptionQuery } from '../../../../src/module/application/queries/subscription/get-vendor-subscription.query.js';
import { GetVendorSubscriptionPublicHandler } from '../../../../src/module/application/queries/subscription/get-vendor-subscription-public.handler.js';
import { GetVendorSubscriptionPublicQuery } from '../../../../src/module/application/queries/subscription/get-vendor-subscription-public.query.js';
import { GetActiveCommissionHandler } from '../../../../src/module/application/queries/commission/get-active-commission.handler.js';
import { GetActiveCommissionQuery } from '../../../../src/module/application/queries/commission/get-active-commission.query.js';

// Shipping, Warranty, Return Policy, Settings, Stats, Report queries
import { GetVendorShippingHandler } from '../../../../src/module/application/queries/shipping/get-vendor-shipping.handler.js';
import { GetVendorShippingQuery } from '../../../../src/module/application/queries/shipping/get-vendor-shipping.query.js';
import { CalculateShippingHandler } from '../../../../src/module/application/queries/shipping/calculate-shipping.handler.js';
import { CalculateShippingQuery } from '../../../../src/module/application/queries/shipping/calculate-shipping.query.js';
import { GetVendorWarrantyHandler } from '../../../../src/module/application/queries/warranty/get-vendor-warranty.handler.js';
import { GetVendorWarrantyQuery } from '../../../../src/module/application/queries/warranty/get-vendor-warranty.query.js';
import { GetVendorReturnPolicyHandler } from '../../../../src/module/application/queries/return-policy/get-vendor-return-policy.handler.js';
import { GetVendorReturnPolicyQuery } from '../../../../src/module/application/queries/return-policy/get-vendor-return-policy.query.js';
import { CheckReturnEligibilityHandler } from '../../../../src/module/application/queries/return-policy/check-return-eligibility.handler.js';
import { CheckReturnEligibilityQuery } from '../../../../src/module/application/queries/return-policy/check-return-eligibility.query.js';
import { GetVendorSettingsHandler } from '../../../../src/module/application/queries/settings/get-vendor-settings.handler.js';
import { GetVendorSettingsQuery } from '../../../../src/module/application/queries/settings/get-vendor-settings.query.js';
import { GetLatestVendorStatsHandler } from '../../../../src/module/application/queries/stats/get-latest-vendor-stats.handler.js';
import { GetLatestVendorStatsQuery } from '../../../../src/module/application/queries/stats/get-latest-vendor-stats.query.js';
import { GetVendorReportHandler } from '../../../../src/module/application/queries/report/get-vendor-report.handler.js';
import { GetVendorReportQuery } from '../../../../src/module/application/queries/report/get-vendor-report.query.js';
import { ListVendorReportsHandler } from '../../../../src/module/application/queries/report/list-vendor-reports.handler.js';
import { ListVendorReportsQuery } from '../../../../src/module/application/queries/report/list-vendor-reports.query.js';

// Rating, Review, Performance queries
import { GetVendorRatingHandler } from '../../../../src/module/application/queries/rating/get-vendor-rating.handler.js';
import { GetVendorRatingQuery } from '../../../../src/module/application/queries/rating/get-vendor-rating.query.js';
import { GetVendorReviewHandler } from '../../../../src/module/application/queries/review/get-vendor-review.handler.js';
import { GetVendorReviewQuery } from '../../../../src/module/application/queries/review/get-vendor-review.query.js';
import { ListVendorReviewsHandler } from '../../../../src/module/application/queries/review/list-vendor-reviews.handler.js';
import { ListVendorReviewsQuery } from '../../../../src/module/application/queries/review/list-vendor-reviews.query.js';
import { ListPublicVendorReviewsHandler } from '../../../../src/module/application/queries/review/list-public-vendor-reviews.handler.js';
import { ListPublicVendorReviewsQuery } from '../../../../src/module/application/queries/review/list-public-vendor-reviews.query.js';
import { GetVendorPerformanceHandler } from '../../../../src/module/application/queries/performance/get-vendor-performance.handler.js';
import { GetVendorPerformanceQuery } from '../../../../src/module/application/queries/performance/get-vendor-performance.query.js';
import { ListVendorPerformanceHandler } from '../../../../src/module/application/queries/performance/list-vendor-performance.handler.js';
import { ListVendorPerformanceQuery } from '../../../../src/module/application/queries/performance/list-vendor-performance.query.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

function makeMock(): Record<string, jest.Mock> {
  const methods = [
    'getById','getPublic','getBySlug','getSummary','list','getStats',
    'checkAvailability','suggestFor','getSuspension','getActiveByVendorId','listByVendor',
    'getById','listByVendor','listPublicByVendor',
    'getByVendorId','listByVendor','listPublicByVendor',
    'listByVendor','getMember',
    'getById','listByVendor','getSummary',
    'getById','listByVendor',
    'getById','listByVendor','listUnpaidByVendor',
    'getByVendorId','getPublic','getActiveByVendorId',
    'getByVendorId','calculateShipping','getByVendorId','getByVendorId','canReturn',
    'getByVendorId','getLatestByVendorId','getById','listByVendor',
    'getByVendorId','getById','listByVendor','listPublicByVendor',
    'getLatestByVendorId','listByVendor',
  ];
  const base: Record<string, jest.Mock> = {};
  for (const m of methods) base[m] = jest.fn().mockResolvedValue({ id: UUID });
  base.list = jest.fn().mockResolvedValue({ items: [], total: 0, page: 1, limit: 20, totalPages: 0 });
  base.listByVendor = jest.fn().mockResolvedValue([]);
  base.listPublicByVendor = jest.fn().mockResolvedValue([]);
  base.getSummary = jest.fn().mockResolvedValue({ vendorId: UUID });
  base.getPublic = jest.fn().mockResolvedValue({ id: UUID });
  base.getLatestByVendorId = jest.fn().mockResolvedValue({ id: UUID });
  base.calculateShipping = jest.fn().mockResolvedValue(60);
  base.canReturn = jest.fn().mockResolvedValue(true);
  return base;
}

describe('All query handlers', () => {
  describe('Vendor queries', () => {
    it('GetVendorHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorHandler(svc as never);
      await h.execute(new GetVendorQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorPublicHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorPublicHandler(svc as never);
      await h.execute(new GetVendorPublicQuery(UUID));
      expect(svc.getPublic).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorBySlugHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorBySlugHandler(svc as never);
      await h.execute(new GetVendorBySlugQuery('acme'));
      expect(svc.getBySlug).toHaveBeenCalledWith('acme');
    });
    it('GetVendorSummaryHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorSummaryHandler(svc as never);
      await h.execute(new GetVendorSummaryQuery(UUID));
      expect(svc.getSummary).toHaveBeenCalledWith(UUID);
    });
    it('ListVendorsHandler', async () => {
      const svc = makeMock();
      const h = new ListVendorsHandler(svc as never);
      await h.execute(new ListVendorsQuery({ page: 1, limit: 20 }));
      expect(svc.list).toHaveBeenCalled();
    });
    it('GetVendorStatsHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorStatsHandler(svc as never);
      await h.execute(new GetVendorStatsQuery(UUID));
      expect(svc.getStats).toHaveBeenCalledWith(UUID);
    });
    it('CheckVendorSlugHandler', async () => {
      const svc = makeMock();
      const h = new CheckVendorSlugHandler(svc as never);
      await h.execute(new CheckVendorSlugQuery('acme'));
      expect(svc.checkAvailability).toHaveBeenCalledWith('acme');
    });
    it('SuggestVendorSlugHandler', async () => {
      const svc = makeMock();
      const h = new SuggestVendorSlugHandler(svc as never);
      await h.execute(new SuggestVendorSlugQuery('Acme'));
      expect(svc.suggestFor).toHaveBeenCalledWith('Acme');
    });
    it('GetSuspensionHandler', async () => {
      const svc = makeMock();
      const h = new GetSuspensionHandler(svc as never);
      await h.execute(new GetSuspensionQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('GetActiveSuspensionHandler', async () => {
      const svc = makeMock();
      const h = new GetActiveSuspensionHandler(svc as never);
      await h.execute(new GetActiveSuspensionQuery(UUID));
      expect(svc.getActiveByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('ListSuspensionsHandler', async () => {
      const svc = makeMock();
      const h = new ListSuspensionsHandler(svc as never);
      await h.execute(new ListSuspensionsQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Document queries', () => {
    it('GetVendorDocumentHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorDocumentHandler(svc as never);
      await h.execute(new GetVendorDocumentQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListVendorDocumentsHandler', async () => {
      const svc = makeMock();
      const h = new ListVendorDocumentsHandler(svc as never);
      await h.execute(new ListVendorDocumentsQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
    it('ListPublicDocumentsHandler', async () => {
      const svc = makeMock();
      const h = new ListPublicDocumentsHandler(svc as never);
      await h.execute(new ListPublicDocumentsQuery(UUID));
      expect(svc.listPublicByVendor).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Verification / Approval queries', () => {
    it('GetVendorVerificationHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorVerificationHandler(svc as never);
      await h.execute(new GetVendorVerificationQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorApprovalHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorApprovalHandler(svc as never);
      await h.execute(new GetVendorApprovalQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Team queries', () => {
    it('ListTeamMembersHandler', async () => {
      const svc = makeMock();
      const h = new ListTeamMembersHandler(svc as never);
      await h.execute(new ListTeamMembersQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
    it('GetTeamMemberHandler', async () => {
      const svc = makeMock();
      const h = new GetTeamMemberHandler(svc as never);
      await h.execute(new GetTeamMemberQuery(UUID, UUID));
      expect(svc.getMember).toHaveBeenCalledWith(UUID, UUID);
    });
  });

  describe('Payout / Settlement / Invoice queries', () => {
    it('GetPayoutHandler', async () => {
      const svc = makeMock();
      const h = new GetPayoutHandler(svc as never);
      await h.execute(new GetPayoutQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListPayoutsByVendorHandler', async () => {
      const svc = makeMock();
      const h = new ListPayoutsByVendorHandler(svc as never);
      await h.execute(new ListPayoutsByVendorQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
    it('GetPayoutSummaryHandler', async () => {
      const svc = makeMock();
      const h = new GetPayoutSummaryHandler(svc as never);
      await h.execute(new GetPayoutSummaryQuery(UUID));
      expect(svc.getSummary).toHaveBeenCalledWith(UUID);
    });
    it('GetSettlementHandler', async () => {
      const svc = makeMock();
      const h = new GetSettlementHandler(svc as never);
      await h.execute(new GetSettlementQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListSettlementsByVendorHandler', async () => {
      const svc = makeMock();
      const h = new ListSettlementsByVendorHandler(svc as never);
      await h.execute(new ListSettlementsByVendorQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
    it('GetInvoiceHandler', async () => {
      const svc = makeMock();
      const h = new GetInvoiceHandler(svc as never);
      await h.execute(new GetInvoiceQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListInvoicesByVendorHandler', async () => {
      const svc = makeMock();
      const h = new ListInvoicesByVendorHandler(svc as never);
      await h.execute(new ListInvoicesByVendorQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Subscription / Commission queries', () => {
    it('GetVendorSubscriptionHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorSubscriptionHandler(svc as never);
      await h.execute(new GetVendorSubscriptionQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorSubscriptionPublicHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorSubscriptionPublicHandler(svc as never);
      await h.execute(new GetVendorSubscriptionPublicQuery(UUID));
      expect(svc.getPublic).toHaveBeenCalledWith(UUID);
    });
    it('GetActiveCommissionHandler', async () => {
      const svc = makeMock();
      const h = new GetActiveCommissionHandler(svc as never);
      await h.execute(new GetActiveCommissionQuery(UUID));
      expect(svc.getActiveByVendorId).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Shipping / Warranty / Return / Settings / Stats / Report queries', () => {
    it('GetVendorShippingHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorShippingHandler(svc as never);
      await h.execute(new GetVendorShippingQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('CalculateShippingHandler', async () => {
      const svc = makeMock();
      const h = new CalculateShippingHandler(svc as never);
      await h.execute(new CalculateShippingQuery(UUID, 'inside_city', 500));
      expect(svc.calculateShipping).toHaveBeenCalled();
    });
    it('GetVendorWarrantyHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorWarrantyHandler(svc as never);
      await h.execute(new GetVendorWarrantyQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorReturnPolicyHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorReturnPolicyHandler(svc as never);
      await h.execute(new GetVendorReturnPolicyQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('CheckReturnEligibilityHandler', async () => {
      const svc = makeMock();
      const h = new CheckReturnEligibilityHandler(svc as never);
      await h.execute(new CheckReturnEligibilityQuery(UUID, '2026-01-01T00:00:00Z'));
      expect(svc.canReturn).toHaveBeenCalled();
    });
    it('GetVendorSettingsHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorSettingsHandler(svc as never);
      await h.execute(new GetVendorSettingsQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetLatestVendorStatsHandler', async () => {
      const svc = makeMock();
      const h = new GetLatestVendorStatsHandler(svc as never);
      await h.execute(new GetLatestVendorStatsQuery(UUID));
      expect(svc.getLatestByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorReportHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorReportHandler(svc as never);
      await h.execute(new GetVendorReportQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListVendorReportsHandler', async () => {
      const svc = makeMock();
      const h = new ListVendorReportsHandler(svc as never);
      await h.execute(new ListVendorReportsQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
  });

  describe('Rating / Review / Performance queries', () => {
    it('GetVendorRatingHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorRatingHandler(svc as never);
      await h.execute(new GetVendorRatingQuery(UUID));
      expect(svc.getByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorReviewHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorReviewHandler(svc as never);
      await h.execute(new GetVendorReviewQuery(UUID));
      expect(svc.getById).toHaveBeenCalledWith(UUID);
    });
    it('ListVendorReviewsHandler', async () => {
      const svc = makeMock();
      const h = new ListVendorReviewsHandler(svc as never);
      await h.execute(new ListVendorReviewsQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
    it('ListPublicVendorReviewsHandler', async () => {
      const svc = makeMock();
      const h = new ListPublicVendorReviewsHandler(svc as never);
      await h.execute(new ListPublicVendorReviewsQuery(UUID));
      expect(svc.listPublicByVendor).toHaveBeenCalledWith(UUID);
    });
    it('GetVendorPerformanceHandler', async () => {
      const svc = makeMock();
      const h = new GetVendorPerformanceHandler(svc as never);
      await h.execute(new GetVendorPerformanceQuery(UUID));
      expect(svc.getLatestByVendorId).toHaveBeenCalledWith(UUID);
    });
    it('ListVendorPerformanceHandler', async () => {
      const svc = makeMock();
      const h = new ListVendorPerformanceHandler(svc as never);
      await h.execute(new ListVendorPerformanceQuery(UUID));
      expect(svc.listByVendor).toHaveBeenCalledWith(UUID);
    });
  });
});

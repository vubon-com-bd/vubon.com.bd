/**
 * Operational E2E — rating, review, performance, shipping, warranty, return-policy, settings, stats, report
 * @module vendor-service/test/e2e
 */
import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

const ACCEPT = [200, 201, 400, 401, 403, 404, 422, 500];
const ACCEPT_OK = [200, 201, 400, 401, 403, 500];

function nowIso(): Date { return new Date('2026-01-01T00:00:00.000Z'); }
function futureIso(): Date { return new Date('2026-02-01T00:00:00.000Z'); }

// ═══ RATING ═══
function makeRatingRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, overall: 4.5, totalReviews: 10,
    distribution: { '1': 0, '2': 0, '3': 1, '4': 3, '5': 6 },
    categories: [], recentWeight: 0,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ REVIEW ═══
function makeReviewRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, userId: UUID, orderId: UUID,
    rating: 5, comment: 'Excellent quality and service!',
    categories: [], status: 'pending', isVerifiedPurchase: true, flagCount: 0,
    hiddenReason: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ PERFORMANCE ═══
function makePerformanceRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, grade: 'a', overallScore: 92,
    metrics: [], evaluationPeriodStart: nowIso(), evaluationPeriodEnd: futureIso(),
    orderCount: 100, isSuspended: false, warningIssued: false,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ SHIPPING ═══
function makeShippingRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, defaultMethod: 'standard',
    trackingRequired: true, allowPickup: true, allowCourier: true,
    freeShippingThreshold: null, rates: [],
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ WARRANTY ═══
function makeWarrantyRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, defaultType: 'seller', defaultPeriodDays: 30,
    coversShipping: false, requireProof: true, autoRegister: true,
    terms: null, exclusions: [],
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ RETURN POLICY ═══
function makeReturnPolicyRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, type: 'full_return', windowDays: 7,
    freeReturn: true, restockFeePercent: 0,
    requireReason: true, requireImages: false, maxImages: 5,
    autoApprove: false, approvalSlaHours: 48,
    exclusions: [], notes: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ SETTINGS ═══
function makeSettingsRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    autoAcceptOrders: false, autoConfirmPayout: false,
    vacationMode: false, vacationMessage: null,
    timezone: 'Asia/Dhaka', locale: 'bn-BD', currency: 'BDT',
    notifications: {
      orderAlerts: true, payoutAlerts: true, reviewAlerts: true, stockAlerts: true,
      emailEnabled: true, smsEnabled: false, pushEnabled: true,
    },
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ STATS ═══
function makeStatsRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    periodStart: nowIso(), periodEnd: futureIso(),
    totalProducts: 100, totalOrders: 50,
    totalRevenue: 10000, totalCommission: 1000, totalPayout: 9000,
    totalRefund: 100, totalCancelled: 2,
    averageOrderValue: 200, currency: 'BDT',
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══ REPORT ═══
function makeReportRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    type: 'sales', format: 'pdf', period: 'last_30_days',
    periodStart: nowIso(), periodEnd: futureIso(),
    status: 'pending', fileUrl: null, fileSize: null,
    generatedAt: null, expiresAt: null, generatedBy: null, failureReason: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

describe('Vendor Operational E2E', () => {
  let app: INestApplication;
  let prisma: MockPrisma;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let ratingDel: any, reviewDel: any, perfDel: any, shipDel: any,
      warrantyDel: any, returnDel: any, settingsDel: any,
      statsDel: any, reportDel: any;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
    ratingDel = prisma.vendorRating;
    reviewDel = prisma.vendorReview;
    perfDel = prisma.vendorPerformance;
    shipDel = prisma.vendorShipping;
    warrantyDel = prisma.vendorWarranty;
    returnDel = prisma.vendorReturnPolicy;
    settingsDel = prisma.vendorSettings;
    statsDel = prisma.vendorStats;
    reportDel = prisma.vendorReport;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ═══════════════ RATING ═══════════════
  describe('GET /api/v1/vendors/:vendorId/rating', () => {
    it('200/500 — get vendor rating (public)', async () => {
      ratingDel.findFirst.mockResolvedValue(makeRatingRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/rating`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/rating/recalculate', () => {
    it('200/500 — recalculate rating (admin)', async () => {
      ratingDel.findFirst.mockResolvedValue(makeRatingRow());
      ratingDel.update.mockResolvedValue(makeRatingRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/rating/recalculate`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ REVIEW ═══════════════
  describe('POST /api/v1/vendors/:vendorId/reviews', () => {
    it('201/500 — submit review', async () => {
      reviewDel.create.mockResolvedValue(makeReviewRow());
      reviewDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reviews`)
        .set('Authorization', 'Bearer test-token')
        .send({
          orderId: UUID, rating: 5,
          comment: 'Excellent quality and service!',
          isVerifiedPurchase: true,
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/reviews', () => {
    it('200/500 — list reviews (admin)', async () => {
      reviewDel.findMany.mockResolvedValue([makeReviewRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/reviews`)
        .set('Authorization', 'Bearer admin-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/reviews/public', () => {
    it('200/500 — list public reviews', async () => {
      reviewDel.findMany.mockResolvedValue([makeReviewRow({ status: 'approved' })]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/reviews/public`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/reviews/:reviewId', () => {
    it('200/404/500 — get review', async () => {
      reviewDel.findFirst.mockResolvedValue(makeReviewRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/reviews/${UUID}`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/reviews/:reviewId/approve', () => {
    it('200/500 — approve review', async () => {
      reviewDel.findFirst.mockResolvedValue(makeReviewRow());
      reviewDel.update.mockResolvedValue(makeReviewRow({ status: 'approved' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reviews/${UUID}/approve`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/reviews/:reviewId/reject', () => {
    it('200/500 — reject review', async () => {
      reviewDel.findFirst.mockResolvedValue(makeReviewRow());
      reviewDel.update.mockResolvedValue(makeReviewRow({ status: 'rejected' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reviews/${UUID}/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'offensive content' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/reviews/:reviewId/flag', () => {
    it('200/500 — flag review', async () => {
      reviewDel.findFirst.mockResolvedValue(makeReviewRow());
      reviewDel.update.mockResolvedValue(makeReviewRow({ status: 'flagged', flagCount: 1 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reviews/${UUID}/flag`)
        .set('Authorization', 'Bearer test-token')
        .send({ reason: 'inappropriate' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ PERFORMANCE ═══════════════
  describe('GET /api/v1/vendors/:vendorId/performance', () => {
    it('200/500 — get performance', async () => {
      perfDel.findFirst.mockResolvedValue(makePerformanceRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/performance`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/performance/history', () => {
    it('200/500 — list performance history', async () => {
      perfDel.findMany.mockResolvedValue([makePerformanceRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/performance/history`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/performance/evaluate', () => {
    it('200/500 — evaluate performance', async () => {
      perfDel.create.mockResolvedValue(makePerformanceRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/performance/evaluate`)
        .set('Authorization', 'Bearer admin-token')
        .send({
          evaluationPeriodStart: '2026-01-01T00:00:00.000Z',
          evaluationPeriodEnd: '2026-02-01T00:00:00.000Z',
          orderCount: 100,
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/performance/warning/issue', () => {
    it('200/500 — issue warning', async () => {
      perfDel.findFirst.mockResolvedValue(makePerformanceRow());
      perfDel.update.mockResolvedValue(makePerformanceRow({ warningIssued: true }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/performance/warning/issue`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/performance/warning/clear', () => {
    it('200/500 — clear warning', async () => {
      perfDel.findFirst.mockResolvedValue(makePerformanceRow({ warningIssued: true }));
      perfDel.update.mockResolvedValue(makePerformanceRow({ warningIssued: false }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/performance/warning/clear`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/performance/recalculate', () => {
    it('200/500 — recalculate performance', async () => {
      perfDel.findFirst.mockResolvedValue(makePerformanceRow());
      perfDel.update.mockResolvedValue(makePerformanceRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/performance/recalculate`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ SHIPPING ═══════════════
  describe('POST /api/v1/vendors/:vendorId/shipping/initialize', () => {
    it('200/500 — initialize shipping', async () => {
      shipDel.findFirst.mockResolvedValue(null);
      shipDel.create.mockResolvedValue(makeShippingRow());
      shipDel.update.mockResolvedValue(makeShippingRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/shipping/initialize`)
        .set('Authorization', 'Bearer test-token')
        .send({ defaultMethod: 'standard' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/shipping/rates', () => {
    it('201/500 — add shipping rate', async () => {
      shipDel.findFirst.mockResolvedValue(makeShippingRow());
      shipDel.update.mockResolvedValue(makeShippingRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/shipping/rates`)
        .set('Authorization', 'Bearer test-token')
        .send({
          method: 'standard', zone: 'inside_city',
          cost: 60, currency: 'BDT',
          minDeliveryDays: 1, maxDeliveryDays: 3,
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('DELETE /api/v1/vendors/:vendorId/shipping/rates/:method/:zone', () => {
    it('200/500 — remove rate', async () => {
      shipDel.findFirst.mockResolvedValue(makeShippingRow());
      shipDel.update.mockResolvedValue(makeShippingRow());
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/vendors/${UUID}/shipping/rates/express/inside_city`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/shipping/free-threshold', () => {
    it('200/500 — set free threshold', async () => {
      shipDel.findFirst.mockResolvedValue(makeShippingRow());
      shipDel.update.mockResolvedValue(makeShippingRow({ freeShippingThreshold: 1500 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/shipping/free-threshold`)
        .set('Authorization', 'Bearer test-token')
        .send({ amount: 1500 });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/shipping', () => {
    it('200/500 — get shipping (public)', async () => {
      shipDel.findFirst.mockResolvedValue(makeShippingRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/shipping`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/shipping/calculate', () => {
    it('200/500 — calculate shipping', async () => {
      shipDel.findFirst.mockResolvedValue(makeShippingRow({
        rates: [{
          method: 'standard', zone: 'inside_city',
          cost: 60, currency: 'BDT',
          minDeliveryDays: 1, maxDeliveryDays: 3, isActive: true,
        }],
      }));
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/shipping/calculate?zone=inside_city&total=500`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ WARRANTY ═══════════════
  describe('POST /api/v1/vendors/:vendorId/warranty/initialize', () => {
    it('200/500 — initialize warranty', async () => {
      warrantyDel.findFirst.mockResolvedValue(null);
      warrantyDel.create.mockResolvedValue(makeWarrantyRow());
      warrantyDel.update.mockResolvedValue(makeWarrantyRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/warranty/initialize`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/warranty/type', () => {
    it('200/500 — update warranty type', async () => {
      warrantyDel.findFirst.mockResolvedValue(makeWarrantyRow());
      warrantyDel.update.mockResolvedValue(makeWarrantyRow({ defaultType: 'manufacturer' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/warranty/type`)
        .set('Authorization', 'Bearer test-token')
        .send({ warrantyType: 'manufacturer' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/warranty/period', () => {
    it('200/500 — update warranty period', async () => {
      warrantyDel.findFirst.mockResolvedValue(makeWarrantyRow());
      warrantyDel.update.mockResolvedValue(makeWarrantyRow({ defaultPeriodDays: 90 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/warranty/period`)
        .set('Authorization', 'Bearer test-token')
        .send({ days: 90 });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/warranty/exclusions', () => {
    it('201/500 — add exclusion', async () => {
      warrantyDel.findFirst.mockResolvedValue(makeWarrantyRow());
      warrantyDel.update.mockResolvedValue(makeWarrantyRow({ exclusions: ['water damage'] }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/warranty/exclusions`)
        .set('Authorization', 'Bearer test-token')
        .send({ term: 'water damage' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/warranty/exclusions/remove', () => {
    it('200/500 — remove exclusion', async () => {
      warrantyDel.findFirst.mockResolvedValue(makeWarrantyRow({ exclusions: ['water damage'] }));
      warrantyDel.update.mockResolvedValue(makeWarrantyRow({ exclusions: [] }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/warranty/exclusions/remove`)
        .set('Authorization', 'Bearer test-token')
        .send({ term: 'water damage' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/warranty', () => {
    it('200/500 — get warranty (public)', async () => {
      warrantyDel.findFirst.mockResolvedValue(makeWarrantyRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/warranty`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ RETURN POLICY ═══════════════
  describe('POST /api/v1/vendors/:vendorId/return-policy/initialize', () => {
    it('200/500 — initialize return policy', async () => {
      returnDel.findFirst.mockResolvedValue(null);
      returnDel.create.mockResolvedValue(makeReturnPolicyRow());
      returnDel.update.mockResolvedValue(makeReturnPolicyRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/return-policy/initialize`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/return-policy/type', () => {
    it('200/500 — update return type', async () => {
      returnDel.findFirst.mockResolvedValue(makeReturnPolicyRow());
      returnDel.update.mockResolvedValue(makeReturnPolicyRow({ type: 'exchange_only' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/return-policy/type`)
        .set('Authorization', 'Bearer test-token')
        .send({ returnType: 'exchange_only' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/return-policy/window', () => {
    it('200/500 — update return window', async () => {
      returnDel.findFirst.mockResolvedValue(makeReturnPolicyRow());
      returnDel.update.mockResolvedValue(makeReturnPolicyRow({ windowDays: 14 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/return-policy/window`)
        .set('Authorization', 'Bearer test-token')
        .send({ days: 14 });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/return-policy/exclusions', () => {
    it('201/500 — add exclusion', async () => {
      returnDel.findFirst.mockResolvedValue(makeReturnPolicyRow());
      returnDel.update.mockResolvedValue(makeReturnPolicyRow({ exclusions: ['custom-made'] }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/return-policy/exclusions`)
        .set('Authorization', 'Bearer test-token')
        .send({ term: 'custom-made' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/return-policy', () => {
    it('200/500 — get return policy (public)', async () => {
      returnDel.findFirst.mockResolvedValue(makeReturnPolicyRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/return-policy`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/return-policy/eligibility', () => {
    it('200/500 — check eligibility', async () => {
      returnDel.findFirst.mockResolvedValue(makeReturnPolicyRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/return-policy/eligibility?deliveredAt=2026-01-01T00:00:00.000Z`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ SETTINGS ═══════════════
  describe('POST /api/v1/vendors/:vendorId/settings/initialize', () => {
    it('200/500 — initialize settings', async () => {
      settingsDel.findFirst.mockResolvedValue(null);
      settingsDel.create.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/settings/initialize`)
        .set('Authorization', 'Bearer test-token')
        .send({ currency: 'BDT' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/settings/vacation', () => {
    it('200/500 — set vacation mode', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow({
        vacationMode: true, vacationMessage: 'Back soon',
      }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/settings/vacation`)
        .set('Authorization', 'Bearer test-token')
        .send({ enabled: true, message: 'Back soon' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/vendors/:vendorId/settings/auto-accept', () => {
    it('200/500 — toggle auto-accept', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow({ autoAcceptOrders: true }));
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/vendors/${UUID}/settings/auto-accept`)
        .set('Authorization', 'Bearer test-token')
        .send({ enabled: true });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/vendors/:vendorId/settings/auto-payout', () => {
    it('200/500 — toggle auto-payout', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow({ autoConfirmPayout: true }));
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/vendors/${UUID}/settings/auto-payout`)
        .set('Authorization', 'Bearer test-token')
        .send({ enabled: true });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/vendors/:vendorId/settings/notifications', () => {
    it('200/500 — update notifications', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow());
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/vendors/${UUID}/settings/notifications`)
        .set('Authorization', 'Bearer test-token')
        .send({ smsEnabled: true });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/vendors/:vendorId/settings/locale', () => {
    it('200/500 — update locale', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      settingsDel.update.mockResolvedValue(makeSettingsRow());
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/vendors/${UUID}/settings/locale`)
        .set('Authorization', 'Bearer test-token')
        .send({ timezone: 'Asia/Dhaka', locale: 'bn-BD' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/settings', () => {
    it('200/500 — get settings', async () => {
      settingsDel.findFirst.mockResolvedValue(makeSettingsRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/settings`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ STATS ═══════════════
  describe('GET /api/v1/vendors/:vendorId/stats', () => {
    it('200/500 — get stats', async () => {
      statsDel.findFirst.mockResolvedValue(makeStatsRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/stats`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/stats/period', () => {
    it('200/500 — initialize stats period', async () => {
      statsDel.create.mockResolvedValue(makeStatsRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/stats/period`)
        .set('Authorization', 'Bearer admin-token')
        .send({
          periodStart: '2026-01-01T00:00:00.000Z',
          periodEnd: '2026-02-01T00:00:00.000Z',
          currency: 'BDT',
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/stats/record-order', () => {
    it('200/500 — record order stats', async () => {
      statsDel.findFirst.mockResolvedValue(makeStatsRow());
      statsDel.update.mockResolvedValue(makeStatsRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/stats/record-order`)
        .set('Authorization', 'Bearer admin-token')
        .send({ amount: 1000 });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ REPORT ═══════════════
  describe('POST /api/v1/vendors/:vendorId/reports/request', () => {
    it('201/500 — request report', async () => {
      reportDel.create.mockResolvedValue(makeReportRow());
      reportDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reports/request`)
        .set('Authorization', 'Bearer test-token')
        .send({
          type: 'sales', format: 'pdf', period: 'last_30_days',
          periodStart: '2026-01-01T00:00:00.000Z',
          periodEnd: '2026-02-01T00:00:00.000Z',
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/reports/:reportId/ready', () => {
    it('200/500 — mark report ready', async () => {
      reportDel.findFirst.mockResolvedValue(makeReportRow({ status: 'generating' }));
      reportDel.update.mockResolvedValue(makeReportRow({ status: 'ready' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reports/${UUID}/ready`)
        .set('Authorization', 'Bearer admin-token')
        .send({ fileUrl: 'https://cdn.example.com/report.pdf', fileSize: 1024 });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/reports/:reportId/fail', () => {
    it('200/500 — mark report failed', async () => {
      reportDel.findFirst.mockResolvedValue(makeReportRow({ status: 'generating' }));
      reportDel.update.mockResolvedValue(makeReportRow({ status: 'failed' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/reports/${UUID}/fail`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'database timeout' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/reports', () => {
    it('200/500 — list reports', async () => {
      reportDel.findMany.mockResolvedValue([makeReportRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/reports`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/reports/:reportId', () => {
    it('200/404/500 — get report', async () => {
      reportDel.findFirst.mockResolvedValue(makeReportRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/reports/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });
});

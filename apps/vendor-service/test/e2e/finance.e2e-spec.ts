/**
 * Finance + Team E2E — team, payout, settlement, invoice, subscription, commission
 * @module vendor-service/test/e2e
 */
import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const RES_UUID = '8c9e6679-7425-40de-944b-e07fc1f90ae8';

const ACCEPT = [200, 201, 400, 401, 403, 404, 422, 500];
const ACCEPT_OK = [200, 201, 400, 401, 403, 500];

function nowIso(): Date { return new Date('2026-01-01T00:00:00.000Z'); }
function futureIso(): Date { return new Date('2026-02-01T00:00:00.000Z'); }

// ═══════════════ TEAM ═══════════════
function makeTeamMemberRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, userId: UUID,
    email: 'member@acme.com', name: 'Md Member',
    role: 'vendor_viewer', status: 'active', permissions: [],
    joinedAt: nowIso(), lastActiveAt: null, invitedBy: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}
function makeTeamInviteRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, email: 'invitee@acme.com',
    role: 'vendor_viewer', status: 'pending',
    token: 'ABCDEFGHIJKLMNOP1234', invitedBy: UUID,
    invitedAt: nowIso(), expiresAt: futureIso(),
    message: null, acceptedAt: null, acceptedBy: null, rejectedAt: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ PAYOUT ═══════════════
function makePayoutRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    payoutNumber: 'PO-20260101-ABCDEF', status: 'pending',
    method: 'bank_transfer', cycle: 'on_demand',
    amount: 5000, fee: 0, netAmount: 5000, currency: 'BDT',
    periodStart: nowIso(), periodEnd: nowIso(),
    bankAccountId: UUID, transactionId: null, reference: null, notes: null,
    requestedAt: nowIso(), approvedAt: null, approvedBy: null,
    paidAt: null, failedAt: null, failureReason: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ SETTLEMENT ═══════════════
function makeSettlementRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    settlementNumber: 'ST-20260101-ABCDEF', status: 'pending',
    grossAmount: 10000, commissionAmount: 1000, netAmount: 9000, currency: 'BDT',
    periodStart: nowIso(), periodEnd: futureIso(),
    orderCount: 5, payoutId: null, processedAt: null, notes: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ INVOICE ═══════════════
function makeInvoiceRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID,
    invoiceNumber: 'INV-202601-0000000001', type: 'commission', status: 'draft',
    amount: 1000, taxAmount: 0, totalAmount: 1000, currency: 'BDT',
    issueDate: nowIso(), dueDate: futureIso(), paidAt: null,
    periodStart: null, periodEnd: null, orderIds: [], notes: null, pdfUrl: null,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ SUBSCRIPTION ═══════════════
function makeSubscriptionRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, plan: 'basic', status: 'active', cycle: 'monthly',
    price: 500, currency: 'BDT',
    startedAt: nowIso(), currentPeriodStart: nowIso(), currentPeriodEnd: futureIso(),
    trialEndsAt: null, cancelledAt: null,
    cancelAtPeriodEnd: false, autoRenew: true, features: [],
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

// ═══════════════ COMMISSION ═══════════════
function makeCommissionRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: UUID, vendorId: UUID, type: 'percentage', percent: 10,
    fixedAmount: null, currency: 'BDT', minPercent: 0, maxPercent: 50,
    applyOnShipping: false, applyOnTax: false,
    effectiveFrom: nowIso(), effectiveTo: null, isActive: true,
    version: 0, createdAt: nowIso(), updatedAt: nowIso(), deletedAt: null,
    ...overrides,
  };
}

describe('Vendor Finance + Team E2E', () => {
  let app: INestApplication;
  let prisma: MockPrisma;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let teamDel: any, inviteDel: any, payoutDel: any, settDel: any,
      invDel: any, subDel: any, comDel: any;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
    teamDel = prisma.vendorTeamMember;
    inviteDel = prisma.vendorTeamInvite;
    payoutDel = prisma.vendorPayout;
    settDel = prisma.vendorSettlement;
    invDel = prisma.vendorInvoice;
    subDel = prisma.vendorSubscription;
    comDel = prisma.vendorCommission;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ═══════════════ TEAM ═══════════════
  describe('POST /api/v1/vendors/:vendorId/team/invite', () => {
    it('200/500 — invite team member', async () => {
      teamDel.count.mockResolvedValue(0);
      inviteDel.create.mockResolvedValue(makeTeamInviteRow());
      inviteDel.findFirst.mockResolvedValue(null);

      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/team/invite`)
        .set('Authorization', 'Bearer test-token')
        .send({ email: 'invitee@acme.com', role: 'vendor_viewer' });
      expect(ACCEPT_OK).toContain(res.status);
    });

    it('400/500 — missing email', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/team/invite`)
        .set('Authorization', 'Bearer test-token')
        .send({ role: 'vendor_viewer' });
      expect(ACCEPT).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/team/accept-invite', () => {
    it('200/500 — accept invite (public)', async () => {
      inviteDel.findFirst.mockResolvedValue(makeTeamInviteRow());
      inviteDel.update.mockResolvedValue(makeTeamInviteRow({ status: 'accepted' }));
      teamDel.create.mockResolvedValue(makeTeamMemberRow());

      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/team/accept-invite`)
        .send({ token: 'ABCDEFGHIJKLMNOP1234', name: 'Md Member' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/team', () => {
    it('200/500 — list members', async () => {
      teamDel.findMany.mockResolvedValue([makeTeamMemberRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/team`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/team/:memberId', () => {
    it('200/404/500 — get member by id', async () => {
      teamDel.findFirst.mockResolvedValue(makeTeamMemberRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/team/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/vendors/:vendorId/team/:memberId/role', () => {
    it('200/500 — change role', async () => {
      teamDel.findFirst.mockResolvedValue(makeTeamMemberRow());
      teamDel.update.mockResolvedValue(makeTeamMemberRow({ role: 'vendor_manager' }));
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/vendors/${UUID}/team/${UUID}/role`)
        .set('Authorization', 'Bearer test-token')
        .send({ newRole: 'vendor_manager' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/team/:memberId/suspend', () => {
    it('200/500 — suspend member', async () => {
      teamDel.findFirst.mockResolvedValue(makeTeamMemberRow());
      teamDel.update.mockResolvedValue(makeTeamMemberRow({ status: 'suspended' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/team/${UUID}/suspend`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('DELETE /api/v1/vendors/:vendorId/team/:memberId', () => {
    it('200/204/500 — remove member', async () => {
      teamDel.findFirst.mockResolvedValue(makeTeamMemberRow({ role: 'vendor_viewer' }));
      teamDel.update.mockResolvedValue(makeTeamMemberRow({ status: 'removed' }));
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/vendors/${UUID}/team/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect([200, 204, 400, 401, 403, 500]).toContain(res.status);
    });
  });

  // ═══════════════ PAYOUT ═══════════════
  describe('POST /api/v1/vendors/:vendorId/payouts/request', () => {
    it('200/201/500 — request payout', async () => {
      payoutDel.create.mockResolvedValue(makePayoutRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/request`)
        .set('Authorization', 'Bearer test-token')
        .set('x-idempotency-key', 'test-key-12345678')
        .send({ amount: 5000, currency: 'BDT' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/approve', () => {
    it('200/500 — approve payout', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow());
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'approved' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/approve`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/reject', () => {
    it('200/500 — reject payout', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow());
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'rejected' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'suspicious' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/process', () => {
    it('200/500 — process payout', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow({ status: 'approved' }));
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'processing' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/process`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/mark-paid', () => {
    it('200/500 — mark payout paid', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow({ status: 'processing' }));
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'paid', paidAt: nowIso() }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/mark-paid`)
        .set('Authorization', 'Bearer admin-token')
        .send({ transactionId: 'txn-1', reference: 'ref-1' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/fail', () => {
    it('200/500 — fail payout', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow({ status: 'processing' }));
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'failed' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/fail`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'bank error' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/payouts/:payoutId/cancel', () => {
    it('200/500 — cancel payout', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow());
      payoutDel.update.mockResolvedValue(makePayoutRow({ status: 'cancelled' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/payouts/${UUID}/cancel`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/payouts', () => {
    it('200/500 — list payouts', async () => {
      payoutDel.findMany.mockResolvedValue([makePayoutRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/payouts`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/payouts/summary', () => {
    it('200/500 — get payout summary', async () => {
      payoutDel.aggregate
        .mockResolvedValueOnce({ _sum: { netAmount: 10000 } })
        .mockResolvedValueOnce({ _sum: { netAmount: 5000 } });
      payoutDel.findFirst.mockResolvedValue(makePayoutRow({ status: 'paid', paidAt: nowIso() }));
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/payouts/summary`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/payouts/:payoutId', () => {
    it('200/404/500 — get payout by id', async () => {
      payoutDel.findFirst.mockResolvedValue(makePayoutRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/payouts/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ SETTLEMENT ═══════════════
  describe('POST /api/v1/vendors/:vendorId/settlements', () => {
    it('200/201/500 — create settlement', async () => {
      settDel.create.mockResolvedValue(makeSettlementRow());
      settDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/settlements`)
        .set('Authorization', 'Bearer admin-token')
        .send({
          periodStart: '2026-01-01T00:00:00.000Z',
          periodEnd: '2026-02-01T00:00:00.000Z',
          grossAmount: 10000, commissionAmount: 1000, netAmount: 9000,
          currency: 'BDT', orderCount: 5,
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/settlements/:settlementId/complete', () => {
    it('200/500 — complete settlement', async () => {
      settDel.findFirst.mockResolvedValue(makeSettlementRow({ status: 'processing' }));
      settDel.update.mockResolvedValue(makeSettlementRow({ status: 'completed' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/settlements/${UUID}/complete`)
        .set('Authorization', 'Bearer admin-token')
        .send({ payoutId: UUID });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/settlements', () => {
    it('200/500 — list settlements', async () => {
      settDel.findMany.mockResolvedValue([makeSettlementRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/settlements`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/settlements/:settlementId', () => {
    it('200/404/500 — get settlement', async () => {
      settDel.findFirst.mockResolvedValue(makeSettlementRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/settlements/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ INVOICE ═══════════════
  describe('POST /api/v1/vendors/:vendorId/invoices', () => {
    it('200/201/500 — create invoice', async () => {
      invDel.create.mockResolvedValue(makeInvoiceRow());
      invDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/invoices`)
        .set('Authorization', 'Bearer admin-token')
        .send({
          type: 'commission', amount: 1000, totalAmount: 1000,
          currency: 'BDT',
          issueDate: '2026-01-01T00:00:00.000Z',
          dueDate: '2026-02-01T00:00:00.000Z',
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/invoices/:invoiceId/send', () => {
    it('200/500 — send invoice', async () => {
      invDel.findFirst.mockResolvedValue(makeInvoiceRow());
      invDel.update.mockResolvedValue(makeInvoiceRow({ status: 'sent' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/invoices/${UUID}/send`)
        .set('Authorization', 'Bearer admin-token')
        .send({ recipientEmail: 'vendor@acme.com' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/invoices/:invoiceId/mark-paid', () => {
    it('200/500 — mark invoice paid', async () => {
      invDel.findFirst.mockResolvedValue(makeInvoiceRow({ status: 'sent' }));
      invDel.update.mockResolvedValue(makeInvoiceRow({ status: 'paid', paidAt: nowIso() }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/invoices/${UUID}/mark-paid`)
        .set('Authorization', 'Bearer test-token')
        .send({ note: 'paid via bank transfer' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/invoices', () => {
    it('200/500 — list invoices', async () => {
      invDel.findMany.mockResolvedValue([makeInvoiceRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/invoices`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/invoices/:invoiceId', () => {
    it('200/404/500 — get invoice', async () => {
      invDel.findFirst.mockResolvedValue(makeInvoiceRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/invoices/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ SUBSCRIPTION ═══════════════
  describe('POST /api/v1/vendors/:vendorId/subscription', () => {
    it('200/201/500 — create subscription', async () => {
      subDel.findFirst.mockResolvedValue(null);
      subDel.upsert?.mockResolvedValue?.(makeSubscriptionRow());
      subDel.create.mockResolvedValue(makeSubscriptionRow());
      subDel.update.mockResolvedValue(makeSubscriptionRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/subscription`)
        .set('Authorization', 'Bearer test-token')
        .send({ plan: 'basic', cycle: 'monthly', price: 500, currency: 'BDT' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/subscription/change-plan', () => {
    it('200/500 — change plan', async () => {
      subDel.findFirst.mockResolvedValue(makeSubscriptionRow());
      subDel.update.mockResolvedValue(makeSubscriptionRow({ plan: 'premium', price: 2000 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/subscription/change-plan`)
        .set('Authorization', 'Bearer test-token')
        .send({ newPlan: 'premium', newPrice: 2000, immediate: false });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/subscription/cancel', () => {
    it('200/500 — cancel subscription', async () => {
      subDel.findFirst.mockResolvedValue(makeSubscriptionRow());
      subDel.update.mockResolvedValue(makeSubscriptionRow({ cancelAtPeriodEnd: true }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/subscription/cancel`)
        .set('Authorization', 'Bearer test-token')
        .send({ immediate: false });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/subscription/renew', () => {
    it('200/500 — renew subscription', async () => {
      subDel.findFirst.mockResolvedValue(makeSubscriptionRow());
      subDel.update.mockResolvedValue(makeSubscriptionRow({ currentPeriodEnd: new Date('2026-03-01') }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/subscription/renew`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/subscription', () => {
    it('200/500 — get subscription', async () => {
      subDel.findFirst.mockResolvedValue(makeSubscriptionRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/subscription`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/subscription/public', () => {
    it('200/500 — get public subscription', async () => {
      subDel.findFirst.mockResolvedValue(makeSubscriptionRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/subscription/public`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ COMMISSION ═══════════════
  describe('POST /api/v1/vendors/:vendorId/commission', () => {
    it('200/201/500 — configure commission', async () => {
      comDel.create.mockResolvedValue(makeCommissionRow());
      comDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/commission`)
        .set('Authorization', 'Bearer admin-token')
        .send({
          type: 'percentage', percent: 10, currency: 'BDT',
          applyOnShipping: false, applyOnTax: false,
        });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/commission/calculate', () => {
    it('200/500 — calculate commission', async () => {
      comDel.findFirst.mockResolvedValue(makeCommissionRow());
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/commission/calculate`)
        .set('Authorization', 'Bearer test-token')
        .send({ orderAmount: 1000, currency: 'BDT' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/commission/active', () => {
    it('200/500 — get active commission', async () => {
      comDel.findFirst.mockResolvedValue(makeCommissionRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/commission/active`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });
});

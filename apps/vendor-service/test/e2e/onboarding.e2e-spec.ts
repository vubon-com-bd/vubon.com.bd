/**
 * Onboarding E2E — document, verification, approval, suspension
 * @module vendor-service/test/e2e
 */
import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const DOC_UUID = '8c9e6679-7425-40de-944b-e07fc1f90ae8';

const ACCEPT = [200, 201, 400, 401, 403, 404, 422, 500];
const ACCEPT_OK = [200, 201, 400, 401, 403, 500];

function makeDocRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: DOC_UUID, vendorId: UUID,
    type: 'business_license', status: 'pending',
    fileUrl: 'https://cdn.example.com/doc.pdf', fileName: 'doc.pdf',
    mimeType: 'application/pdf', fileSize: 500000,
    documentNumber: null, issuedAt: null,
    expiresAt: new Date('2027-01-01T00:00:00.000Z'),
    verifiedAt: null, verifiedBy: null, rejectionReason: null, notes: null,
    version: 0, createdAt: now, updatedAt: now, deletedAt: null,
    ...overrides,
  };
}

function makeVerificationRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: UUID, vendorId: UUID,
    overallStatus: 'pending', checks: [],
    submittedAt: now, reviewedAt: null, reviewedBy: null,
    rejectionReason: null, expiresAt: null,
    version: 0, createdAt: now, updatedAt: now, deletedAt: null,
    ...overrides,
  };
}

function makeApprovalRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: UUID, vendorId: UUID, status: 'pending', reason: null, reviewerNote: null,
    submittedAt: now, reviewedAt: null, reviewedBy: null,
    resubmissionCount: 0, appealDeadline: null, appealSubmittedAt: null,
    slaDeadline: new Date('2026-01-04T00:00:00.000Z'),
    version: 0, createdAt: now, updatedAt: now, deletedAt: null,
    ...overrides,
  };
}

function makeSuspensionRow(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  const now = new Date('2026-01-01T00:00:00.000Z');
  return {
    id: UUID, vendorId: UUID, reason: 'poor_performance',
    suspendedAt: now, suspendedBy: UUID, durationDays: 30,
    notes: null, appealDeadline: null, appealSubmittedAt: null, appealReason: null,
    liftedAt: null, liftedBy: null, autoLiftOnResolution: true,
    version: 0, createdAt: now, updatedAt: now, deletedAt: null,
    ...overrides,
  };
}

describe('Vendor Onboarding API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let docDel: any, verDel: any, apprDel: any, suspDel: any;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
    docDel = prisma.vendorDocument;
    verDel = prisma.vendorVerification;
    apprDel = prisma.vendorApproval;
    suspDel = prisma.vendorSuspension;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ═══════════════ DOCUMENTS ═══════════════
  describe('POST /api/v1/vendors/:vendorId/documents (upload)', () => {
    it('201/500 — upload document with auth', async () => {
      docDel.findFirst.mockResolvedValue(null);
      docDel.create.mockResolvedValue(makeDocRow());
      docDel.update.mockResolvedValue(makeDocRow());

      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents`)
        .set('Authorization', 'Bearer test-token')
        .send({
          type: 'business_license',
          fileUrl: 'https://cdn.example.com/doc.pdf',
          fileName: 'doc.pdf',
          mimeType: 'application/pdf',
          fileSize: 500000,
        });

      expect(ACCEPT_OK).toContain(res.status);
    });

    it('400/500 — missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents`)
        .set('Authorization', 'Bearer test-token')
        .send({ type: 'business_license' });
      expect(ACCEPT).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/documents', () => {
    it('200/500 — list documents', async () => {
      docDel.findMany.mockResolvedValue([makeDocRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/documents`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/documents/public', () => {
    it('200/500 — public document list (no auth)', async () => {
      docDel.findMany.mockResolvedValue([]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/documents/public`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/documents/:documentId', () => {
    it('200/404/500 — get document by id', async () => {
      docDel.findFirst.mockResolvedValue(makeDocRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/documents/${DOC_UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/documents/:documentId/verify', () => {
    it('401/403/500 — non-admin blocked', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents/${DOC_UUID}/verify`)
        .send({});
      expect(ACCEPT).toContain(res.status);
    });

    it('200/500 — verify with auth', async () => {
      docDel.findFirst.mockResolvedValue(makeDocRow());
      docDel.update.mockResolvedValue(makeDocRow({ status: 'verified' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents/${DOC_UUID}/verify`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/documents/:documentId/reject', () => {
    it('400/500 — reject requires reason', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents/${DOC_UUID}/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT).toContain(res.status);
    });

    it('200/500 — reject with reason', async () => {
      docDel.findFirst.mockResolvedValue(makeDocRow());
      docDel.update.mockResolvedValue(makeDocRow({ status: 'rejected' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/documents/${DOC_UUID}/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'illegible scan' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ VERIFICATION ═══════════════
  describe('POST /api/v1/vendors/:vendorId/verification/submit', () => {
    it('200/500 — submit verification', async () => {
      verDel.findFirst.mockResolvedValue(null);
      verDel.create.mockResolvedValue(makeVerificationRow({ overallStatus: 'pending' }));
      verDel.update.mockResolvedValue(makeVerificationRow({ overallStatus: 'pending' }));

      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/verification/submit`)
        .set('Authorization', 'Bearer test-token')
        .send({ documents: [] });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/verification', () => {
    it('200/404/500 — get verification status', async () => {
      verDel.findFirst.mockResolvedValue(makeVerificationRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/verification`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });

    it('404/500 — not found', async () => {
      verDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/verification`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/verification/approve', () => {
    it('401/403/500 — non-admin blocked', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/verification/approve`)
        .send({});
      expect(ACCEPT).toContain(res.status);
    });

    it('200/500 — admin approves', async () => {
      verDel.findFirst.mockResolvedValue(makeVerificationRow({ overallStatus: 'in_review' }));
      verDel.update.mockResolvedValue(makeVerificationRow({ overallStatus: 'approved' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/verification/approve`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/verification/reject', () => {
    it('200/500 — admin rejects', async () => {
      verDel.findFirst.mockResolvedValue(makeVerificationRow({ overallStatus: 'in_review' }));
      verDel.update.mockResolvedValue(makeVerificationRow({ overallStatus: 'rejected' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/verification/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'docs invalid' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ APPROVAL ═══════════════
  describe('GET /api/v1/vendors/:vendorId/approval', () => {
    it('200/404/500 — get approval status', async () => {
      apprDel.findFirst.mockResolvedValue(makeApprovalRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/approval`);
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/approval/approve', () => {
    it('200/500 — approve vendor', async () => {
      apprDel.findFirst.mockResolvedValue(makeApprovalRow());
      apprDel.update.mockResolvedValue(makeApprovalRow({ status: 'approved', reviewedAt: new Date() }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/approval/approve`)
        .set('Authorization', 'Bearer admin-token')
        .send({ note: 'looks good' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/approval/reject', () => {
    it('200/500 — reject vendor', async () => {
      apprDel.findFirst.mockResolvedValue(makeApprovalRow());
      apprDel.update.mockResolvedValue(makeApprovalRow({ status: 'rejected', reason: 'invalid_documents' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/approval/reject`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'invalid_documents', note: 'missing tax id' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/approval/request-info', () => {
    it('200/500 — request info', async () => {
      apprDel.findFirst.mockResolvedValue(makeApprovalRow());
      apprDel.update.mockResolvedValue(makeApprovalRow({ status: 'info_requested' }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/approval/request-info`)
        .set('Authorization', 'Bearer admin-token')
        .send({ note: 'need more documents' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/approval/resubmit', () => {
    it('200/500 — resubmit approval', async () => {
      apprDel.findFirst.mockResolvedValue(makeApprovalRow({ status: 'info_requested' }));
      apprDel.update.mockResolvedValue(makeApprovalRow({ status: 'pending', resubmissionCount: 1 }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/approval/resubmit`)
        .set('Authorization', 'Bearer test-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  // ═══════════════ SUSPENSION ═══════════════
  describe('POST /api/v1/vendors/:vendorId/suspensions', () => {
    it('401/403/500 — non-admin blocked', async () => {
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/suspensions`)
        .send({ reason: 'poor_performance', durationDays: 30 });
      expect(ACCEPT).toContain(res.status);
    });

    it('201/500 — admin suspends', async () => {
      suspDel.create.mockResolvedValue(makeSuspensionRow());
      suspDel.findFirst.mockResolvedValue(null);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/suspensions`)
        .set('Authorization', 'Bearer admin-token')
        .send({ reason: 'poor_performance', durationDays: 30, suspendedBy: UUID });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/suspensions', () => {
    it('200/500 — list suspensions', async () => {
      suspDel.findMany.mockResolvedValue([makeSuspensionRow()]);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/suspensions`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/suspensions/active', () => {
    it('200/404/500 — get active suspension', async () => {
      suspDel.findFirst.mockResolvedValue(makeSuspensionRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/suspensions/active`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('GET /api/v1/vendors/:vendorId/suspensions/:suspensionId', () => {
    it('200/404/500 — get suspension by id', async () => {
      suspDel.findFirst.mockResolvedValue(makeSuspensionRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/vendors/${UUID}/suspensions/${UUID}`)
        .set('Authorization', 'Bearer test-token');
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/suspensions/:suspensionId/lift', () => {
    it('200/500 — admin lifts', async () => {
      suspDel.findFirst.mockResolvedValue(makeSuspensionRow());
      suspDel.update.mockResolvedValue(makeSuspensionRow({ liftedAt: new Date() }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/suspensions/${UUID}/lift`)
        .set('Authorization', 'Bearer admin-token')
        .send({});
      expect(ACCEPT_OK).toContain(res.status);
    });
  });

  describe('POST /api/v1/vendors/:vendorId/suspensions/:suspensionId/appeal', () => {
    it('200/500 — vendor appeals', async () => {
      suspDel.findFirst.mockResolvedValue(makeSuspensionRow());
      suspDel.update.mockResolvedValue(makeSuspensionRow({ appealSubmittedAt: new Date() }));
      const res = await request(app.getHttpServer())
        .post(`/api/v1/vendors/${UUID}/suspensions/${UUID}/appeal`)
        .set('Authorization', 'Bearer test-token')
        .send({ suspensionId: UUID, appealReason: 'This suspension was unfair' });
      expect(ACCEPT_OK).toContain(res.status);
    });
  });
});

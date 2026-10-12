import { jest } from '@jest/globals';
import { VendorVerificationService } from '../../../../src/module/application/services/impl/vendor-verification.service.js';
import type { VendorVerificationRepository } from '../../../../src/module/domain/repositories/vendor-verification.repository.interface.js';
import { VendorVerificationEntity } from '../../../../src/module/domain/entities/vendor-verification.entity.js';
import { VerificationStatusVO } from '../../../../src/module/domain/value-objects/primitives/verification-status.vo.js';
import { VerificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/verification-type.vo.js';
import { VerificationNotSubmittableError } from '../../../../src/module/application/errors/verification.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeVerification(): VendorVerificationEntity {
  return VendorVerificationEntity.create({ id: UUID, vendorId: UUID, now: NOW });
}

function makeApprovedVerification(): VendorVerificationEntity {
  const checks = [
    { type: VerificationTypeVO.create('email'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('phone'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('business_license'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('tax_id'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('bank_account'), status: VerificationStatusVO.approved() },
    { type: VerificationTypeVO.create('identity'), status: VerificationStatusVO.approved() },
  ];
  const v = VendorVerificationEntity.reconstitute({
    id: UUID,
    createdAt: NOW,
    updatedAt: NOW,
    props: {
      vendorId: UUID,
      overallStatus: VerificationStatusVO.notStarted(),
      checks,
    },
  });
  return v;
}

function makeRepoMock(): jest.Mocked<VendorVerificationRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findPendingReview: jest.fn(),
    findReviewPastSla: jest.fn(),
    findExpired: jest.fn(),
    findExpiring: jest.fn(),
    countByStatus: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorVerificationRepository>;
}

describe('VendorVerificationService', () => {
  let service: VendorVerificationService;
  let repo: jest.Mocked<VendorVerificationRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorVerificationService(repo);
  });

  describe('submit()', () => {
    it('submits when no record exists', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      const fresh = makeVerification();
      repo.upsert.mockResolvedValue(fresh);
      const r = await service.submit({ vendorId: UUID, documents: [] });
      expect(r.id).toBe(UUID);
    });

    it('submits existing record', async () => {
      const v = makeVerification();
      repo.findByVendorId.mockResolvedValue(v);
      repo.upsert.mockResolvedValue(v);
      const r = await service.submit({ vendorId: UUID, documents: [] });
      expect(r.id).toBe(UUID);
    });
  });

  describe('startReview()', () => {
    it('starts review for pending', async () => {
      const v = makeVerification();
      v.submit(NOW);
      repo.findByVendorId.mockResolvedValue(v);
      repo.upsert.mockResolvedValue(v);
      const r = await service.startReview(UUID, UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when no record', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.startReview(UUID, UUID)).rejects.toThrow(
        VerificationNotSubmittableError,
      );
    });
  });

  describe('approve()', () => {
    it('approves when all checks pass', async () => {
      const v = makeApprovedVerification();
      v.submit(NOW);
      v.startReview(UUID, NOW);
      repo.findByVendorId.mockResolvedValue(v);
      repo.upsert.mockResolvedValue(v);
      const r = await service.approve(UUID, UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('reject()', () => {
    it('rejects in-review verification', async () => {
      const v = makeVerification();
      v.submit(NOW);
      v.startReview(UUID, NOW);
      repo.findByVendorId.mockResolvedValue(v);
      repo.upsert.mockResolvedValue(v);
      const r = await service.reject(UUID, UUID, 'docs invalid');
      expect(r.id).toBe(UUID);
    });
  });

  describe('getByVendorId()', () => {
    it('returns verification', async () => {
      repo.findByVendorId.mockResolvedValue(makeVerification());
      const r = await service.getByVendorId(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow(
        VerificationNotSubmittableError,
      );
    });
  });
});

import { jest } from '@jest/globals';
import { VendorApprovalService } from '../../../../src/module/application/services/impl/vendor-approval.service.js';
import type { VendorApprovalRepository } from '../../../../src/module/domain/repositories/vendor-approval.repository.interface.js';
import { VendorApprovalEntity } from '../../../../src/module/domain/entities/vendor-approval.entity.js';
import { ApprovalReasonVO } from '../../../../src/module/domain/value-objects/primitives/approval-reason.vo.js';
import { ApprovalNotFoundError } from '../../../../src/module/application/errors/approval.errors.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeApproval(): VendorApprovalEntity {
  return VendorApprovalEntity.create({ id: UUID, vendorId: UUID, now: NOW });
}

function makeRepoMock(): jest.Mocked<VendorApprovalRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    existsByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findPendingPastSla: jest.fn(),
    findAppealable: jest.fn(),
    countByStatus: jest.fn(),
    getStats: jest.fn(),
    upsert: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorApprovalRepository>;
}

describe('VendorApprovalService', () => {
  let service: VendorApprovalService;
  let repo: jest.Mocked<VendorApprovalRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorApprovalService(repo);
  });

  describe('approve()', () => {
    it('approves pending approval', async () => {
      const a = makeApproval();
      repo.findByVendorId.mockResolvedValue(a);
      repo.upsert.mockResolvedValue(a);
      const r = await service.approve({ vendorId: UUID, reviewedBy: UUID });
      expect(r.id).toBe(UUID);
      expect(repo.upsert).toHaveBeenCalled();
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.approve({ vendorId: UUID, reviewedBy: UUID })).rejects.toThrow(
        ApprovalNotFoundError,
      );
    });
  });

  describe('reject()', () => {
    it('rejects pending approval', async () => {
      const a = makeApproval();
      repo.findByVendorId.mockResolvedValue(a);
      repo.upsert.mockResolvedValue(a);
      const r = await service.reject({
        vendorId: UUID,
        reviewedBy: UUID,
        reason: 'invalid_documents',
      });
      expect(r.id).toBe(UUID);
    });
  });

  describe('requestInfo()', () => {
    it('requests info', async () => {
      const a = makeApproval();
      repo.findByVendorId.mockResolvedValue(a);
      repo.upsert.mockResolvedValue(a);
      const r = await service.requestInfo(UUID, UUID, 'provide tax cert');
      expect(r.id).toBe(UUID);
    });
  });

  describe('resubmit()', () => {
    it('resubmits after info request', async () => {
      const a = makeApproval();
      a.requestInfo(UUID, 'note', NOW);
      repo.findByVendorId.mockResolvedValue(a);
      repo.upsert.mockResolvedValue(a);
      const r = await service.resubmit(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('fileAppeal()', () => {
    it('files appeal after rejection', async () => {
      const a = makeApproval();
      a.reject(UUID, ApprovalReasonVO.create('invalid_documents'), undefined, NOW);
      repo.findByVendorId.mockResolvedValue(a);
      repo.upsert.mockResolvedValue(a);
      const r = await service.fileAppeal(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('getByVendorId()', () => {
    it('returns approval', async () => {
      repo.findByVendorId.mockResolvedValue(makeApproval());
      const r = await service.getByVendorId(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findByVendorId.mockResolvedValue(null);
      await expect(service.getByVendorId(UUID)).rejects.toThrow(ApprovalNotFoundError);
    });
  });
});

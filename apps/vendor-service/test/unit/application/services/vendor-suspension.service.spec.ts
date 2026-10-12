import { jest } from '@jest/globals';
import { VendorSuspensionService } from '../../../../src/module/application/services/impl/vendor-suspension.service.js';
import type { VendorSuspensionRepository } from '../../../../src/module/domain/repositories/vendor-suspension.repository.interface.js';
import { VendorSuspensionEntity } from '../../../../src/module/domain/entities/vendor-suspension.entity.js';
import { SuspensionReasonVO } from '../../../../src/module/domain/value-objects/primitives/suspension-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();

function makeSuspension(): VendorSuspensionEntity {
  return VendorSuspensionEntity.create({
    id: UUID,
    vendorId: UUID,
    reason: SuspensionReasonVO.create('poor_performance'),
    durationDays: 30,
    suspendedBy: UUID,
    now: NOW,
  });
}

function makeRepoMock(): jest.Mocked<VendorSuspensionRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findActiveByVendorId: jest.fn(),
    findLatestByVendorId: jest.fn(),
    findActive: jest.fn(),
    findExpiredButActive: jest.fn(),
    findWithPendingAppeal: jest.fn(),
    findAutoLiftCandidates: jest.fn(),
    countActive: jest.fn(),
    countByVendor: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorSuspensionRepository>;
}

describe('VendorSuspensionService', () => {
  let service: VendorSuspensionService;
  let repo: jest.Mocked<VendorSuspensionRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorSuspensionService(repo);
  });

  describe('suspend()', () => {
    it('creates and saves suspension', async () => {
      const s = makeSuspension();
      repo.save.mockResolvedValue(s);
      const r = await service.suspend({
        vendorId: UUID,
        reason: 'poor_performance',
        durationDays: 30,
        suspendedBy: UUID,
      });
      expect(r.id).toBe(UUID);
    });
  });

  describe('lift()', () => {
    it('lifts active suspension', async () => {
      const s = makeSuspension();
      repo.findActiveByVendorId.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const r = await service.lift({ vendorId: UUID, liftedBy: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when no active suspension', async () => {
      repo.findActiveByVendorId.mockResolvedValue(null);
      await expect(service.lift({ vendorId: UUID, liftedBy: UUID })).rejects.toThrow();
    });
  });

  describe('appeal()', () => {
    it('files appeal', async () => {
      const s = makeSuspension();
      repo.findById.mockResolvedValue(s);
      repo.save.mockResolvedValue(s);
      const r = await service.appeal({
        vendorId: UUID,
        suspensionId: UUID,
        appealReason: 'This is a valid appeal reason',
      });
      expect(r.id).toBe(UUID);
    });

    it('throws when suspension not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.appeal({
          vendorId: UUID,
          suspensionId: UUID,
          appealReason: 'reason',
        }),
      ).rejects.toThrow();
    });
  });

  describe('getById()', () => {
    it('returns suspension', async () => {
      repo.findById.mockResolvedValue(makeSuspension());
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('getActiveByVendorId()', () => {
    it('returns active suspension', async () => {
      repo.findActiveByVendorId.mockResolvedValue(makeSuspension());
      const r = await service.getActiveByVendorId(UUID);
      expect(r?.id).toBe(UUID);
    });

    it('returns null when none active', async () => {
      repo.findActiveByVendorId.mockResolvedValue(null);
      const r = await service.getActiveByVendorId(UUID);
      expect(r).toBeNull();
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeSuspension()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});

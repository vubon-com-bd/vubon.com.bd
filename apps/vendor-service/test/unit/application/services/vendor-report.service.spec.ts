import { jest } from '@jest/globals';
import { VendorReportService } from '../../../../src/module/application/services/impl/vendor-report.service.js';
import type { VendorReportRepository } from '../../../../src/module/domain/repositories/vendor-report.repository.interface.js';
import { VendorReportEntity } from '../../../../src/module/domain/entities/vendor-report.entity.js';
import { VendorReportTypeVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-type.vo.js';
import { VendorReportFormatVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-format.vo.js';
import { VendorReportPeriodVO } from '../../../../src/module/domain/value-objects/primitives/vendor-report-period.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const END = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

function makeReport(): VendorReportEntity {
  return VendorReportEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      type: VendorReportTypeVO.create('sales'),
      format: VendorReportFormatVO.create('pdf'),
      period: VendorReportPeriodVO.create('last_30_days'),
      periodStart: NOW,
      periodEnd: END,
    },
  });
}

function makeRepoMock(): jest.Mocked<VendorReportRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findByType: jest.fn(),
    search: jest.fn(),
    findInProgress: jest.fn(),
    findExpiredReady: jest.fn(),
    findDownloadableByVendorId: jest.fn(),
    countByVendor: jest.fn(),
    countByStatus: jest.fn(),
    countRecentByVendorId: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    deleteByVendorId: jest.fn(),
  } as unknown as jest.Mocked<VendorReportRepository>;
}

describe('VendorReportService', () => {
  let service: VendorReportService;
  let repo: jest.Mocked<VendorReportRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorReportService(repo);
  });

  describe('request()', () => {
    it('creates + saves report', async () => {
      repo.save.mockResolvedValue(makeReport());
      const r = await service.request(
        {
          vendorId: UUID,
          type: 'sales',
          format: 'pdf',
          period: 'last_30_days',
          periodStart: NOW,
          periodEnd: END,
        },
        UUID,
      );
      expect(r.id).toBe(UUID);
    });
  });

  describe('startGenerating()', () => {
    it('moves to generating', async () => {
      const rep = makeReport();
      repo.findById.mockResolvedValue(rep);
      repo.save.mockResolvedValue(rep);
      const r = await service.startGenerating(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.startGenerating(UUID)).rejects.toThrow();
    });
  });

  describe('markReady()', () => {
    it('marks ready with fileUrl', async () => {
      const rep = makeReport();
      rep.startGenerating(NOW);
      repo.findById.mockResolvedValue(rep);
      repo.save.mockResolvedValue(rep);
      const r = await service.markReady(UUID, 'https://cdn.example.com/report.pdf', 1024);
      expect(r.id).toBe(UUID);
    });
  });

  describe('markFailed()', () => {
    it('marks failed', async () => {
      const rep = makeReport();
      rep.startGenerating(NOW);
      repo.findById.mockResolvedValue(rep);
      repo.save.mockResolvedValue(rep);
      const r = await service.markFailed(UUID, 'db timeout');
      expect(r.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns report', async () => {
      repo.findById.mockResolvedValue(makeReport());
      const r = await service.getById(UUID);
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('listByVendor()', () => {
    it('returns list', async () => {
      repo.findByVendorId.mockResolvedValue([makeReport()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });

  describe('listDownloadableByVendor()', () => {
    it('returns list', async () => {
      repo.findDownloadableByVendorId.mockResolvedValue([makeReport()]);
      const r = await service.listDownloadableByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});

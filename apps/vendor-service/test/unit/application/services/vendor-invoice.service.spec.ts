import { jest } from '@jest/globals';
import { VendorInvoiceService } from '../../../../src/module/application/services/impl/vendor-invoice.service.js';
import type { VendorInvoiceRepository } from '../../../../src/module/domain/repositories/vendor-invoice.repository.interface.js';
import { VendorInvoiceEntity } from '../../../../src/module/domain/entities/vendor-invoice.entity.js';
import { InvoiceNumberVO } from '../../../../src/module/domain/value-objects/primitives/invoice-number.vo.js';
import { InvoiceTypeVO } from '../../../../src/module/domain/value-objects/primitives/invoice-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = new Date().toISOString();
const DUE = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString();

function makeInvoice(): VendorInvoiceEntity {
  return VendorInvoiceEntity.create({
    id: UUID,
    now: NOW,
    props: {
      vendorId: UUID,
      invoiceNumber: InvoiceNumberVO.generate(1, new Date(NOW)),
      type: InvoiceTypeVO.create('commission'),
      amount: 1000,
      totalAmount: 1000,
      currency: 'BDT',
      issueDate: NOW,
      dueDate: DUE,
    },
  });
}

function makeRepoMock(): jest.Mocked<VendorInvoiceRepository> {
  return {
    findById: jest.fn(),
    findAll: jest.fn(),
    findByVendorId: jest.fn(),
    findByStatus: jest.fn(),
    findByType: jest.fn(),
    findByNumber: jest.fn(),
    findByOrderId: jest.fn(),
    search: jest.fn(),
    findOverdue: jest.fn(),
    findDueWithin: jest.fn(),
    findUnpaidByVendorId: jest.fn(),
    sumUnpaidByVendorId: jest.fn(),
    countByStatus: jest.fn(),
    existsByNumber: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
  } as unknown as jest.Mocked<VendorInvoiceRepository>;
}

describe('VendorInvoiceService', () => {
  let service: VendorInvoiceService;
  let repo: jest.Mocked<VendorInvoiceRepository>;

  beforeEach(() => {
    repo = makeRepoMock();
    service = new VendorInvoiceService(repo);
  });

  describe('create()', () => {
    it('creates + saves invoice', async () => {
      repo.save.mockResolvedValue(makeInvoice());
      const r = await service.create({
        vendorId: UUID,
        type: 'commission',
        amount: 1000,
        totalAmount: 1000,
        currency: 'BDT',
        issueDate: NOW,
        dueDate: DUE,
      });
      expect(r.id).toBe(UUID);
    });
  });

  describe('send()', () => {
    it('sends draft invoice', async () => {
      const inv = makeInvoice();
      repo.findById.mockResolvedValue(inv);
      repo.save.mockResolvedValue(inv);
      const r = await service.send({ invoiceId: UUID, sentBy: UUID });
      expect(r.id).toBe(UUID);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.send({ invoiceId: UUID, sentBy: UUID })).rejects.toThrow();
    });
  });

  describe('markViewed()', () => {
    it('marks sent → viewed', async () => {
      const inv = makeInvoice();
      inv.send(NOW);
      repo.findById.mockResolvedValue(inv);
      repo.save.mockResolvedValue(inv);
      const r = await service.markViewed(UUID);
      expect(r.id).toBe(UUID);
    });
  });

  describe('markPaid()', () => {
    it('marks paid', async () => {
      const inv = makeInvoice();
      inv.send(NOW);
      repo.findById.mockResolvedValue(inv);
      repo.save.mockResolvedValue(inv);
      const r = await service.markPaid({ invoiceId: UUID, markedBy: UUID });
      expect(r.id).toBe(UUID);
    });
  });

  describe('cancel()', () => {
    it('cancels draft', async () => {
      const inv = makeInvoice();
      repo.findById.mockResolvedValue(inv);
      repo.save.mockResolvedValue(inv);
      const r = await service.cancel(UUID, 'duplicate');
      expect(r.id).toBe(UUID);
    });
  });

  describe('getById()', () => {
    it('returns invoice', async () => {
      repo.findById.mockResolvedValue(makeInvoice());
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
      repo.findByVendorId.mockResolvedValue([makeInvoice()]);
      const r = await service.listByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });

  describe('listUnpaidByVendor()', () => {
    it('returns unpaid list', async () => {
      repo.findUnpaidByVendorId.mockResolvedValue([makeInvoice()]);
      const r = await service.listUnpaidByVendor(UUID);
      expect(r).toHaveLength(1);
    });
  });
});

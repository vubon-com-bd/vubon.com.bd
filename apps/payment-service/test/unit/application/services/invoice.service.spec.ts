/**
 * InvoiceService — Unit Tests (full branch coverage)
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { InvoiceService } from '@application/services/impl/invoice.service';
import {
  InvoiceNotFoundApplicationError,
  InvoiceGenerationError,
  InvoiceSendError,
  InvoiceVoidError,
} from '@application/errors/invoice.errors';
import type { InvoiceRepository } from '@domain/repositories/invoice.repository.interface';
import { InvoiceEntity } from '@domain/entities/invoice.entity';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { InvoiceNumberVO } from '@domain/primitives/invoice-number.vo';
import { InvoiceAmountVO } from '@domain/primitives/invoice-amount.vo';
import { UserIdVO } from '@domain/primitives/user-id.vo';

const INVOICE_ID = '623e4567-e89b-42d3-a456-426614174099';
const USER_ID = '723e4567-e89b-42d3-a456-426614174001';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByNumber: jest.fn(),
    findByUser: jest.fn(),
    findByOrder: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findOverdue: jest.fn(),
    findDueSoon: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeInvoiceEntity(issued = true) {
  const e = InvoiceEntity.create({
    id: InvoiceIdVO.create(INVOICE_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      invoiceNumber: InvoiceNumberVO.create('INV-2025-000123'),
      amount: InvoiceAmountVO.create(1000, 150, 'BDT'),
      userId: UserIdVO.create(USER_ID),
    },
  });
  if (issued) e.issue();
  return e;
}

describe('InvoiceService', () => {
  let service: InvoiceService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new InvoiceService(mockRepo as unknown as InvoiceRepository);
  });

  describe('generate', () => {
    it('should generate invoice', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.generate({
        userId: USER_ID,
        subtotal: 1000,
        taxAmount: 150,
        currency: 'BDT',
      });
      expect(result.subtotal).toBe(1000);
      expect(result.taxAmount).toBe(150);
      expect(result.total).toBe(1150);
      expect(result.status).toBe('issued');
      expect(result.invoiceNumber).toMatch(/^INV-\d{4}-\d{6}$/);
    });

    it('should wrap as InvoiceGenerationError on DB fail', async () => {
      mockRepo.save.mockRejectedValue(new Error('DB'));
      await expect(
        service.generate({
          userId: USER_ID,
          subtotal: 1000,
          taxAmount: 150,
          currency: 'BDT',
        }),
      ).rejects.toThrow(InvoiceGenerationError);
    });
  });

  describe('send', () => {
    it('should return DTO on success', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeInvoiceEntity());
      const result = await service.send({ invoiceId: INVOICE_ID, channel: 'email' });
      expect(result.id).toBe(INVOICE_ID);
    });

    it('should throw InvoiceNotFoundApplicationError', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.send({ invoiceId: INVOICE_ID, channel: 'email' }),
      ).rejects.toThrow(InvoiceNotFoundApplicationError);
    });

    it('should wrap as InvoiceSendError on unexpected failure', async () => {
      // Force a failure during toResponse
      const badEntity = makeInvoiceEntity();
      (badEntity as unknown as { id: string }).id = undefined as never;
      Object.defineProperty(badEntity, 'invoiceNumber', {
        get(): never {
          throw new Error('unexpected');
        },
      });
      mockRepo.findByIdVO.mockResolvedValue(badEntity);
      await expect(
        service.send({ invoiceId: INVOICE_ID, channel: 'email' }),
      ).rejects.toThrow(InvoiceSendError);
    });
  });

  describe('void', () => {
    it('should void an issued invoice', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeInvoiceEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.void({ invoiceId: INVOICE_ID, reason: 'duplicate' });
      expect(result.status).toBe('void');
    });

    it('should throw InvoiceNotFoundApplicationError', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.void({ invoiceId: INVOICE_ID, reason: 'x' }),
      ).rejects.toThrow(InvoiceNotFoundApplicationError);
    });

    it('should wrap as InvoiceVoidError on domain failure', async () => {
      const paid = makeInvoiceEntity();
      paid.markPaid();
      mockRepo.findByIdVO.mockResolvedValue(paid);
      await expect(
        service.void({ invoiceId: INVOICE_ID, reason: 'x' }),
      ).rejects.toThrow(InvoiceVoidError);
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeInvoiceEntity());
      expect((await service.getById(INVOICE_ID)).id).toBe(INVOICE_ID);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(INVOICE_ID)).rejects.toThrow(
        InvoiceNotFoundApplicationError,
      );
    });
  });

  describe('listByUser', () => {
    it('should return empty', async () => {
      mockRepo.findByUser.mockResolvedValue([]);
      expect(await service.listByUser(USER_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByUser.mockResolvedValue([makeInvoiceEntity()]);
      expect(await service.listByUser(USER_ID)).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeInvoiceEntity()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('getStats', () => {
    it('should return stats', async () => {
      mockRepo.getStats.mockResolvedValue({
        total: 15,
        totalAmount: 15000,
        outstandingAmount: 3000,
        currency: 'BDT',
        byStatus: { paid: 10, issued: 5 },
      });
      const stats = await service.getStats();
      expect(stats.total).toBe(15);
    });
  });
});

/**
 * VendorInvoicePrismaRepository
 * @module vendor-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  VendorInvoiceRepository,
  VendorInvoiceFilter,
} from '../../../../domain/repositories/vendor-invoice.repository.interface.js';
import { VendorInvoiceEntity } from '../../../../domain/entities/vendor-invoice.entity.js';
import { InvoiceStatusVO } from '../../../../domain/value-objects/primitives/invoice-status.vo.js';
import { InvoiceTypeVO } from '../../../../domain/value-objects/primitives/invoice-type.vo.js';
import { VendorInvoicePrismaMapper } from '../mappers/vendor-invoice.prisma-mapper.js';

@Injectable()
export class VendorInvoicePrismaRepository implements VendorInvoiceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<VendorInvoiceEntity | null> {
    const row = await this.prisma.vendorInvoice.findFirst({
      where: { id, deletedAt: null },
    });
    return row ? VendorInvoicePrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: { deletedAt: null },
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findByVendorId(vendorId: string): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: { vendorId, deletedAt: null },
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findByStatus(status: InvoiceStatusVO): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findByType(type: InvoiceTypeVO): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findByNumber(invoiceNumber: string): Promise<VendorInvoiceEntity | null> {
    const row = await this.prisma.vendorInvoice.findFirst({
      where: { invoiceNumber, deletedAt: null },
    });
    return row ? VendorInvoicePrismaMapper.toDomain(row) : null;
  }

  async findByOrderId(orderId: string): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: { orderIds: { has: orderId }, deletedAt: null },
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async search(filter: VendorInvoiceFilter): Promise<readonly VendorInvoiceEntity[]> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.vendorId) where.vendorId = filter.vendorId;
    if (filter.type) where.type = filter.type;
    if (filter.status) where.status = filter.status;
    if (filter.fromDate || filter.toDate) {
      const range: Record<string, Date> = {};
      if (filter.fromDate) range.gte = new Date(filter.fromDate);
      if (filter.toDate) range.lte = new Date(filter.toDate);
      where.issueDate = range;
    }
    const rows = await this.prisma.vendorInvoice.findMany({
      where,
      orderBy: { issueDate: 'desc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findOverdue(): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: {
        status: { in: ['sent', 'viewed', 'overdue'] },
        dueDate: { lt: new Date() },
        deletedAt: null,
      },
      orderBy: { dueDate: 'asc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findDueWithin(days: number): Promise<readonly VendorInvoiceEntity[]> {
    const now = new Date();
    const threshold = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    const rows = await this.prisma.vendorInvoice.findMany({
      where: {
        status: { in: ['sent', 'viewed'] },
        dueDate: { gte: now, lte: threshold },
        deletedAt: null,
      },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async findUnpaidByVendorId(vendorId: string): Promise<readonly VendorInvoiceEntity[]> {
    const rows = await this.prisma.vendorInvoice.findMany({
      where: {
        vendorId,
        status: { in: ['draft', 'sent', 'viewed', 'overdue'] },
        deletedAt: null,
      },
      orderBy: { dueDate: 'asc' },
    });
    return rows.map((r) => VendorInvoicePrismaMapper.toDomain(r));
  }

  async sumUnpaidByVendorId(vendorId: string): Promise<number> {
    const agg = await this.prisma.vendorInvoice.aggregate({
      _sum: { totalAmount: true },
      where: {
        vendorId,
        status: { in: ['draft', 'sent', 'viewed', 'overdue'] },
        deletedAt: null,
      },
    });
    return Number(agg._sum.totalAmount ?? 0);
  }

  async countByStatus(status: InvoiceStatusVO): Promise<number> {
    return this.prisma.vendorInvoice.count({
      where: { status: status.value, deletedAt: null },
    });
  }

  async existsByNumber(invoiceNumber: string): Promise<boolean> {
    const c = await this.prisma.vendorInvoice.count({
      where: { invoiceNumber, deletedAt: null },
    });
    return c > 0;
  }

  async save(entity: VendorInvoiceEntity): Promise<VendorInvoiceEntity> {
    const data = VendorInvoicePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.vendorInvoice.findFirst({ where: { id: entity.id } });
    const row = existing
      ? await this.prisma.vendorInvoice.update({ where: { id: entity.id }, data })
      : await this.prisma.vendorInvoice.create({ data: data as never });
    return VendorInvoicePrismaMapper.toDomain(row);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.vendorInvoice.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.prisma.vendorInvoice.count({ where: { id, deletedAt: null } });
    return c > 0;
  }
}

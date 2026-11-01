/**
 * InvoicePrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  InvoiceRepository,
  InvoiceListOptions,
  InvoicePaginationResult,
  InvoiceStats,
} from '@domain/repositories/invoice.repository.interface';
import { InvoiceEntity } from '@domain/entities/invoice.entity';
import { InvoiceIdVO } from '@domain/primitives/invoice-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  InvoicePrismaMapper,
  type PrismaInvoiceRow,
} from '../mappers/invoice.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaInvoiceRow | null>;
  findUnique(args: unknown): Promise<PrismaInvoiceRow | null>;
  findMany(args?: unknown): Promise<PrismaInvoiceRow[]>;
  create(args: unknown): Promise<PrismaInvoiceRow>;
  update(args: unknown): Promise<PrismaInvoiceRow>;
  delete(args: unknown): Promise<PrismaInvoiceRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class InvoicePrismaRepository implements InvoiceRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.invoice);
  }

  async findById(id: string): Promise<InvoiceEntity | null> {
    return this.findByIdVO(InvoiceIdVO.reconstitute(id));
  }

  async findByIdVO(id: InvoiceIdVO): Promise<InvoiceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? InvoicePrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InvoiceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: InvoiceEntity): Promise<InvoiceEntity> {
    const data = InvoicePrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaInvoiceRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return InvoicePrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return InvoicePrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string, _deletedBy?: string): Promise<void> {
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }

  async findByNumber(invoiceNumber: string): Promise<InvoiceEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { invoiceNumber, deletedAt: null },
    });
    return raw ? InvoicePrismaMapper.toDomain(raw) : null;
  }

  async findByUser(userId: string): Promise<readonly InvoiceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }

  async findByOrder(orderId: string): Promise<readonly InvoiceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly InvoiceEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }

  async findPaginated(options: InvoiceListOptions): Promise<InvoicePaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.userId) where['userId'] = f.userId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.status) where['status'] = f.status;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => InvoicePrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(userId?: string): Promise<InvoiceStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, total: true, currency: true } as never,
    })) as unknown as Array<{
      status: string;
      total: unknown;
      currency: string;
    }>;
    const byStatus: Record<string, number> = {};
    let totalAmount = 0;
    let outstandingAmount = 0;
    let currency = 'BDT';
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      const amt = Number(r.total);
      totalAmount += amt;
      if (r.status === 'issued' || r.status === 'overdue') outstandingAmount += amt;
      currency = r.currency;
    }
    return {
      total: rows.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      outstandingAmount: Math.round(outstandingAmount * 100) / 100,
      currency,
      byStatus,
    };
  }

  async findOverdue(): Promise<readonly InvoiceEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        status: 'issued',
        dueAt: { lt: now },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }

  async findDueSoon(withinDays: number): Promise<readonly InvoiceEntity[]> {
    const now = new Date();
    const cutoff = new Date(Date.now() + withinDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'issued',
        dueAt: { gte: now, lte: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => InvoicePrismaMapper.toDomain(r));
  }
}

/**
 * RefundPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  RefundRepository,
  RefundListOptions,
  RefundPaginationResult,
  RefundStats,
} from '@domain/repositories/refund.repository.interface';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  RefundPrismaMapper,
  type PrismaRefundRow,
} from '../mappers/refund.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaRefundRow | null>;
  findUnique(args: unknown): Promise<PrismaRefundRow | null>;
  findMany(args?: unknown): Promise<PrismaRefundRow[]>;
  create(args: unknown): Promise<PrismaRefundRow>;
  update(args: unknown): Promise<PrismaRefundRow>;
  delete(args: unknown): Promise<PrismaRefundRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class RefundPrismaRepository implements RefundRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.refund);
  }

  async findById(id: string): Promise<RefundEntity | null> {
    return this.findByIdVO(RefundIdVO.reconstitute(id));
  }

  async findByIdVO(id: RefundIdVO): Promise<RefundEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? RefundPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RefundEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: RefundEntity): Promise<RefundEntity> {
    const data = RefundPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaRefundRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return RefundPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return RefundPrismaMapper.toDomain(created);
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

  async findByPayment(paymentId: string): Promise<readonly RefundEntity[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly RefundEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }

  async findPaginated(options: RefundListOptions): Promise<RefundPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.status) where['status'] = f.status;
    if (f.reason) where['reason'] = f.reason;
    if (f.currency) where['currency'] = f.currency;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    if (f.minAmount !== undefined || f.maxAmount !== undefined) {
      where['amount'] = {
        ...(f.minAmount !== undefined ? { gte: f.minAmount } : {}),
        ...(f.maxAmount !== undefined ? { lte: f.maxAmount } : {}),
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
      items: rows.map((r) => RefundPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(paymentId?: string): Promise<RefundStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (paymentId) where['paymentId'] = paymentId;
    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, reason: true, amount: true, currency: true } as never,
    })) as unknown as Array<{
      status: string;
      reason: string;
      amount: unknown;
      currency: string;
    }>;
    const byStatus: Record<string, number> = {};
    const byReason: Record<string, number> = {};
    let totalRefunded = 0;
    let currency = 'BDT';
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byReason[r.reason] = (byReason[r.reason] ?? 0) + 1;
      totalRefunded += Number(r.amount);
      currency = r.currency;
    }
    return {
      total: rows.length,
      totalRefunded: Math.round(totalRefunded * 100) / 100,
      currency,
      byStatus,
      byReason,
    };
  }

  async findPending(olderThanMinutes: number): Promise<readonly RefundEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: { status: 'requested', createdAt: { lt: cutoff }, deletedAt: null } as never,
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }

  async findRetryable(): Promise<readonly RefundEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'failed', deletedAt: null } as never,
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }

  async findExpired(olderThanDays: number): Promise<readonly RefundEntity[]> {
    const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['requested', 'approved', 'processing'] },
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r));
  }
}

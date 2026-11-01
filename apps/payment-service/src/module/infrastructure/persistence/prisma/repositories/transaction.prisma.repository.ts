/**
 * TransactionPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  TransactionRepository,
  TransactionListOptions,
  TransactionPaginationResult,
  TransactionStats,
} from '@domain/repositories/transaction.repository.interface';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  TransactionPrismaMapper,
  type PrismaTransactionRow,
} from '../mappers/transaction.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaTransactionRow | null>;
  findUnique(args: unknown): Promise<PrismaTransactionRow | null>;
  findMany(args?: unknown): Promise<PrismaTransactionRow[]>;
  create(args: unknown): Promise<PrismaTransactionRow>;
  update(args: unknown): Promise<PrismaTransactionRow>;
  delete(args: unknown): Promise<PrismaTransactionRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.transaction);
  }

  async findById(id: string): Promise<TransactionEntity | null> {
    return this.findByIdVO(TransactionIdVO.reconstitute(id));
  }

  async findByIdVO(id: TransactionIdVO): Promise<TransactionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? TransactionPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TransactionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: TransactionEntity): Promise<TransactionEntity> {
    const data = TransactionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaTransactionRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return TransactionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return TransactionPrismaMapper.toDomain(created);
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

  async findByPayment(paymentId: string): Promise<readonly TransactionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r));
  }

  async findByGatewayReference(reference: string): Promise<TransactionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { gatewayReference: reference, deletedAt: null },
    });
    return raw ? TransactionPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly TransactionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: TransactionListOptions,
  ): Promise<TransactionPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.type) where['type'] = f.type;
    if (f.status) where['status'] = f.status;
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
      items: rows.map((r) => TransactionPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(paymentId?: string): Promise<TransactionStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (paymentId) where['paymentId'] = paymentId;
    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { type: true, status: true, amount: true, currency: true } as never,
    })) as unknown as Array<{
      type: string;
      status: string;
      amount: unknown;
      currency: string;
    }>;
    const byType: Record<string, number> = {};
    const byStatus: Record<string, number> = {};
    let totalAmount = 0;
    let currency = 'BDT';
    for (const r of rows) {
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      totalAmount += Number(r.amount);
      currency = r.currency;
    }
    return {
      total: rows.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      currency,
      byType,
      byStatus,
    };
  }

  async findPendingStale(olderThanMinutes: number): Promise<readonly TransactionEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r));
  }

  async findSettleable(): Promise<readonly TransactionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'success', deletedAt: null } as never,
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r));
  }
}

/**
 * PaymentPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  PaymentRepository,
  PaymentListOptions,
  PaymentPaginationResult,
  PaymentStats,
} from '@domain/repositories/payment.repository.interface';
import { PaymentEntity } from '@domain/entities/payment.entity';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  PaymentPrismaMapper,
  type PrismaPaymentRow,
} from '../mappers/payment.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaPaymentRow | null>;
  findUnique(args: unknown): Promise<PrismaPaymentRow | null>;
  findMany(args?: unknown): Promise<PrismaPaymentRow[]>;
  create(args: unknown): Promise<PrismaPaymentRow>;
  update(args: unknown): Promise<PrismaPaymentRow>;
  delete(args: unknown): Promise<PrismaPaymentRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class PaymentPrismaRepository implements PaymentRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.payment);
  }

  async findById(id: string): Promise<PaymentEntity | null> {
    return this.findByIdVO(PaymentIdVO.reconstitute(id));
  }

  async findByIdVO(id: PaymentIdVO): Promise<PaymentEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? PaymentPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: PaymentEntity): Promise<PaymentEntity> {
    const data = PaymentPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaPaymentRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return PaymentPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return PaymentPrismaMapper.toDomain(created);
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

  async findByOrder(orderId: string): Promise<readonly PaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { orderId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByUser(userId: string): Promise<readonly PaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly PaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByGatewayReference(
    reference: string,
  ): Promise<PaymentEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { gatewayReference: reference, deletedAt: null },
    });
    return raw ? PaymentPrismaMapper.toDomain(raw) : null;
  }

  async findPaginated(
    options: PaymentListOptions,
  ): Promise<PaymentPaginationResult> {
    const where = this.buildWhere(options);
    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: this.buildOrderBy(options),
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.delegate.count({ where: where as never }),
    ]);
    return {
      items: rows.map((r) => PaymentPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(
    userId?: string,
    _fromDate?: string,
    _toDate?: string,
  ): Promise<PaymentStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, method: true, amount: true, currency: true } as never,
    })) as unknown as Array<{
      status: string;
      method: string;
      amount: unknown;
      currency: string;
    }>;
    const byStatus: Record<string, number> = {};
    const byMethod: Record<string, number> = {};
    let totalAmount = 0;
    let currency = 'BDT';
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byMethod[r.method] = (byMethod[r.method] ?? 0) + 1;
      totalAmount += Number(r.amount);
      currency = r.currency;
    }
    return {
      total: rows.length,
      totalAmount: Math.round(totalAmount * 100) / 100,
      currency,
      byStatus,
      byMethod,
    };
  }

  async findStalePending(olderThanMinutes: number): Promise<readonly PaymentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'pending',
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findExpiredAuthorizations(olderThanHours: number): Promise<readonly PaymentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'authorized',
        authorizedAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findRetryable(): Promise<readonly PaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: { in: ['failed', 'declined'] }, deletedAt: null } as never,
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  private buildWhere(options: PaymentListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.status) where['status'] = f.status;
    if (f.method) where['method'] = f.method;
    if (f.provider) where['provider'] = f.provider;
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
    return where;
  }

  private buildOrderBy(options: PaymentListOptions): Record<string, 'asc' | 'desc'> {
    const dir = options.sortDir ?? 'desc';
    const map: Record<string, string> = {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      amount: 'amount',
      status: 'status',
    };
    return { [map[options.sortBy ?? 'createdAt'] ?? 'createdAt']: dir };
  }
}

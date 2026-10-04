/**
 * PaymentPrismaRepository — implements PaymentRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 *
 * Uses shared PrismaService from @vubon/shared-kernel.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  PaymentRepository,
  PaymentListOptions,
  PaymentPaginationResult,
  PaymentStats,
} from '../../../../domain/repositories/payment.repository.interface.js';
import { PaymentEntity } from '../../../../domain/entities/payment.entity.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { PaymentStatusVO } from '../../../../domain/value-objects/primitives/payment-status.vo.js';
import { PaymentGatewayVO } from '../../../../domain/value-objects/primitives/payment-gateway.vo.js';
import { IdempotencyKeyVO } from '../../../../domain/value-objects/primitives/idempotency-key.vo.js';
import { PaymentPrismaMapper } from '../payment.prisma.mapper.js';

@Injectable()
export class PaymentPrismaRepository implements PaymentRepository {
  private readonly logger = new Logger(PaymentPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<PaymentEntity | null> {
    return this.findByIdVO(PaymentIdVO.reconstitute(id));
  }

  async findByIdVO(id: PaymentIdVO): Promise<PaymentEntity | null> {
    const row = await this.prisma.payment.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? PaymentPrismaMapper.toDomain(row) : null;
  }

  async findAll(): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { orderId: orderId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: PaymentStatusVO): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByGateway(gateway: PaymentGatewayVO): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: { gateway: gateway.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<PaymentEntity | null> {
    const row = await this.prisma.payment.findFirst({
      where: { idempotencyKey: key.value, deletedAt: null },
    });
    return row ? PaymentPrismaMapper.toDomain(row) : null;
  }

  async findLatestByOrderId(orderId: OrderIdVO): Promise<PaymentEntity | null> {
    const row = await this.prisma.payment.findFirst({
      where: { orderId: orderId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return row ? PaymentPrismaMapper.toDomain(row) : null;
  }

  async existsByIdempotencyKey(key: IdempotencyKeyVO): Promise<boolean> {
    const count = await this.prisma.payment.count({
      where: { idempotencyKey: key.value },
    });
    return count > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.payment.count({ where: { id } });
    return count > 0;
  }

  async save(entity: PaymentEntity): Promise<PaymentEntity> {
    const data = PaymentPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.payment.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.payment.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return PaymentPrismaMapper.toDomain(updated);
    }

    const created = await this.prisma.payment.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return PaymentPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.payment.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.payment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async countByUser(userId: UserIdVO): Promise<number> {
    return this.prisma.payment.count({
      where: { userId: userId.value, deletedAt: null },
    });
  }

  async findPaginated(options: PaymentListOptions): Promise<PaymentPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = this.buildOrderBy(options);

    const [rows, total] = await Promise.all([
      this.prisma.payment.findMany({
        where,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.payment.count({ where }),
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
    gateway?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<PaymentStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    if (gateway) where['gateway'] = gateway;
    if (fromDate || toDate) {
      where['createdAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.prisma.payment.findMany({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      where: where as any,
      select: { status: true, gateway: true, amount: true, refundedAmount: true, currency: true },
    });

    let captured = 0;
    let refunded = 0;
    let totalAmount = 0;
    const byStatus: Record<string, number> = {};
    const byGateway: Record<string, number> = {};
    const currency = rows[0]?.currency ?? 'BDT';

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.gateway) byGateway[r.gateway] = (byGateway[r.gateway] ?? 0) + 1;
      const amt = Number(r.amount);
      const ref = Number(r.refundedAmount);
      totalAmount += amt;
      if (r.status === 'captured' || r.status === 'paid' || r.status === 'partially_refunded') {
        captured += amt;
      }
      refunded += ref;
    }

    return {
      totalPayments: rows.length,
      totalCaptured: Math.round(captured * 100) / 100,
      totalRefunded: Math.round(refunded * 100) / 100,
      averageAmount: rows.length ? Math.round((totalAmount / rows.length) * 100) / 100 : 0,
      currency,
      byStatus,
      byGateway,
    };
  }

  async findExpiredAuthorizations(olderThanHours: number): Promise<readonly PaymentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.prisma.payment.findMany({
      where: {
        status: 'authorized',
        authorizedAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findStalePending(olderThanMinutes: number): Promise<readonly PaymentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.prisma.payment.findMany({
      where: {
        status: { in: ['pending', 'processing'] },
        createdAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => PaymentPrismaMapper.toDomain(r));
  }

  async findRetryable(): Promise<readonly PaymentEntity[]> {
    const rows = await this.prisma.payment.findMany({
      where: {
        status: { in: ['failed', 'declined'] },
        retryAttempts: { lt: 3 },
        deletedAt: null,
      },
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
    if (f.gateway) where['gateway'] = f.gateway;
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
    const field = options.sortBy ?? 'createdAt';
    return { [field]: dir };
  }
}

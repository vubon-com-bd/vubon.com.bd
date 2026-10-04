/**
 * RefundPrismaRepository — implements RefundRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  RefundRepository,
  RefundListOptions,
  RefundPaginationResult,
} from '../../../../domain/repositories/refund.repository.interface.js';
import { RefundEntity } from '../../../../domain/entities/refund.entity.js';
import { RefundIdVO } from '../../../../domain/value-objects/primitives/refund-id.vo.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { RefundStatusVO } from '../../../../domain/value-objects/primitives/refund-status.vo.js';
import { RefundPrismaMapper } from '../refund.prisma.mapper.js';

@Injectable()
export class RefundPrismaRepository implements RefundRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<RefundEntity | null> {
    return this.findByIdVO(RefundIdVO.reconstitute(id));
  }

  async findByIdVO(id: RefundIdVO): Promise<RefundEntity | null> {
    const row = await this.prisma.refund.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? RefundPrismaMapper.toDomain(row as unknown as Record<string, unknown>) : null;
  }

  async findAll(): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { paymentId: paymentId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { orderId: orderId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByStatus(status: RefundStatusVO): Promise<readonly RefundEntity[]> {
    const rows = await this.prisma.refund.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async save(entity: RefundEntity): Promise<RefundEntity> {
    const data = RefundPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.refund.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.refund.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return RefundPrismaMapper.toDomain(updated as unknown as Record<string, unknown>);
    }

    const created = await this.prisma.refund.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return RefundPrismaMapper.toDomain(created as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.refund.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.refund.count({ where: { id } });
    return count > 0;
  }

  async findPaginated(options: RefundListOptions): Promise<RefundPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.status) where['status'] = f.status;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }

    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';

    const [rows, total] = await Promise.all([
      this.prisma.refund.findMany({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
        orderBy: { [field]: dir },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.refund.count({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
      }),
    ]);

    return {
      items: rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async sumSuccessfulByPaymentId(paymentId: PaymentIdVO): Promise<number> {
    const agg = await this.prisma.refund.aggregate({
      where: {
        paymentId: paymentId.value,
        status: 'succeeded',
        deletedAt: null,
      },
      _sum: { amount: true },
    });
    return agg._sum.amount ? Number(agg._sum.amount) : 0;
  }

  async countByPaymentId(paymentId: PaymentIdVO): Promise<number> {
    return this.prisma.refund.count({
      where: { paymentId: paymentId.value, deletedAt: null },
    });
  }

  async findStalePending(olderThanMinutes: number): Promise<readonly RefundEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.prisma.refund.findMany({
      where: {
        status: { in: ['pending', 'processing'] },
        createdAt: { lt: cutoff },
        deletedAt: null,
      },
    });
    return rows.map((r) => RefundPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }
}

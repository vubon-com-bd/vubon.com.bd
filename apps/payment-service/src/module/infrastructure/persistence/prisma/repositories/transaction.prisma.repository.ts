/**
 * TransactionPrismaRepository — implements TransactionRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  TransactionRepository,
  TransactionListOptions,
  TransactionPaginationResult,
} from '../../../../domain/repositories/transaction.repository.interface.js';
import { TransactionEntity } from '../../../../domain/entities/transaction.entity.js';
import { TransactionIdVO } from '../../../../domain/value-objects/primitives/transaction-id.vo.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { TransactionTypeVO } from '../../../../domain/value-objects/primitives/transaction-type.vo.js';
import { TransactionStatusVO } from '../../../../domain/value-objects/primitives/transaction-status.vo.js';
import { TransactionPrismaMapper } from '../transaction.prisma.mapper.js';

@Injectable()
export class TransactionPrismaRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TransactionEntity | null> {
    return this.findByIdVO(TransactionIdVO.reconstitute(id));
  }

  async findByIdVO(id: TransactionIdVO): Promise<TransactionEntity | null> {
    const row = await this.prisma.transaction.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? TransactionPrismaMapper.toDomain(row as unknown as Record<string, unknown>) : null;
  }

  async findAll(): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByPaymentId(paymentId: PaymentIdVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { paymentId: paymentId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { orderId: orderId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { userId: userId.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByType(type: TransactionTypeVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByStatus(status: TransactionStatusVO): Promise<readonly TransactionEntity[]> {
    const rows = await this.prisma.transaction.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>));
  }

  async findByIdempotencyKey(idempotencyKey: string): Promise<TransactionEntity | null> {
    const row = await this.prisma.transaction.findFirst({
      where: { idempotencyKey, deletedAt: null },
    });
    return row ? TransactionPrismaMapper.toDomain(row as unknown as Record<string, unknown>) : null;
  }

  async save(entity: TransactionEntity): Promise<TransactionEntity> {
    const data = TransactionPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.transaction.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.prisma.transaction.update({
        where: { id: entity.id },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: data as any,
      });
      return TransactionPrismaMapper.toDomain(updated as unknown as Record<string, unknown>);
    }

    const created = await this.prisma.transaction.create({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: data as any,
    });
    return TransactionPrismaMapper.toDomain(created as unknown as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.transaction.count({ where: { id } });
    return count > 0;
  }

  async findPaginated(
    options: TransactionListOptions,
  ): Promise<TransactionPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.type) where['type'] = f.type;
    if (f.status) where['status'] = f.status;
    if (f.gateway) where['gateway'] = f.gateway;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }

    const dir = options.sortDir ?? 'desc';
    const field = options.sortBy ?? 'createdAt';

    const [rows, total] = await Promise.all([
      this.prisma.transaction.findMany({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
        orderBy: { [field]: dir },
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }),
      this.prisma.transaction.count({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        where: where as any,
      }),
    ]);

    return {
      items: rows.map((r) => TransactionPrismaMapper.toDomain(r as unknown as Record<string, unknown>)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async sumByPaymentIdAndType(
    paymentId: PaymentIdVO,
    type: TransactionTypeVO,
  ): Promise<number> {
    const agg = await this.prisma.transaction.aggregate({
      where: {
        paymentId: paymentId.value,
        type: type.value,
        status: 'success',
        deletedAt: null,
      },
      _sum: { amount: true },
    });
    return agg._sum.amount ? Number(agg._sum.amount) : 0;
  }

  async countByPaymentId(paymentId: PaymentIdVO): Promise<number> {
    return this.prisma.transaction.count({
      where: { paymentId: paymentId.value, deletedAt: null },
    });
  }
}

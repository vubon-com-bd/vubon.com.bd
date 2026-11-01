/**
 * SplitPaymentPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  SplitPaymentRepository,
  SplitPaymentListOptions,
  SplitPaymentPaginationResult,
} from '@domain/repositories/split-payment.repository.interface';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  SplitPaymentPrismaMapper,
  type PrismaSplitRow,
} from '../mappers/split.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaSplitRow | null>;
  findUnique(args: unknown): Promise<PrismaSplitRow | null>;
  findMany(args?: unknown): Promise<PrismaSplitRow[]>;
  create(args: unknown): Promise<PrismaSplitRow>;
  update(args: unknown): Promise<PrismaSplitRow>;
  delete(args: unknown): Promise<PrismaSplitRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class SplitPaymentPrismaRepository implements SplitPaymentRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.split);
  }

  async findById(id: string): Promise<SplitPaymentEntity | null> {
    return this.findByIdVO(SplitIdVO.reconstitute(id));
  }

  async findByIdVO(id: SplitIdVO): Promise<SplitPaymentEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? SplitPaymentPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SplitPaymentPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: SplitPaymentEntity): Promise<SplitPaymentEntity> {
    const data = SplitPaymentPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaSplitRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return SplitPaymentPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return SplitPaymentPrismaMapper.toDomain(created);
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

  async findByPayment(paymentId: string): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => SplitPaymentPrismaMapper.toDomain(r));
  }

  async findPending(): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { executedAt: null, failureReason: null, deletedAt: null } as never,
    });
    return rows.map((r) => SplitPaymentPrismaMapper.toDomain(r));
  }

  async findFailed(): Promise<readonly SplitPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { failureReason: { not: null }, deletedAt: null } as never,
    });
    return rows.map((r) => SplitPaymentPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: SplitPaymentListOptions,
  ): Promise<SplitPaymentPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.type) where['type'] = f.type;
    if (f.currency) where['currency'] = f.currency;
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
      items: rows.map((r) => SplitPaymentPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
}

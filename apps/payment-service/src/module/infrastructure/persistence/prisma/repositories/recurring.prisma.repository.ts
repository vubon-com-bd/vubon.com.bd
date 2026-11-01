/**
 * RecurringPaymentPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  RecurringPaymentRepository,
  RecurringPaymentListOptions,
  RecurringPaymentPaginationResult,
} from '@domain/repositories/recurring-payment.repository.interface';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  RecurringPaymentPrismaMapper,
  type PrismaRecurringRow,
} from '../mappers/recurring.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaRecurringRow | null>;
  findUnique(args: unknown): Promise<PrismaRecurringRow | null>;
  findMany(args?: unknown): Promise<PrismaRecurringRow[]>;
  create(args: unknown): Promise<PrismaRecurringRow>;
  update(args: unknown): Promise<PrismaRecurringRow>;
  delete(args: unknown): Promise<PrismaRecurringRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class RecurringPaymentPrismaRepository implements RecurringPaymentRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.recurring);
  }

  async findById(id: string): Promise<RecurringPaymentEntity | null> {
    return this.findByIdVO(RecurringIdVO.reconstitute(id));
  }

  async findByIdVO(id: RecurringIdVO): Promise<RecurringPaymentEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? RecurringPaymentPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: RecurringPaymentEntity): Promise<RecurringPaymentEntity> {
    const data = RecurringPaymentPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaRecurringRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return RecurringPaymentPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return RecurringPaymentPrismaMapper.toDomain(created);
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

  async findByPayment(paymentId: string): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }

  async findActive(): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: RecurringPaymentListOptions,
  ): Promise<RecurringPaymentPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.status) where['status'] = f.status;
    if (f.interval) where['interval'] = f.interval;
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
      items: rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findDue(reference: Date): Promise<readonly RecurringPaymentEntity[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        nextRunAt: { lte: reference },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly RecurringPaymentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: 'active',
        nextRunAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => RecurringPaymentPrismaMapper.toDomain(r));
  }
}

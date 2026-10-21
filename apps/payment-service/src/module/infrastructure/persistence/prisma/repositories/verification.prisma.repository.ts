/**
 * VerificationPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  VerificationRepository,
  VerificationListOptions,
  VerificationPaginationResult,
} from '@domain/repositories/verification.repository.interface';
import { VerificationEntity } from '@domain/entities/verification.entity';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  VerificationPrismaMapper,
  type PrismaVerificationRow,
} from '../mappers/verification.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaVerificationRow | null>;
  findUnique(args: unknown): Promise<PrismaVerificationRow | null>;
  findMany(args?: unknown): Promise<PrismaVerificationRow[]>;
  create(args: unknown): Promise<PrismaVerificationRow>;
  update(args: unknown): Promise<PrismaVerificationRow>;
  delete(args: unknown): Promise<PrismaVerificationRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class VerificationPrismaRepository implements VerificationRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.verification);
  }

  async findById(id: string): Promise<VerificationEntity | null> {
    return this.findByIdVO(VerificationIdVO.reconstitute(id));
  }

  async findByIdVO(id: VerificationIdVO): Promise<VerificationEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? VerificationPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: VerificationEntity): Promise<VerificationEntity> {
    const data = VerificationPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaVerificationRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return VerificationPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return VerificationPrismaMapper.toDomain(created);
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

  async findByPayment(paymentId: string): Promise<readonly VerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { paymentId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }

  async findPending(): Promise<readonly VerificationEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: { in: ['pending', 'in_progress'] }, deletedAt: null } as never,
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }

  async findExpired(): Promise<readonly VerificationEntity[]> {
    const now = new Date();
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['pending', 'in_progress'] },
        expiresAt: { lt: now },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }

  async findPaginated(
    options: VerificationListOptions,
  ): Promise<VerificationPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.paymentId) where['paymentId'] = f.paymentId;
    if (f.status) where['status'] = f.status;
    if (f.method) where['method'] = f.method;
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
      items: rows.map((r) => VerificationPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async findStale(olderThanMinutes: number): Promise<readonly VerificationEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['pending', 'in_progress'] },
        createdAt: { lt: cutoff },
        deletedAt: null,
      } as never,
    });
    return rows.map((r) => VerificationPrismaMapper.toDomain(r));
  }
}

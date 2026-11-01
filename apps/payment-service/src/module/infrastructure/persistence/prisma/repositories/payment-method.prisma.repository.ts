/**
 * PaymentMethodPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  PaymentMethodRepository,
  PaymentMethodListOptions,
  PaymentMethodPaginationResult,
} from '@domain/repositories/payment-method.repository.interface';
import { PaymentMethodEntity } from '@domain/entities/payment-method.entity';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  PaymentMethodPrismaMapper,
  type PrismaPaymentMethodRow,
} from '../mappers/payment-method.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaPaymentMethodRow | null>;
  findUnique(args: unknown): Promise<PrismaPaymentMethodRow | null>;
  findMany(args?: unknown): Promise<PrismaPaymentMethodRow[]>;
  create(args: unknown): Promise<PrismaPaymentMethodRow>;
  update(args: unknown): Promise<PrismaPaymentMethodRow>;
  delete(args: unknown): Promise<PrismaPaymentMethodRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class PaymentMethodPrismaRepository implements PaymentMethodRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.paymentMethod);
  }

  async findById(id: string): Promise<PaymentMethodEntity | null> {
    return this.findByIdVO(PaymentMethodIdVO.reconstitute(id));
  }

  async findByIdVO(id: PaymentMethodIdVO): Promise<PaymentMethodEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return raw ? PaymentMethodPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => PaymentMethodPrismaMapper.toDomain(r));
  }

  async findActive(): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isActive: true, deletedAt: null },
    });
    return rows.map((r) => PaymentMethodPrismaMapper.toDomain(r));
  }

  async findByType(type: string): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.delegate.findMany({
      where: { methodType: type, deletedAt: null },
    });
    return rows.map((r) => PaymentMethodPrismaMapper.toDomain(r));
  }

  async findByProvider(provider: string): Promise<readonly PaymentMethodEntity[]> {
    const rows = await this.delegate.findMany({
      where: { provider, deletedAt: null },
    });
    return rows.map((r) => PaymentMethodPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: PaymentMethodEntity): Promise<PaymentMethodEntity> {
    const data = PaymentMethodPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaPaymentMethodRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return PaymentMethodPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return PaymentMethodPrismaMapper.toDomain(created);
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

  async findPaginated(
    options: PaymentMethodListOptions,
  ): Promise<PaymentMethodPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.type) where['methodType'] = f.type;
    if (f.provider) where['provider'] = f.provider;
    if (f.isActive !== undefined) where['isActive'] = f.isActive;

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
      items: rows.map((r) => PaymentMethodPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
}

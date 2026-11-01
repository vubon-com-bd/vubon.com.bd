/**
 * PaymentGatewayPrismaRepository
 * @module payment-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import type {
  PaymentGatewayRepository,
  PaymentGatewayListOptions,
  PaymentGatewayPaginationResult,
} from '@domain/repositories/payment-gateway.repository.interface';
import { PaymentGatewayEntity } from '@domain/entities/payment-gateway.entity';
import { PaymentPrismaService, PAYMENT_MODELS } from '../prisma.service.js';
import {
  PaymentGatewayPrismaMapper,
  type PrismaPaymentGatewayRow,
} from '../mappers/payment-gateway.prisma.mapper.js';

interface PrismaDelegate {
  findFirst(args: unknown): Promise<PrismaPaymentGatewayRow | null>;
  findUnique(args: unknown): Promise<PrismaPaymentGatewayRow | null>;
  findMany(args?: unknown): Promise<PrismaPaymentGatewayRow[]>;
  create(args: unknown): Promise<PrismaPaymentGatewayRow>;
  update(args: unknown): Promise<PrismaPaymentGatewayRow>;
  delete(args: unknown): Promise<PrismaPaymentGatewayRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class PaymentGatewayPrismaRepository implements PaymentGatewayRepository {
  constructor(private readonly prisma: PaymentPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getPaymentModel<PrismaDelegate>(PAYMENT_MODELS.paymentGateway);
  }

  async findById(id: string): Promise<PaymentGatewayEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { id, deletedAt: null },
    });
    return raw ? PaymentGatewayPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly PaymentGatewayEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => PaymentGatewayPrismaMapper.toDomain(r));
  }

  async findByProvider(provider: string): Promise<PaymentGatewayEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { provider, deletedAt: null },
    });
    return raw ? PaymentGatewayPrismaMapper.toDomain(raw) : null;
  }

  async findAvailable(): Promise<readonly PaymentGatewayEntity[]> {
    const rows = await this.delegate.findMany({
      where: { isActive: true, isMaintenance: false, deletedAt: null },
    });
    return rows.map((r) => PaymentGatewayPrismaMapper.toDomain(r));
  }

  async findByCurrency(currency: string): Promise<readonly PaymentGatewayEntity[]> {
    const rows = await this.delegate.findMany({
      where: { supportedCurrencies: { has: currency.toUpperCase() }, deletedAt: null } as never,
    });
    return rows.map((r) => PaymentGatewayPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const c = await this.delegate.count({ where: { id, deletedAt: null } });
    return c > 0;
  }

  async save(entity: PaymentGatewayEntity): Promise<PaymentGatewayEntity> {
    const data = PaymentGatewayPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true } as unknown as PrismaPaymentGatewayRow,
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return PaymentGatewayPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return PaymentGatewayPrismaMapper.toDomain(created);
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
    options: PaymentGatewayListOptions,
  ): Promise<PaymentGatewayPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.provider) where['provider'] = f.provider;
    if (f.isActive !== undefined) where['isActive'] = f.isActive;
    if (f.isMaintenance !== undefined) where['isMaintenance'] = f.isMaintenance;
    if (f.currency) where['supportedCurrencies'] = { has: f.currency.toUpperCase() };

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
      items: rows.map((r) => PaymentGatewayPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }
}

/**
 * CheckoutSessionPrismaRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { type CheckoutSessionRepository } from '../../../../domain/repositories/checkout-session.repository.interface.js';
import { CheckoutSessionEntity } from '../../../../domain/entities/checkout-session.entity.js';
import { OrderPrismaService } from '../prisma.service.js';
import { CheckoutSessionPrismaMapper } from '../mappers/checkout-session.prisma.mapper.js';
import type { PrismaCheckoutSessionRow } from '../mappers/checkout-session.prisma.mapper.js';

interface CheckoutSessionDelegate {
  findFirst(args: unknown): Promise<PrismaCheckoutSessionRow | null>;
  findUnique(args: unknown): Promise<PrismaCheckoutSessionRow | null>;
  findMany(args?: unknown): Promise<PrismaCheckoutSessionRow[]>;
  create(args: unknown): Promise<PrismaCheckoutSessionRow>;
  update(args: unknown): Promise<PrismaCheckoutSessionRow>;
  delete(args: unknown): Promise<PrismaCheckoutSessionRow>;
  count(args?: unknown): Promise<number>;
}

@Injectable()
export class CheckoutSessionPrismaRepository implements CheckoutSessionRepository {
  constructor(private readonly prisma: OrderPrismaService) {}

  private get delegate(): CheckoutSessionDelegate {
    return this.prisma.getModel<CheckoutSessionDelegate>('checkoutSession');
  }

  async findById(id: string): Promise<CheckoutSessionEntity | null> {
    const raw = await this.delegate.findFirst({ where: { id } });
    return raw ? CheckoutSessionPrismaMapper.toDomain(raw) : null;
  }

  async findByCheckout(checkoutId: string): Promise<readonly CheckoutSessionEntity[]> {
    const rows = await this.delegate.findMany({
      where: { checkoutId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => CheckoutSessionPrismaMapper.toDomain(r));
  }

  async findLatestByCheckout(checkoutId: string): Promise<CheckoutSessionEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { checkoutId },
      orderBy: { createdAt: 'desc' },
    });
    return raw ? CheckoutSessionPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CheckoutSessionEntity[]> {
    const rows = await this.delegate.findMany();
    return rows.map((r) => CheckoutSessionPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: CheckoutSessionEntity): Promise<CheckoutSessionEntity> {
    const data = CheckoutSessionPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return CheckoutSessionPrismaMapper.toDomain(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return CheckoutSessionPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}

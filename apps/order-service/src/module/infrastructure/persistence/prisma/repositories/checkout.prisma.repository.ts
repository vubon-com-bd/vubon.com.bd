/**
 * CheckoutPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { CheckoutRepository } from '../../../../domain/repositories/checkout.repository.interface.js';
import { CheckoutEntity } from '../../../../domain/entities/checkout.entity.js';
import { CheckoutStatusVO } from '../../../../domain/value-objects/primitives/checkout-status.vo.js';
import { CheckoutStepVO } from '../../../../domain/value-objects/primitives/checkout-step.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Row {
  id: string; customerId: string; cartId: string | null;
  status: string; step: string; type: string;
  subtotal: unknown; discountAmount: unknown; taxAmount: unknown;
  shippingAmount: unknown; total: unknown; currency: string;
  shippingAddressId: string | null; billingAddressId: string | null;
  shippingMethodId: string | null; paymentMethod: string | null;
  orderId: string | null; expiresAt: Date;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  delete(a: unknown): Promise<Row>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class CheckoutPrismaRepository implements CheckoutRepository {
  private readonly logger = new Logger(CheckoutPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate {
    return (this.prisma as unknown as { checkout: Delegate }).checkout;
  }

  async findById(id: string): Promise<CheckoutEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<CheckoutEntity | null> { return this.findById(id.value); }

  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly CheckoutEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { customerId: customerId.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findActiveByCustomer(customerId: CustomerIdVO): Promise<CheckoutEntity | null> {
    try {
      const r = await this.d.findFirst({
        where: { customerId: customerId.value, status: { in: ['pending', 'in_progress'] }, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }

  async findByCartId(cartId: string): Promise<CheckoutEntity | null> {
    try {
      const r = await this.d.findFirst({ where: { cartId, deletedAt: null } });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }

  async findByStatus(status: CheckoutStatusVO): Promise<readonly CheckoutEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { status: status.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findByOrderId(orderId: string): Promise<CheckoutEntity | null> {
    try {
      const r = await this.d.findFirst({ where: { orderId, deletedAt: null } });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }

  async findExpired(before: string): Promise<readonly CheckoutEntity[]> {
    try {
      const rows = await this.d.findMany({
        where: { expiresAt: { lt: new Date(before) }, status: { in: ['pending', 'in_progress'] }, deletedAt: null },
      });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findAll(): Promise<readonly CheckoutEntity[]> {
    try { const rows = await this.d.findMany({ where: { deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }

  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }

  async save(entity: CheckoutEntity): Promise<CheckoutEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? await this.d.update({ where: { id: entity.id }, data })
        : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try { await this.d.update({ where: { id }, data: { deletedAt: new Date() } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  async softDelete(id: string): Promise<void> { await this.delete(id); }

  private toDomain(raw: Row): CheckoutEntity {
    return CheckoutEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        cartId: raw.cartId ?? undefined,
        status: CheckoutStatusVO.reconstitute(raw.status),
        currentStep: CheckoutStepVO.reconstitute(raw.step),
        type: raw.type,
        currency: raw.currency,
        subtotal: Number(raw.subtotal),
        discountAmount: Number(raw.discountAmount),
        taxAmount: Number(raw.taxAmount),
        shippingAmount: Number(raw.shippingAmount),
        total: Number(raw.total),
        shippingAddress: undefined,
        billingAddress: undefined,
        shippingAddressId: raw.shippingAddressId ?? undefined,
        billingAddressId: raw.billingAddressId ?? undefined,
        shippingMethodId: raw.shippingMethodId ?? undefined,
        paymentMethod: raw.paymentMethod ?? undefined,
        orderId: raw.orderId ?? undefined,
        expiresAt: raw.expiresAt.toISOString(),
      },
    });
  }

  private toPersistence(entity: CheckoutEntity): Record<string, unknown> {
    return {
      id: entity.id,
      customerId: entity.customerId.value,
      cartId: entity.cartId ?? null,
      status: entity.status.value,
      step: entity.currentStep.value,
      type: entity.type,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      shippingAddressId: entity.shippingAddressId ?? null,
      billingAddressId: entity.billingAddressId ?? null,
      shippingMethodId: entity.shippingMethodId ?? null,
      paymentMethod: entity.paymentMethod ?? null,
      orderId: entity.orderId ?? null,
      expiresAt: new Date(entity.expiresAt),
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

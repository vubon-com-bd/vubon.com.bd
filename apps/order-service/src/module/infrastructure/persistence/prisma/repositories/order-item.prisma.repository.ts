/**
 * OrderItemPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderItemRepository } from '../../../../domain/repositories/order-item.repository.interface.js';
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../domain/value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Row {
  id: string; orderId: string; productId: string; variantId: string | null;
  vendorId: string | null; sku: string; name: string; imageUrl: string | null;
  type: string; status: string; quantity: number;
  unitPrice: unknown; compareAtPrice: unknown; subtotal: unknown;
  discountAmount: unknown; taxAmount: unknown; shippingAmount: unknown;
  total: unknown; currency: string; attributes: unknown; notes: string | null;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  createMany(a: unknown): Promise<{ count: number }>;
  update(a: unknown): Promise<Row>;
  delete(a: unknown): Promise<Row>;
  deleteMany(a: unknown): Promise<{ count: number }>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class OrderItemPrismaRepository implements OrderItemRepository {
  private readonly logger = new Logger(OrderItemPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate {
    return (this.prisma as unknown as { orderItem: Delegate }).orderItem;
  }

  async findById(id: string): Promise<OrderItemEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: OrderItemIdVO): Promise<OrderItemEntity | null> { return this.findById(id.value); }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderItemEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { orderId: orderId.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findByProductId(productId: ProductIdVO): Promise<readonly OrderItemEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { productId: productId.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderItemEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { vendorId: vendorId.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findByStatus(status: OrderItemStatusVO): Promise<readonly OrderItemEntity[]> {
    try {
      const rows = await this.d.findMany({ where: { status: status.value, deletedAt: null } });
      return rows.map((r) => this.toDomain(r));
    } catch { return []; }
  }

  async findByOrderAndProduct(orderId: OrderIdVO, productId: ProductIdVO): Promise<OrderItemEntity | null> {
    try {
      const rows = await this.d.findMany({
        where: { orderId: orderId.value, productId: productId.value, deletedAt: null },
        take: 1,
      });
      return rows.length > 0 ? this.toDomain(rows[0]) : null;
    } catch { return null; }
  }

  async findAll(): Promise<readonly OrderItemEntity[]> {
    try { const rows = await this.d.findMany({ where: { deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }

  async countByOrder(orderId: OrderIdVO): Promise<number> {
    try { return await this.d.count({ where: { orderId: orderId.value, deletedAt: null } }); }
    catch { return 0; }
  }

  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }

  async save(entity: OrderItemEntity): Promise<OrderItemEntity> {
    // NOTE: orderId not stored on entity; caller must set via createMany or relation
    const data = this.toPersistence(entity, '');
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

  async deleteByOrder(orderId: OrderIdVO): Promise<void> {
    try { await this.d.deleteMany({ where: { orderId: orderId.value } }); }
    catch (err) { this.logger.warn(`deleteByOrder failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): OrderItemEntity {
    return OrderItemEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        productId: ProductIdVO.reconstitute(raw.productId),
        variantId: raw.variantId ? VariantIdVO.reconstitute(raw.variantId) : undefined,
        vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
        sku: raw.sku,
        name: raw.name,
        imageUrl: raw.imageUrl ?? undefined,
        type: raw.type,
        status: OrderItemStatusVO.reconstitute(raw.status),
        quantity: OrderItemQuantityVO.reconstitute(raw.quantity),
        price: OrderItemPriceVO.reconstitute(
          Number(raw.unitPrice),
          raw.currency,
          raw.compareAtPrice !== null ? Number(raw.compareAtPrice) : undefined,
        ),
        discountAmount: Number(raw.discountAmount),
        taxAmount: Number(raw.taxAmount),
        shippingAmount: Number(raw.shippingAmount),
        attributes: (raw.attributes as Readonly<Record<string, string>> | null) ?? undefined,
        notes: raw.notes ?? undefined,
      },
    });
  }

  private toPersistence(entity: OrderItemEntity, orderId: string): Record<string, unknown> {
    return {
      id: entity.id,
      orderId,
      productId: entity.productId.value,
      variantId: entity.variantId?.value ?? null,
      vendorId: entity.vendorId?.value ?? null,
      sku: entity.sku,
      name: entity.name,
      imageUrl: entity.imageUrl ?? null,
      type: entity.type,
      status: entity.status.value,
      quantity: entity.quantity.value,
      unitPrice: entity.price.amount,
      compareAtPrice: entity.price.compareAt ?? null,
      subtotal: entity.lineSubtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.lineTotal,
      currency: entity.currency,
      attributes: entity.attributes ?? null,
      notes: entity.notes ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

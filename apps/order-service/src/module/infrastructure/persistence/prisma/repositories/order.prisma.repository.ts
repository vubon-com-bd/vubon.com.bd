/**
 * OrderPrismaRepository — implements OrderRepository
 * @module order-service/infrastructure/persistence/prisma/repositories
 *
 * Note: Direct interface implementation (not extending BasePrismaRepository)
 * because Order requires eager-loading of items + joins that the generic
 * base class cannot express. Same pattern as cart-service's
 * AbandonedCartPrismaRepository.
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  OrderRepository,
  OrderListOptions,
  OrderPaginationResult,
  OrderStats,
} from '../../../../domain/repositories/order.repository.interface.js';
import { OrderEntity } from '../../../../domain/entities/order.entity.js';
import { OrderItemEntity } from '../../../../domain/entities/order-item.entity.js';
import { OrderNumberVO } from '../../../../domain/value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../../../../domain/value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../../../../domain/value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../../../../domain/value-objects/primitives/order-priority.vo.js';
import { OrderNoteVO } from '../../../../domain/value-objects/primitives/order-note.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { PaymentIdVO } from '../../../../domain/value-objects/primitives/payment-id.vo.js';
import { ProductIdVO } from '../../../../domain/value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../../../../domain/value-objects/primitives/variant-id.vo.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../../../../domain/value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../../../../domain/value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../../../../domain/value-objects/primitives/order-item-status.vo.js';

// ─────────────────────────────────────────────
// Prisma row shape (structural — avoids importing generated client at compile-time)
// ─────────────────────────────────────────────
interface PrismaOrderItemRow {
  id: string;
  orderId: string;
  productId: string;
  variantId: string | null;
  vendorId: string | null;
  sku: string;
  name: string;
  imageUrl: string | null;
  type: string;
  status: string;
  quantity: number;
  unitPrice: { toString(): string } | number;
  compareAtPrice: { toString(): string } | number | null;
  subtotal: { toString(): string } | number;
  discountAmount: { toString(): string } | number;
  taxAmount: { toString(): string } | number;
  shippingAmount: { toString(): string } | number;
  total: { toString(): string } | number;
  currency: string;
  attributes: unknown;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface PrismaOrderRow {
  id: string;
  orderNumber: string;
  customerId: string;
  vendorIds: string[];
  type: string;
  status: string;
  priority: string;
  subtotal: { toString(): string } | number;
  discountAmount: { toString(): string } | number;
  taxAmount: { toString(): string } | number;
  shippingAmount: { toString(): string } | number;
  total: { toString(): string } | number;
  currency: string;
  paymentId: string | null;
  paymentStatus: string | null;
  paymentMethod: string | null;
  shippingMethod: string | null;
  trackingNumber: string | null;
  notes: string | null;
  customerNotes: string | null;
  confirmedAt: Date | null;
  shippedAt: Date | null;
  deliveredAt: Date | null;
  cancelledAt: Date | null;
  completedAt: Date | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  items?: PrismaOrderItemRow[];
}

interface PrismaOrderDelegate {
  findUnique(args: unknown): Promise<PrismaOrderRow | null>;
  findFirst(args: unknown): Promise<PrismaOrderRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderRow[]>;
  create(args: unknown): Promise<PrismaOrderRow>;
  update(args: unknown): Promise<PrismaOrderRow>;
  delete(args: unknown): Promise<PrismaOrderRow>;
  count(args?: unknown): Promise<number>;
  aggregate(args: unknown): Promise<{ _sum: { total: unknown }; _avg: { total: unknown } }>;
  groupBy(args: unknown): Promise<Array<{ status: string; _count: { _all: number } }>>;
}

interface PrismaOrderItemDelegate {
  findUnique(args: unknown): Promise<PrismaOrderItemRow | null>;
  findMany(args?: unknown): Promise<PrismaOrderItemRow[]>;
  create(args: unknown): Promise<PrismaOrderItemRow>;
  createMany(args: unknown): Promise<{ count: number }>;
  update(args: unknown): Promise<PrismaOrderItemRow>;
  delete(args: unknown): Promise<PrismaOrderItemRow>;
  deleteMany(args: unknown): Promise<{ count: number }>;
  count(args?: unknown): Promise<number>;
}

// ─────────────────────────────────────────────
// Repository
// ─────────────────────────────────────────────
@Injectable()
export class OrderPrismaRepository implements OrderRepository {
  private readonly logger = new Logger(OrderPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  private get delegate(): PrismaOrderDelegate {
    return (this.prisma as unknown as { order: PrismaOrderDelegate }).order;
  }

  private get itemDelegate(): PrismaOrderItemDelegate {
    return (this.prisma as unknown as { orderItem: PrismaOrderItemDelegate }).orderItem;
  }

  // ─── Find methods ───
  async findById(id: string): Promise<OrderEntity | null> {
    try {
      const raw = await this.delegate.findUnique({
        where: { id },
        include: { items: { where: { deletedAt: null } } },
      });
      return raw ? this.toDomain(raw) : null;
    } catch (err) {
      this.logger.warn(`findById failed: ${err instanceof Error ? err.message : String(err)}`);
      return null;
    }
  }

  async findByIdVO(id: { value: string }): Promise<OrderEntity | null> {
    return this.findById(id.value);
  }

  async findByNumber(orderNumber: OrderNumberVO): Promise<OrderEntity | null> {
    try {
      const raw = await this.delegate.findFirst({
        where: { orderNumber: orderNumber.value, deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
      });
      return raw ? this.toDomain(raw) : null;
    } catch {
      return null;
    }
  }

  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly OrderEntity[]> {
    try {
      const rows = await this.delegate.findMany({
        where: { customerId: customerId.value, deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
        orderBy: { createdAt: 'desc' },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderEntity[]> {
    try {
      const rows = await this.delegate.findMany({
        where: { vendorIds: { has: vendorId.value }, deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
        orderBy: { createdAt: 'desc' },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findByStatus(status: OrderStatusVO): Promise<readonly OrderEntity[]> {
    try {
      const rows = await this.delegate.findMany({
        where: { status: status.value, deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findByCustomerAndStatus(
    customerId: CustomerIdVO,
    status: OrderStatusVO,
  ): Promise<readonly OrderEntity[]> {
    try {
      const rows = await this.delegate.findMany({
        where: {
          customerId: customerId.value,
          status: status.value,
          deletedAt: null,
        },
        include: { items: { where: { deletedAt: null } } },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async findAll(): Promise<readonly OrderEntity[]> {
    try {
      const rows = await this.delegate.findMany({
        where: { deletedAt: null },
        include: { items: { where: { deletedAt: null } } },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async existsByNumber(orderNumber: OrderNumberVO): Promise<boolean> {
    try {
      const count = await this.delegate.count({
        where: { orderNumber: orderNumber.value },
      });
      return count > 0;
    } catch {
      return false;
    }
  }

  async exists(id: string): Promise<boolean> {
    try {
      const count = await this.delegate.count({ where: { id } });
      return count > 0;
    } catch {
      return false;
    }
  }

  async findPaginated(options: OrderListOptions): Promise<OrderPaginationResult> {
    const page = options.page;
    const limit = options.limit;
    try {
      const where = this.buildFilter(options.filter);
      const [rows, total] = await Promise.all([
        this.delegate.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' },
          include: { items: { where: { deletedAt: null } } },
        }),
        this.delegate.count({ where }),
      ]);
      return {
        items: rows.map((r) => this.toDomain(r)),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (err) {
      this.logger.warn(`findPaginated failed: ${err instanceof Error ? err.message : String(err)}`);
      return { items: [], total: 0, page, limit, totalPages: 0 };
    }
  }

  async countByCustomer(customerId: CustomerIdVO): Promise<number> {
    try {
      return await this.delegate.count({
        where: { customerId: customerId.value, deletedAt: null },
      });
    } catch {
      return 0;
    }
  }

  async findPendingOlderThan(hours: number): Promise<readonly OrderEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    try {
      const rows = await this.delegate.findMany({
        where: {
          status: 'pending',
          createdAt: { lt: threshold },
          deletedAt: null,
        },
        include: { items: { where: { deletedAt: null } } },
      });
      return rows.map((r) => this.toDomain(r));
    } catch {
      return [];
    }
  }

  async getStats(
    customerId?: string,
    vendorId?: string,
    fromDate?: string,
    toDate?: string,
  ): Promise<OrderStats> {
    try {
      const where: Record<string, unknown> = { deletedAt: null };
      if (customerId) where.customerId = customerId;
      if (vendorId) where.vendorIds = { has: vendorId };
      if (fromDate || toDate) {
        where.createdAt = {
          ...(fromDate ? { gte: new Date(fromDate) } : {}),
          ...(toDate ? { lte: new Date(toDate) } : {}),
        };
      }
      const [count, agg, groups] = await Promise.all([
        this.delegate.count({ where }),
        this.delegate.aggregate({ where, _sum: { total: true }, _avg: { total: true } }),
        this.delegate.groupBy({ by: ['status'], where, _count: { _all: true } }),
      ]);
      const byStatus: Record<string, number> = {};
      for (const g of groups) byStatus[g.status] = g._count._all;
      return {
        totalOrders: count,
        totalRevenue: Number(agg._sum.total ?? 0),
        averageOrderValue: Number(agg._avg.total ?? 0),
        currency: 'BDT',
        byStatus,
      };
    } catch {
      return {
        totalOrders: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
        currency: 'BDT',
        byStatus: {},
      };
    }
  }

  // ─── Mutation methods ───
  async save(entity: OrderEntity): Promise<OrderEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.delegate.findUnique({ where: { id: entity.id } });
      const raw = existing
        ? await this.delegate.update({ where: { id: entity.id }, data })
        : await this.delegate.create({ data });

      // Sync items — replace all
      await this.itemDelegate.deleteMany({ where: { orderId: entity.id } });
      if (entity.items.length > 0) {
        await this.itemDelegate.createMany({
          data: entity.items.map((item: OrderItemEntity) =>
            this.itemToPersistence(item, entity.id),
          ),
        });
      }
      // Reload with items
      const reloaded = await this.delegate.findUnique({
        where: { id: entity.id },
        include: { items: { where: { deletedAt: null } } },
      });
      return reloaded ? this.toDomain(reloaded) : this.toDomain(raw);
    } catch (err) {
      this.logger.error(`save failed: ${err instanceof Error ? err.message : String(err)}`);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.delegate.update({
        where: { id },
        data: { deletedAt: new Date() } as unknown,
      });
    } catch (err) {
      this.logger.warn(`delete failed: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    void deletedBy;
    await this.delete(id);
  }

  // ─── Mapping ───
  private buildFilter(filter?: OrderListOptions['filter']): Record<string, unknown> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (!filter) return where;
    if (filter.customerId) where.customerId = filter.customerId;
    if (filter.vendorId) where.vendorIds = { has: filter.vendorId };
    if (filter.status) where.status = filter.status;
    if (filter.priority) where.priority = filter.priority;
    if (filter.type) where.type = filter.type;
    if (filter.fromDate || filter.toDate) {
      where.createdAt = {
        ...(filter.fromDate ? { gte: new Date(filter.fromDate) } : {}),
        ...(filter.toDate ? { lte: new Date(filter.toDate) } : {}),
      };
    }
    if (filter.minTotal !== undefined || filter.maxTotal !== undefined) {
      where.total = {
        ...(filter.minTotal !== undefined ? { gte: filter.minTotal } : {}),
        ...(filter.maxTotal !== undefined ? { lte: filter.maxTotal } : {}),
      };
    }
    if (filter.search) {
      where.OR = [
        { orderNumber: { contains: filter.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }

  private toDomain(raw: PrismaOrderRow): OrderEntity {
    const items = (raw.items ?? []).map((i) => this.itemToDomain(i));
    return OrderEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      items,
      version: raw.version,
      props: {
        orderNumber: OrderNumberVO.reconstitute(raw.orderNumber),
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        vendorIds: raw.vendorIds.map((v: string) => VendorIdVO.reconstitute(v)),
        type: OrderTypeVO.reconstitute(raw.type),
        status: OrderStatusVO.reconstitute(raw.status),
        priority: OrderPriorityVO.reconstitute(raw.priority),
        currency: raw.currency,
        subtotal: Number(raw.subtotal),
        discountAmount: Number(raw.discountAmount),
        taxAmount: Number(raw.taxAmount),
        shippingAmount: Number(raw.shippingAmount),
        total: Number(raw.total),
        paymentId: raw.paymentId ? PaymentIdVO.reconstitute(raw.paymentId) : undefined,
        paymentStatus: raw.paymentStatus ?? undefined,
        paymentMethod: raw.paymentMethod ?? undefined,
        shippingMethod: raw.shippingMethod ?? undefined,
        trackingNumber: raw.trackingNumber ?? undefined,
        notes: raw.notes ? OrderNoteVO.reconstitute(raw.notes) : undefined,
        customerNotes: raw.customerNotes ? OrderNoteVO.reconstitute(raw.customerNotes) : undefined,
        confirmedAt: raw.confirmedAt?.toISOString(),
        shippedAt: raw.shippedAt?.toISOString(),
        deliveredAt: raw.deliveredAt?.toISOString(),
        cancelledAt: raw.cancelledAt?.toISOString(),
        completedAt: raw.completedAt?.toISOString(),
      },
    });
  }

  private itemToDomain(raw: PrismaOrderItemRow): OrderItemEntity {
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

  private toPersistence(entity: OrderEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderNumber: entity.orderNumber.value,
      customerId: entity.customerId.value,
      vendorIds: entity.vendorIds.map((v) => v.value),
      type: entity.type.value,
      status: entity.status.value,
      priority: entity.priority.value,
      subtotal: entity.subtotal,
      discountAmount: entity.discountAmount,
      taxAmount: entity.taxAmount,
      shippingAmount: entity.shippingAmount,
      total: entity.total,
      currency: entity.currency,
      paymentId: entity.paymentId?.value ?? null,
      paymentStatus: entity.paymentStatus ?? null,
      paymentMethod: entity.paymentMethod ?? null,
      shippingMethod: entity.shippingMethod ?? null,
      trackingNumber: entity.trackingNumber ?? null,
      notes: entity.notes?.value ?? null,
      customerNotes: entity.customerNotes?.value ?? null,
      confirmedAt: entity.confirmedAt ? new Date(entity.confirmedAt) : null,
      shippedAt: entity.shippedAt ? new Date(entity.shippedAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      completedAt: entity.completedAt ? new Date(entity.completedAt) : null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  private itemToPersistence(item: OrderItemEntity, orderId: string): Record<string, unknown> {
    return {
      id: item.id,
      orderId,
      productId: item.productId.value,
      variantId: item.variantId?.value ?? null,
      vendorId: item.vendorId?.value ?? null,
      sku: item.sku,
      name: item.name,
      imageUrl: item.imageUrl ?? null,
      type: item.type,
      status: item.status.value,
      quantity: item.quantity.value,
      unitPrice: item.price.amount,
      compareAtPrice: item.price.compareAt ?? null,
      subtotal: item.lineSubtotal,
      discountAmount: item.discountAmount,
      taxAmount: item.taxAmount,
      shippingAmount: item.shippingAmount,
      total: item.lineTotal,
      currency: item.currency,
      attributes: item.attributes ?? null,
      notes: item.notes ?? null,
      updatedAt: new Date(item.updatedAt),
    };
  }
}

/**
 * OrderFulfillmentPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderFulfillmentRepository } from '../../../../domain/repositories/order-fulfillment.repository.interface.js';
import { OrderFulfillmentEntity } from '../../../../domain/entities/order-fulfillment.entity.js';
import { FulfillmentStatusVO } from '../../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo.js';

interface Row {
  id: string; orderId: string; vendorId: string | null;
  status: string; type: string; itemIds: string[];
  trackingNumber: string | null; courierId: string | null; warehouseId: string | null;
  shippingCost: unknown; currency: string;
  fulfilledAt: Date | null; deliveredAt: Date | null; notes: string | null;
  createdAt: Date; updatedAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class OrderFulfillmentPrismaRepository implements OrderFulfillmentRepository {
  private readonly logger = new Logger(OrderFulfillmentPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { orderFulfillment: Delegate }).orderFulfillment; }

  async findById(id: string): Promise<OrderFulfillmentEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<OrderFulfillmentEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderFulfillmentEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByVendorId(vendorId: VendorIdVO): Promise<readonly OrderFulfillmentEntity[]> {
    try { const rows = await this.d.findMany({ where: { vendorId: vendorId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByStatus(status: FulfillmentStatusVO): Promise<readonly OrderFulfillmentEntity[]> {
    try { const rows = await this.d.findMany({ where: { status: status.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByTrackingNumber(trackingNumber: string): Promise<OrderFulfillmentEntity | null> {
    try { const r = await this.d.findFirst({ where: { trackingNumber } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findActiveByOrder(orderId: OrderIdVO): Promise<OrderFulfillmentEntity | null> {
    try {
      const r = await this.d.findFirst({ where: { orderId: orderId.value, status: { notIn: ['fulfilled', 'cancelled'] } }, orderBy: { createdAt: 'desc' } });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }
  async countByOrder(orderId: OrderIdVO): Promise<number> {
    try { return await this.d.count({ where: { orderId: orderId.value } }); } catch { return 0; }
  }
  async findAll(): Promise<readonly OrderFulfillmentEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: OrderFulfillmentEntity): Promise<OrderFulfillmentEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.update({ where: { id }, data: { status: 'cancelled' } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): OrderFulfillmentEntity {
    return OrderFulfillmentEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        vendorId: raw.vendorId ? VendorIdVO.reconstitute(raw.vendorId) : undefined,
        status: FulfillmentStatusVO.reconstitute(raw.status),
        type: raw.type,
        itemIds: raw.itemIds.map((id: string) => OrderItemIdVO.reconstitute(id)),
        trackingNumber: raw.trackingNumber ? TrackingNumberVO.reconstitute(raw.trackingNumber) : undefined,
        courierId: raw.courierId ?? undefined,
        warehouseId: raw.warehouseId ?? undefined,
        shippingCost: raw.shippingCost !== null ? Number(raw.shippingCost) : undefined,
        currency: raw.currency,
        fulfilledAt: raw.fulfilledAt?.toISOString(),
        deliveredAt: raw.deliveredAt?.toISOString(),
        notes: raw.notes ?? undefined,
      },
    });
  }
  private toPersistence(entity: OrderFulfillmentEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      type: entity.type,
      itemIds: entity.itemIds.map((i) => i.value),
      trackingNumber: entity.trackingNumber?.value ?? null,
      courierId: entity.courierId ?? null,
      warehouseId: entity.warehouseId ?? null,
      shippingCost: entity.shippingCost ?? null,
      currency: entity.currency,
      fulfilledAt: entity.fulfilledAt ? new Date(entity.fulfilledAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      notes: entity.notes ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

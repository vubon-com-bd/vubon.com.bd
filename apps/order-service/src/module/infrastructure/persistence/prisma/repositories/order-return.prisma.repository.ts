/**
 * OrderReturnPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderReturnRepository } from '../../../../domain/repositories/order-return.repository.interface.js';
import { OrderReturnEntity } from '../../../../domain/entities/order-return.entity.js';
import { ReturnReasonVO } from '../../../../domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../../domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../domain/value-objects/primitives/order-item-id.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Row {
  id: string; orderId: string; customerId: string; status: string; reason: string;
  itemIds: string[]; images: string[]; notes: string | null;
  refundAmount: unknown; restockFee: unknown; currency: string;
  requestedAt: Date; approvedAt: Date | null; pickedUpAt: Date | null;
  receivedAt: Date | null; refundedAt: Date | null; closedAt: Date | null;
  createdAt: Date; updatedAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class OrderReturnPrismaRepository implements OrderReturnRepository {
  private readonly logger = new Logger(OrderReturnPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { orderReturn: Delegate }).orderReturn; }

  async findById(id: string): Promise<OrderReturnEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<OrderReturnEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderReturnEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly OrderReturnEntity[]> {
    try { const rows = await this.d.findMany({ where: { customerId: customerId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByStatus(status: ReturnStatusVO): Promise<readonly OrderReturnEntity[]> {
    try { const rows = await this.d.findMany({ where: { status: status.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findActiveByOrder(orderId: OrderIdVO): Promise<OrderReturnEntity | null> {
    try {
      const rows = await this.d.findMany({ where: { orderId: orderId.value, status: { in: ['requested', 'approved', 'pickup_scheduled', 'picked_up', 'received', 'inspected'] } }, orderBy: { createdAt: 'desc' }, take: 1 } as unknown);
      return rows.length > 0 ? this.toDomain(rows[0]) : null;
    } catch { return null; }
  }
  async findPendingOlderThan(hours: number): Promise<readonly OrderReturnEntity[]> {
    const threshold = new Date(Date.now() - hours * 60 * 60 * 1000);
    try { const rows = await this.d.findMany({ where: { status: 'requested', requestedAt: { lt: threshold } } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findAll(): Promise<readonly OrderReturnEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: OrderReturnEntity): Promise<OrderReturnEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.update({ where: { id }, data: { status: 'rejected' } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): OrderReturnEntity {
    return OrderReturnEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        customerId: CustomerIdVO.reconstitute(raw.customerId),
        status: ReturnStatusVO.reconstitute(raw.status),
        reason: ReturnReasonVO.reconstitute(raw.reason),
        itemIds: raw.itemIds.map((id: string) => OrderItemIdVO.reconstitute(id)),
        images: raw.images,
        notes: raw.notes ?? undefined,
        refundAmount: raw.refundAmount !== null ? Number(raw.refundAmount) : undefined,
        restockFee: raw.restockFee !== null ? Number(raw.restockFee) : undefined,
        currency: raw.currency,
        requestedAt: raw.requestedAt.toISOString(),
        approvedAt: raw.approvedAt?.toISOString(),
        pickedUpAt: raw.pickedUpAt?.toISOString(),
        receivedAt: raw.receivedAt?.toISOString(),
        refundedAt: raw.refundedAt?.toISOString(),
        closedAt: raw.closedAt?.toISOString(),
      },
    });
  }
  private toPersistence(entity: OrderReturnEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      status: entity.status.value,
      reason: entity.reason.value,
      itemIds: entity.itemIds.map((i) => i.value),
      images: [...entity.images],
      notes: entity.notes ?? null,
      refundAmount: entity.refundAmount ?? null,
      restockFee: entity.restockFee ?? null,
      currency: entity.currency,
      requestedAt: new Date(entity.requestedAt),
      approvedAt: entity.approvedAt ? new Date(entity.approvedAt) : null,
      pickedUpAt: entity.pickedUpAt ? new Date(entity.pickedUpAt) : null,
      receivedAt: entity.receivedAt ? new Date(entity.receivedAt) : null,
      refundedAt: entity.refundedAt ? new Date(entity.refundedAt) : null,
      closedAt: entity.closedAt ? new Date(entity.closedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

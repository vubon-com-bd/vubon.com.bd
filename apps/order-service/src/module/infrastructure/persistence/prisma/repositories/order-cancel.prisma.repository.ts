/**
 * OrderCancelPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderCancelRepository } from '../../../../domain/repositories/order-cancel.repository.interface.js';
import { OrderCancelEntity } from '../../../../domain/entities/order-cancel.entity.js';
import { CancelReasonVO } from '../../../../domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../../domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo.js';

interface Row {
  id: string; orderId: string; reason: string; status: string;
  requestedBy: string; approvedBy: string | null; notes: string | null;
  refundAmount: unknown; currency: string; restockInventory: boolean;
  requestedAt: Date; processedAt: Date | null;
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
export class OrderCancelPrismaRepository implements OrderCancelRepository {
  private readonly logger = new Logger(OrderCancelPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { orderCancel: Delegate }).orderCancel; }

  async findById(id: string): Promise<OrderCancelEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<OrderCancelEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderCancelEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findActiveByOrder(orderId: OrderIdVO): Promise<OrderCancelEntity | null> {
    try {
      const r = await this.d.findFirst({ where: { orderId: orderId.value, status: { in: ['requested', 'approved', 'processed'] } }, orderBy: { createdAt: 'desc' } });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }
  async findByStatus(status: CancelStatusVO): Promise<readonly OrderCancelEntity[]> {
    try { const rows = await this.d.findMany({ where: { status: status.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByCustomerId(customerId: CustomerIdVO): Promise<readonly OrderCancelEntity[]> {
    try { const rows = await this.d.findMany({ where: { requestedBy: customerId.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async existsByOrderId(orderId: OrderIdVO): Promise<boolean> {
    try { return (await this.d.count({ where: { orderId: orderId.value } })) > 0; } catch { return false; }
  }
  async findAll(): Promise<readonly OrderCancelEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: OrderCancelEntity): Promise<OrderCancelEntity> {
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

  private toDomain(raw: Row): OrderCancelEntity {
    return OrderCancelEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        reason: CancelReasonVO.reconstitute(raw.reason),
        status: CancelStatusVO.reconstitute(raw.status),
        requestedBy: CustomerIdVO.reconstitute(raw.requestedBy),
        approvedBy: raw.approvedBy ? CustomerIdVO.reconstitute(raw.approvedBy) : undefined,
        notes: raw.notes ?? undefined,
        refundAmount: raw.refundAmount !== null ? Number(raw.refundAmount) : undefined,
        currency: raw.currency,
        restockInventory: raw.restockInventory,
        requestedAt: raw.requestedAt.toISOString(),
        processedAt: raw.processedAt?.toISOString(),
      },
    });
  }
  private toPersistence(entity: OrderCancelEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      requestedBy: entity.requestedBy.value,
      approvedBy: entity.approvedBy?.value ?? null,
      notes: entity.notes ?? null,
      refundAmount: entity.refundAmount ?? null,
      currency: entity.currency,
      restockInventory: entity.restockInventory,
      requestedAt: new Date(entity.requestedAt),
      processedAt: entity.processedAt ? new Date(entity.processedAt) : null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

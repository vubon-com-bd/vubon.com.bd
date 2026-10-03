/**
 * DeliveryPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { DeliveryRepository } from '../../../../domain/repositories/delivery.repository.interface.js';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../domain/value-objects/primitives/delivery-type.vo.js';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Row {
  id: string; orderId: string; deliveryMethodId: string | null;
  status: string; type: string; trackingNumber: string | null;
  courierId: string | null; estimatedAt: Date | null; deliveredAt: Date | null;
  attempts: number; notes: string | null;
  createdAt: Date; updatedAt: Date; deletedAt: Date | null;
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
export class DeliveryPrismaRepository implements DeliveryRepository {
  private readonly logger = new Logger(DeliveryPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { delivery: Delegate }).delivery; }

  async findById(id: string): Promise<DeliveryEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<DeliveryEntity | null> { return this.findById(id.value); }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly DeliveryEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value, deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByStatus(status: DeliveryStatusVO): Promise<readonly DeliveryEntity[]> {
    try { const rows = await this.d.findMany({ where: { status: status.value, deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByTrackingNumber(trackingNumber: string): Promise<DeliveryEntity | null> {
    try { const r = await this.d.findFirst({ where: { trackingNumber, deletedAt: null } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByCourierId(courierId: string): Promise<readonly DeliveryEntity[]> {
    try { const rows = await this.d.findMany({ where: { courierId, deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findActiveByOrder(orderId: OrderIdVO): Promise<DeliveryEntity | null> {
    try {
      const r = await this.d.findFirst({
        where: { orderId: orderId.value, status: { notIn: ['delivered', 'cancelled', 'refused', 'failed'] }, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      return r ? this.toDomain(r) : null;
    } catch { return null; }
  }
  async findOverdue(before: string): Promise<readonly DeliveryEntity[]> {
    try { const rows = await this.d.findMany({ where: { estimatedAt: { lt: new Date(before) }, status: { notIn: ['delivered', 'cancelled'] }, deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findAll(): Promise<readonly DeliveryEntity[]> {
    try { const rows = await this.d.findMany({ where: { deletedAt: null } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.update({ where: { id }, data: { deletedAt: new Date() } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }
  async softDelete(id: string): Promise<void> { await this.delete(id); }

  private toDomain(raw: Row): DeliveryEntity {
    return DeliveryEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.updatedAt.toISOString(),
      deletedAt: raw.deletedAt ? raw.deletedAt.toISOString() : null,
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        methodId: raw.deliveryMethodId ? DeliveryMethodIdVO.reconstitute(raw.deliveryMethodId) : undefined,
        status: DeliveryStatusVO.reconstitute(raw.status),
        type: DeliveryTypeVO.reconstitute(raw.type),
        trackingNumber: raw.trackingNumber ?? undefined,
        courierId: raw.courierId ?? undefined,
        estimatedAt: raw.estimatedAt?.toISOString(),
        deliveredAt: raw.deliveredAt?.toISOString(),
        attempts: raw.attempts,
        notes: raw.notes ?? undefined,
      },
    });
  }
  private toPersistence(entity: DeliveryEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      deliveryMethodId: entity.methodId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      trackingNumber: entity.trackingNumber ?? null,
      courierId: entity.courierId ?? null,
      estimatedAt: entity.estimatedAt ? new Date(entity.estimatedAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      attempts: entity.attempts,
      notes: entity.notes ?? null,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

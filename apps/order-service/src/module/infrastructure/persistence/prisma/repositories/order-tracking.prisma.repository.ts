/**
 * OrderTrackingPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type { OrderTrackingRepository } from '../../../../domain/repositories/order-tracking.repository.interface.js';
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity.js';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';

interface Row {
  id: string; orderId: string; event: string; message: string;
  location: string | null; latitude: number | null; longitude: number | null;
  trackingNumber: string | null; createdBy: string | null; metadata: unknown;
  occurredAt: Date; createdAt: Date;
}
interface Delegate {
  findUnique(a: unknown): Promise<Row | null>;
  findFirst(a: unknown): Promise<Row | null>;
  findMany(a?: unknown): Promise<Row[]>;
  create(a: unknown): Promise<Row>;
  update(a: unknown): Promise<Row>;
  deleteMany(a: unknown): Promise<{ count: number }>;
  count(a?: unknown): Promise<number>;
}

@Injectable()
export class OrderTrackingPrismaRepository implements OrderTrackingRepository {
  private readonly logger = new Logger(OrderTrackingPrismaRepository.name);
  constructor(private readonly prisma: PrismaService) {}
  private get d(): Delegate { return (this.prisma as unknown as { orderTracking: Delegate }).orderTracking; }

  async findById(id: string): Promise<OrderTrackingEntity | null> {
    try { const r = await this.d.findUnique({ where: { id } }); return r ? this.toDomain(r) : null; }
    catch { return null; }
  }
  async findByIdVO(id: { value: string }): Promise<OrderTrackingEntity | null> { return this.findById(id.value); }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly OrderTrackingEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value }, orderBy: { occurredAt: 'asc' } } as unknown); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findByTrackingNumber(trackingNumber: string): Promise<readonly OrderTrackingEntity[]> {
    try { const rows = await this.d.findMany({ where: { trackingNumber }, orderBy: { occurredAt: 'asc' } } as unknown); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findLatestByOrder(orderId: OrderIdVO): Promise<OrderTrackingEntity | null> {
    try {
      const rows = await this.d.findMany({ where: { orderId: orderId.value }, take: 1, orderBy: { occurredAt: 'desc' } } as unknown);
      return rows.length > 0 ? this.toDomain(rows[0]) : null;
    } catch { return null; }
  }
  async findByEvent(orderId: OrderIdVO, event: TrackingStatusVO): Promise<readonly OrderTrackingEntity[]> {
    try { const rows = await this.d.findMany({ where: { orderId: orderId.value, event: event.value } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async countByOrder(orderId: OrderIdVO): Promise<number> {
    try { return await this.d.count({ where: { orderId: orderId.value } }); } catch { return 0; }
  }
  async findOldToPrune(before: string): Promise<readonly OrderTrackingEntity[]> {
    try { const rows = await this.d.findMany({ where: { occurredAt: { lt: new Date(before) } } }); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async findAll(): Promise<readonly OrderTrackingEntity[]> {
    try { const rows = await this.d.findMany(); return rows.map((r) => this.toDomain(r)); }
    catch { return []; }
  }
  async exists(id: string): Promise<boolean> {
    try { return (await this.d.count({ where: { id } })) > 0; } catch { return false; }
  }
  async save(entity: OrderTrackingEntity): Promise<OrderTrackingEntity> {
    const data = this.toPersistence(entity);
    try {
      const existing = await this.d.findUnique({ where: { id: entity.id } });
      const raw = existing ? await this.d.update({ where: { id: entity.id }, data }) : await this.d.create({ data });
      return this.toDomain(raw);
    } catch (err) { this.logger.error(`save failed: ${String(err)}`); throw err; }
  }
  async delete(id: string): Promise<void> {
    try { await this.d.deleteMany({ where: { id } }); }
    catch (err) { this.logger.warn(`delete failed: ${String(err)}`); }
  }

  private toDomain(raw: Row): OrderTrackingEntity {
    return OrderTrackingEntity.reconstitute({
      id: raw.id,
      createdAt: raw.createdAt.toISOString(),
      updatedAt: raw.createdAt.toISOString(),
      props: {
        orderId: OrderIdVO.reconstitute(raw.orderId),
        event: TrackingStatusVO.reconstitute(raw.event),
        message: raw.message,
        location: raw.location ?? undefined,
        latitude: raw.latitude ?? undefined,
        longitude: raw.longitude ?? undefined,
        trackingNumber: raw.trackingNumber ?? undefined,
        createdBy: raw.createdBy ?? undefined,
        metadata: (raw.metadata as Readonly<Record<string, unknown>> | null) ?? undefined,
        occurredAt: raw.occurredAt.toISOString(),
      },
    });
  }
  private toPersistence(entity: OrderTrackingEntity): Record<string, unknown> {
    return {
      id: entity.id,
      orderId: entity.orderId.value,
      event: entity.event.value,
      message: entity.message,
      location: entity.location ?? null,
      latitude: entity.latitude ?? null,
      longitude: entity.longitude ?? null,
      trackingNumber: entity.trackingNumber ?? null,
      createdBy: entity.createdBy ?? null,
      metadata: entity.metadata ?? null,
      occurredAt: new Date(entity.occurredAt),
    };
  }
}

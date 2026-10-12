import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  TrackingRepository, TrackingListOptions, TrackingPaginationResult,
} from '../../../../domain/repositories/tracking.repository.interface.js';
import { TrackingEntity } from '../../../../domain/entities/tracking.entity.js';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo.js';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo.js';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo.js';
import { TrackingPrismaMapper } from '../tracking.prisma.mapper.js';

@Injectable()
export class TrackingPrismaRepository implements TrackingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<TrackingEntity | null> {
    return this.findByIdVO(TrackingIdVO.reconstitute(id));
  }
  async findByIdVO(id: TrackingIdVO): Promise<TrackingEntity | null> {
    const row = await this.prisma.logisticsTracking.findFirst({
      where: { id: id.value, deletedAt: null }, include: { events: true },
    });
    return row ? TrackingPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly TrackingEntity[]> {
    const rows = await this.prisma.logisticsTracking.findMany({
      where: { deletedAt: null }, include: { events: true }, orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => TrackingPrismaMapper.toDomain(r as never));
  }
  async findByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<TrackingEntity | null> {
    const row = await this.prisma.logisticsTracking.findFirst({
      where: { trackingNumber: trackingNumber.value, deletedAt: null }, include: { events: true },
    });
    return row ? TrackingPrismaMapper.toDomain(row as never) : null;
  }
  async findByShipmentId(shipmentId: ShipmentIdVO): Promise<TrackingEntity | null> {
    const row = await this.prisma.logisticsTracking.findFirst({
      where: { shipmentId: shipmentId.value, deletedAt: null }, include: { events: true },
    });
    return row ? TrackingPrismaMapper.toDomain(row as never) : null;
  }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly TrackingEntity[]> {
    const rows = await this.prisma.logisticsTracking.findMany({
      where: { orderId: orderId.value, deletedAt: null }, include: { events: true },
    });
    return rows.map((r) => TrackingPrismaMapper.toDomain(r as never));
  }
  async findByStatus(status: TrackingStatusVO): Promise<readonly TrackingEntity[]> {
    const rows = await this.prisma.logisticsTracking.findMany({
      where: { status: status.value, deletedAt: null }, include: { events: true },
    });
    return rows.map((r) => TrackingPrismaMapper.toDomain(r as never));
  }
  async findPublicByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<TrackingEntity | null> {
    const row = await this.prisma.logisticsTracking.findFirst({
      where: { trackingNumber: trackingNumber.value, publicAccess: true, deletedAt: null },
      include: { events: true },
    });
    return row ? TrackingPrismaMapper.toDomain(row as never) : null;
  }
  async findActive(): Promise<readonly TrackingEntity[]> {
    const rows = await this.prisma.logisticsTracking.findMany({
      where: { status: { in: ['pending', 'active'] }, deletedAt: null }, include: { events: true },
    });
    return rows.map((r) => TrackingPrismaMapper.toDomain(r as never));
  }
  async findStaleNoUpdate(olderThanMinutes: number): Promise<readonly TrackingEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60 * 1000);
    const rows = await this.prisma.logisticsTracking.findMany({
      where: { lastUpdatedAt: { lt: cutoff }, status: { in: ['pending', 'active'] }, deletedAt: null },
      include: { events: true },
    });
    return rows.map((r) => TrackingPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: TrackingListOptions): Promise<TrackingPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.shipmentId) where['shipmentId'] = f.shipmentId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.status) where['status'] = f.status;
    if (f.courierCode) where['courierCode'] = f.courierCode;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsTracking.findMany({ where: where as never, orderBy, include: { events: true }, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsTracking.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => TrackingPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<boolean> {
    return (await this.prisma.logisticsTracking.count({ where: { trackingNumber: trackingNumber.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsTracking.count({ where: { id } })) > 0;
  }
  async save(entity: TrackingEntity): Promise<TrackingEntity> {
    const data = TrackingPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsTracking.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      await this.prisma.$transaction([
        this.prisma.logisticsTrackingEvent.deleteMany({ where: { trackingId: entity.id } }),
        this.prisma.logisticsTracking.update({ where: { id: entity.id }, data: data as never }),
      ]);
    } else {
      await this.prisma.logisticsTracking.create({ data: data as never });
    }
    const saved = await this.prisma.logisticsTracking.findUniqueOrThrow({
      where: { id: entity.id }, include: { events: true },
    });
    return TrackingPrismaMapper.toDomain(saved as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsTracking.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsTracking.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

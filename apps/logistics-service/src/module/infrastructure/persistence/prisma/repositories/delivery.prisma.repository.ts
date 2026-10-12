/**
 * DeliveryPrismaRepository — implements DeliveryRepository
 * @module logistics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  DeliveryRepository, DeliveryListOptions, DeliveryPaginationResult, DeliveryStats,
} from '../../../../domain/repositories/delivery.repository.interface.js';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity.js';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo.js';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo.js';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryPrismaMapper } from '../delivery.prisma.mapper.js';

@Injectable()
export class DeliveryPrismaRepository implements DeliveryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<DeliveryEntity | null> {
    return this.findByIdVO(DeliveryIdVO.reconstitute(id));
  }
  async findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const row = await this.prisma.logisticsDelivery.findFirst({
      where: { id: id.value, deletedAt: null },
      include: { attempts: true },
    });
    return row ? DeliveryPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: { deletedAt: null }, include: { attempts: true }, orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findByShipmentId(shipmentId: ShipmentIdVO): Promise<DeliveryEntity | null> {
    const row = await this.prisma.logisticsDelivery.findFirst({
      where: { shipmentId: shipmentId.value, deletedAt: null },
      include: { attempts: true },
    });
    return row ? DeliveryPrismaMapper.toDomain(row as never) : null;
  }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: { orderId: orderId.value, deletedAt: null }, include: { attempts: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findByDriverId(driverId: DriverIdVO): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: { driverId: driverId.value, deletedAt: null }, include: { attempts: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findByStatus(status: DeliveryStatusVO): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: { status: status.value, deletedAt: null }, include: { attempts: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findActiveByDriver(driverId: DriverIdVO): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: {
        driverId: driverId.value, deletedAt: null,
        status: { notIn: ['delivered', 'cancelled'] },
      },
      include: { attempts: true }, orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findScheduledFor(date: string): Promise<readonly DeliveryEntity[]> {
    const start = new Date(date); start.setHours(0, 0, 0, 0);
    const end = new Date(date); end.setHours(23, 59, 59, 999);
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: { scheduledAt: { gte: start, lte: end }, deletedAt: null },
      include: { attempts: true },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.shipmentId) where['shipmentId'] = f.shipmentId;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.driverId) where['driverId'] = f.driverId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsDelivery.findMany({ where: where as never, orderBy, include: { attempts: true }, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsDelivery.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => DeliveryPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async getStats(driverId?: string, fromDate?: string, toDate?: string): Promise<DeliveryStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (driverId) where['driverId'] = driverId;
    if (fromDate || toDate) where['createdAt'] = { ...(fromDate ? { gte: new Date(fromDate) } : {}), ...(toDate ? { lte: new Date(toDate) } : {}) };
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: where as never, include: { attempts: true },
    });
    let delivered = 0, failed = 0, inTransit = 0, totalAttempts = 0, firstAttemptSuccess = 0;
    const byStatus: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      if (r.status === 'delivered') delivered++;
      if (r.status === 'failed') failed++;
      if (['in_transit', 'out_for_delivery'].includes(r.status)) inTransit++;
      totalAttempts += r.attempts.length;
      if (r.attempts.length >= 1 && r.attempts[0]?.status === 'success') firstAttemptSuccess++;
    }
    return {
      totalDeliveries: rows.length, delivered, failed, inTransit,
      averageAttempts: rows.length ? Math.round((totalAttempts / rows.length) * 100) / 100 : 0,
      firstAttemptSuccessRate: rows.length ? Math.round((firstAttemptSuccess / rows.length) * 100) / 100 : 0,
      byStatus,
    };
  }
  async findStaleAssigned(olderThanHours: number): Promise<readonly DeliveryEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.prisma.logisticsDelivery.findMany({
      where: {
        status: { in: ['assigned', 'picked_up'] },
        updatedAt: { lt: cutoff }, deletedAt: null,
      },
      include: { attempts: true },
    });
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r as never));
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsDelivery.count({ where: { id } })) > 0;
  }
  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data = DeliveryPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsDelivery.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      await this.prisma.$transaction([
        this.prisma.logisticsDeliveryAttempt.deleteMany({ where: { deliveryId: entity.id } }),
        this.prisma.logisticsDelivery.update({ where: { id: entity.id }, data: data as never }),
      ]);
    } else {
      await this.prisma.logisticsDelivery.create({ data: data as never });
    }
    const saved = await this.prisma.logisticsDelivery.findUniqueOrThrow({
      where: { id: entity.id }, include: { attempts: true },
    });
    return DeliveryPrismaMapper.toDomain(saved as never);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.logisticsDelivery.delete({ where: { id } });
  }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsDelivery.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

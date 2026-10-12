/**
 * ShipmentPrismaRepository — implements ShipmentRepository
 * @module logistics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  ShipmentRepository,
  ShipmentListOptions,
  ShipmentPaginationResult,
  ShipmentStats,
} from '../../../../domain/repositories/shipment.repository.interface.js';
import { ShipmentEntity } from '../../../../domain/entities/shipment.entity.js';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo.js';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { ShipmentStatusVO } from '../../../../domain/value-objects/primitives/shipment-status.vo.js';
import { ShipmentPrismaMapper } from '../shipment.prisma.mapper.js';

@Injectable()
export class ShipmentPrismaRepository implements ShipmentRepository {
  private readonly logger = new Logger(ShipmentPrismaRepository.name);

  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ShipmentEntity | null> {
    return this.findByIdVO(ShipmentIdVO.reconstitute(id));
  }

  async findByIdVO(id: ShipmentIdVO): Promise<ShipmentEntity | null> {
    const row = await this.prisma.logisticsShipment.findFirst({
      where: { id: id.value, deletedAt: null },
      include: { packages: true },
    });
    return row ? ShipmentPrismaMapper.toDomain(row as never) : null;
  }

  async findAll(): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<ShipmentEntity | null> {
    const row = await this.prisma.logisticsShipment.findFirst({
      where: { trackingNumber: trackingNumber.value, deletedAt: null },
      include: { packages: true },
    });
    return row ? ShipmentPrismaMapper.toDomain(row as never) : null;
  }

  async findByOrderId(orderId: OrderIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { orderId: orderId.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByUserId(userId: UserIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { userId: userId.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByVendorId(vendorId: VendorIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { vendorId: vendorId.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByCourierId(courierId: CourierIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { courierId: courierId.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByWarehouseId(warehouseId: WarehouseIdVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { warehouseId: warehouseId.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findByStatus(status: ShipmentStatusVO): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: { status: status.value, deletedAt: null },
      include: { packages: true },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async existsByTrackingNumber(trackingNumber: TrackingNumberVO): Promise<boolean> {
    const count = await this.prisma.logisticsShipment.count({
      where: { trackingNumber: trackingNumber.value },
    });
    return count > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.logisticsShipment.count({ where: { id } });
    return count > 0;
  }

  async save(entity: ShipmentEntity): Promise<ShipmentEntity> {
    const data = ShipmentPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsShipment.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      await this.prisma.$transaction([
        this.prisma.logisticsShipmentPackage.deleteMany({ where: { shipmentId: entity.id } }),
        this.prisma.logisticsShipment.update({
          where: { id: entity.id },
          data: data as never,
        }),
      ]);
    } else {
      await this.prisma.logisticsShipment.create({ data: data as never });
    }

    const saved = await this.prisma.logisticsShipment.findUniqueOrThrow({
      where: { id: entity.id },
      include: { packages: true },
    });
    return ShipmentPrismaMapper.toDomain(saved as never);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.logisticsShipment.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsShipment.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async countByOrder(orderId: OrderIdVO): Promise<number> {
    return this.prisma.logisticsShipment.count({
      where: { orderId: orderId.value, deletedAt: null },
    });
  }

  async findPaginated(options: ShipmentListOptions): Promise<ShipmentPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;

    const [rows, total] = await Promise.all([
      this.prisma.logisticsShipment.findMany({
        where: where as never,
        orderBy,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
        include: { packages: true },
      }),
      this.prisma.logisticsShipment.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => ShipmentPrismaMapper.toDomain(r as never)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async getStats(userId?: string, vendorId?: string, fromDate?: string, toDate?: string): Promise<ShipmentStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (userId) where['userId'] = userId;
    if (vendorId) where['vendorId'] = vendorId;
    if (fromDate || toDate) {
      where['createdAt'] = {
        ...(fromDate ? { gte: new Date(fromDate) } : {}),
        ...(toDate ? { lte: new Date(toDate) } : {}),
      };
    }

    const rows = await this.prisma.logisticsShipment.findMany({
      where: where as never,
      select: { status: true, priority: true, courierId: true },
    });

    const byStatus: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    const byCourier: Record<string, number> = {};
    let inTransit = 0, delivered = 0, failed = 0, returned = 0, cancelled = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byPriority[r.priority] = (byPriority[r.priority] ?? 0) + 1;
      if (r.courierId) byCourier[r.courierId] = (byCourier[r.courierId] ?? 0) + 1;
      if (['picked_up', 'in_transit', 'out_for_delivery'].includes(r.status)) inTransit++;
      if (r.status === 'delivered') delivered++;
      if (r.status === 'failed') failed++;
      if (r.status === 'returned') returned++;
      if (r.status === 'cancelled') cancelled++;
    }

    return {
      totalShipments: rows.length,
      inTransit, delivered, failed, returned, cancelled,
      byStatus, byPriority, byCourier,
    };
  }

  async findStale(olderThanHours: number): Promise<readonly ShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const rows = await this.prisma.logisticsShipment.findMany({
      where: {
        status: { notIn: ['delivered', 'returned', 'cancelled'] },
        updatedAt: { lt: cutoff },
        deletedAt: null,
      },
      include: { packages: true },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findReadyForPickup(): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: {
        status: 'packed',
        courierId: { not: null },
        warehouseId: { not: null },
        labelUrl: { not: null },
        deletedAt: null,
      },
      include: { packages: true },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  async findAwaitingCourier(): Promise<readonly ShipmentEntity[]> {
    const rows = await this.prisma.logisticsShipment.findMany({
      where: {
        courierId: null,
        status: { in: ['pending', 'confirmed', 'processing'] },
        deletedAt: null,
      },
      include: { packages: true },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r as never));
  }

  private buildWhere(options: ShipmentListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.courierId) where['courierId'] = f.courierId;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.priority) where['priority'] = f.priority;
    if (f.isCOD !== undefined) where['isCOD'] = f.isCOD;
    if (f.isInsured !== undefined) where['isInsured'] = f.isInsured;
    if (f.fromDate || f.toDate) {
      where['createdAt'] = {
        ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}),
        ...(f.toDate ? { lte: new Date(f.toDate) } : {}),
      };
    }
    if (f.search) {
      where['OR'] = [
        { trackingNumber: { contains: f.search, mode: 'insensitive' } },
        { courierTrackingNumber: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}

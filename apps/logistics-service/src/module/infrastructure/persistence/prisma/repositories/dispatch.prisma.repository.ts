import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  DispatchRepository, DispatchListOptions, DispatchPaginationResult,
} from '../../../../domain/repositories/dispatch.repository.interface.js';
import { DispatchEntity } from '../../../../domain/entities/dispatch.entity.js';
import { DispatchIdVO } from '../../../../domain/value-objects/primitives/dispatch-id.vo.js';
import { DispatchNumberVO } from '../../../../domain/value-objects/primitives/dispatch-number.vo.js';
import { DispatchStatusVO } from '../../../../domain/value-objects/primitives/dispatch-status.vo.js';
import { DispatchTypeVO } from '../../../../domain/value-objects/primitives/dispatch-type.vo.js';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo.js';
import { DispatchPrismaMapper } from '../dispatch.prisma.mapper.js';

@Injectable()
export class DispatchPrismaRepository implements DispatchRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<DispatchEntity | null> { return this.findByIdVO(DispatchIdVO.reconstitute(id)); }
  async findByIdVO(id: DispatchIdVO): Promise<DispatchEntity | null> {
    const row = await this.prisma.logisticsDispatch.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? DispatchPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByNumber(dispatchNumber: DispatchNumberVO): Promise<DispatchEntity | null> {
    const row = await this.prisma.logisticsDispatch.findFirst({ where: { dispatchNumber: dispatchNumber.value, deletedAt: null } });
    return row ? DispatchPrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: DispatchStatusVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByType(type: DispatchTypeVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByCourier(courierId: CourierIdVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { courierId: courierId.value, deletedAt: null } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { warehouseId: warehouseId.value, deletedAt: null } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByDriver(driverId: DriverIdVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { driverId: driverId.value, deletedAt: null } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findByShipmentId(shipmentId: string): Promise<DispatchEntity | null> {
    const row = await this.prisma.logisticsDispatch.findFirst({
      where: { shipmentIds: { has: shipmentId }, deletedAt: null },
    });
    return row ? DispatchPrismaMapper.toDomain(row as never) : null;
  }
  async findPending(): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { status: 'pending', deletedAt: null }, orderBy: { createdAt: 'asc' } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findInFlight(): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.logisticsDispatch.findMany({ where: { status: { in: ['dispatched', 'in_transit'] }, deletedAt: null }, orderBy: { createdAt: 'asc' } });
    return rows.map((r) => DispatchPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: DispatchListOptions): Promise<DispatchPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.courierId) where['courierId'] = f.courierId;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.driverId) where['driverId'] = f.driverId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsDispatch.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsDispatch.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => DispatchPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByNumber(dispatchNumber: DispatchNumberVO): Promise<boolean> {
    return (await this.prisma.logisticsDispatch.count({ where: { dispatchNumber: dispatchNumber.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsDispatch.count({ where: { id } })) > 0;
  }
  async save(entity: DispatchEntity): Promise<DispatchEntity> {
    const data = DispatchPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsDispatch.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsDispatch.update({ where: { id: entity.id }, data: data as never });
      return DispatchPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsDispatch.create({ data: data as never });
    return DispatchPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsDispatch.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsDispatch.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

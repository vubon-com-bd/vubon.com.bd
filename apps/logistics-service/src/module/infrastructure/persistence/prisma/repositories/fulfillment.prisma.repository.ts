import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  FulfillmentRepository, FulfillmentListOptions, FulfillmentPaginationResult,
} from '../../../../domain/repositories/fulfillment.repository.interface.js';
import { FulfillmentEntity } from '../../../../domain/entities/fulfillment.entity.js';
import { FulfillmentIdVO } from '../../../../domain/value-objects/primitives/fulfillment-id.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { FulfillmentStatusVO } from '../../../../domain/value-objects/primitives/fulfillment-status.vo.js';
import { FulfillmentPriorityVO } from '../../../../domain/value-objects/primitives/fulfillment-priority.vo.js';
import { FulfillmentPrismaMapper } from '../fulfillment.prisma.mapper.js';

@Injectable()
export class FulfillmentPrismaRepository implements FulfillmentRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<FulfillmentEntity | null> { return this.findByIdVO(FulfillmentIdVO.reconstitute(id)); }
  async findByIdVO(id: FulfillmentIdVO): Promise<FulfillmentEntity | null> {
    const row = await this.prisma.logisticsFulfillment.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? FulfillmentPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { orderId: orderId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findByVendorId(vendorId: VendorIdVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { vendorId: vendorId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findByWarehouseId(warehouseId: WarehouseIdVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { warehouseId: warehouseId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findByStatus(status: FulfillmentStatusVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { status: status.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findByPriority(priority: FulfillmentPriorityVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { priority: priority.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findReadyToShip(): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({ where: { status: 'ready_to_ship', deletedAt: null }, orderBy: { priority: 'asc' } });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findPendingByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({
      where: { warehouseId: warehouseId.value, status: { in: ['pending', 'processing'] }, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findSlaBreached(): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.logisticsFulfillment.findMany({
      where: { slaDueAt: { lt: new Date() }, status: { notIn: ['fulfilled', 'cancelled'] }, deletedAt: null },
      orderBy: { slaDueAt: 'asc' },
    });
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: FulfillmentListOptions): Promise<FulfillmentPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.priority) where['priority'] = f.priority;
    if (f.assignedTo) where['assignedTo'] = f.assignedTo;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsFulfillment.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsFulfillment.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => FulfillmentPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsFulfillment.count({ where: { id } })) > 0;
  }
  async save(entity: FulfillmentEntity): Promise<FulfillmentEntity> {
    const data = FulfillmentPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsFulfillment.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsFulfillment.update({ where: { id: entity.id }, data: data as never });
      return FulfillmentPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsFulfillment.create({ data: data as never });
    return FulfillmentPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsFulfillment.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsFulfillment.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

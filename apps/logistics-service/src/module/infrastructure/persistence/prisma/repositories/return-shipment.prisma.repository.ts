import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  ReturnShipmentRepository, ReturnShipmentListOptions, ReturnShipmentPaginationResult,
} from '../../../../domain/repositories/return-shipment.repository.interface.js';
import { ReturnShipmentEntity } from '../../../../domain/entities/return-shipment.entity.js';
import { ReturnShipmentIdVO } from '../../../../domain/value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '../../../../domain/value-objects/primitives/rma-number.vo.js';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo.js';
import { ReturnShipmentStatusVO } from '../../../../domain/value-objects/primitives/return-shipment-status.vo.js';
import { ReturnShipmentPrismaMapper } from '../return-shipment.prisma.mapper.js';

@Injectable()
export class ReturnShipmentPrismaRepository implements ReturnShipmentRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<ReturnShipmentEntity | null> { return this.findByIdVO(ReturnShipmentIdVO.reconstitute(id)); }
  async findByIdVO(id: ReturnShipmentIdVO): Promise<ReturnShipmentEntity | null> {
    const row = await this.prisma.logisticsReturnShipment.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? ReturnShipmentPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findByRma(rmaNumber: RmaNumberVO): Promise<ReturnShipmentEntity | null> {
    const row = await this.prisma.logisticsReturnShipment.findFirst({ where: { rmaNumber: rmaNumber.value, deletedAt: null } });
    return row ? ReturnShipmentPrismaMapper.toDomain(row as never) : null;
  }
  async findByOrderId(orderId: OrderIdVO): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { orderId: orderId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findByUserId(userId: UserIdVO): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { userId: userId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findByOriginalShipment(shipmentId: ShipmentIdVO): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { originalShipmentId: shipmentId.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findByStatus(status: ReturnShipmentStatusVO): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { status: status.value, deletedAt: null }, orderBy: { createdAt: 'desc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findPendingApproval(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { status: 'requested', deletedAt: null }, orderBy: { createdAt: 'asc' } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findAwaitingPickup(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { status: { in: ['approved', 'pickup_scheduled'] }, deletedAt: null } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findAwaitingInspection(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = await this.prisma.logisticsReturnShipment.findMany({ where: { status: 'received', deletedAt: null } });
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: ReturnShipmentListOptions): Promise<ReturnShipmentPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.originalShipmentId) where['originalShipmentId'] = f.originalShipmentId;
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.reason) where['reason'] = f.reason;
    if (f.fromDate || f.toDate) where['createdAt'] = { ...(f.fromDate ? { gte: new Date(f.fromDate) } : {}), ...(f.toDate ? { lte: new Date(f.toDate) } : {}) };
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsReturnShipment.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsReturnShipment.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByRma(rmaNumber: RmaNumberVO): Promise<boolean> {
    return (await this.prisma.logisticsReturnShipment.count({ where: { rmaNumber: rmaNumber.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsReturnShipment.count({ where: { id } })) > 0;
  }
  async save(entity: ReturnShipmentEntity): Promise<ReturnShipmentEntity> {
    const data = ReturnShipmentPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsReturnShipment.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsReturnShipment.update({ where: { id: entity.id }, data: data as never });
      return ReturnShipmentPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsReturnShipment.create({ data: data as never });
    return ReturnShipmentPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsReturnShipment.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsReturnShipment.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

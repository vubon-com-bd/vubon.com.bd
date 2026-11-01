/**
 * ShipmentPrismaRepository — implements ShipmentRepository
 * @module logistics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  ShipmentRepository,
  ShipmentListOptions,
  ShipmentPaginationResult,
  ShipmentStats,
} from '@domain/repositories/shipment.repository.interface';
import type { ShipmentEntity } from '@domain/entities/shipment.entity';
import type { ShipmentIdVO } from '@domain/value-objects/primitives/shipment-id.vo';
import type { IdempotencyKeyVO } from '@domain/value-objects/primitives/idempotency-key.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import {
  ShipmentPrismaMapper,
  type LogisticsShipmentRow,
} from '../mappers/shipment.prisma.mapper.js';

// ⚠️ camelCase delegate (Prisma generates from PascalCase model)
const MODEL = 'logisticsShipment';

interface PrismaDelegate {
  findFirst: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args: unknown) => Promise<unknown[]>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
  count: (args?: unknown) => Promise<number>;
}

@Injectable()
export class ShipmentPrismaRepository implements ShipmentRepository {
  private readonly logger = new Logger(ShipmentPrismaRepository.name);

  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  // ═══ Base ═══
  async findById(id: string): Promise<ShipmentEntity | null> {
    return this.findByIdVO({ value: id } as ShipmentIdVO);
  }

  async findAll(): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async save(entity: ShipmentEntity): Promise<ShipmentEntity> {
    const data = ShipmentPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    })) as { id: string } | null;

    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      })) as LogisticsShipmentRow;
      return ShipmentPrismaMapper.toDomain(updated);
    }

    const created = (await this.delegate.create({ data: data as never })) as LogisticsShipmentRow;
    return ShipmentPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  // ═══ Specialized Finders ═══
  async findByIdVO(id: ShipmentIdVO): Promise<ShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsShipmentRow | null;
    return raw ? ShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findByIdempotencyKey(key: IdempotencyKeyVO): Promise<ShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { idempotencyKey: key.value, deletedAt: null },
    })) as LogisticsShipmentRow | null;
    return raw ? ShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findByShipmentNumber(shipmentNumber: string): Promise<ShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { shipmentNumber, deletedAt: null },
    })) as LogisticsShipmentRow | null;
    return raw ? ShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findByTrackingNumber(trackingNumber: string): Promise<ShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { trackingNumber, deletedAt: null },
    })) as LogisticsShipmentRow | null;
    return raw ? ShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findByOrderId(orderId: string): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findByCourierId(courierId: string): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { courierId, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findByWarehouseId(warehouseId: string): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { warehouseId, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: string): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { userId, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  // ═══ Pagination ═══
  async findPaginated(options: ShipmentListOptions): Promise<ShipmentPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: orderBy as never,
        skip: (options.page - 1) * options.limit,
        take: options.limit,
      }) as Promise<LogisticsShipmentRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => ShipmentPrismaMapper.toDomain(r)),
      total,
      page: options.page,
      limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  // ═══ Stats ═══
  async getStats(warehouseId?: string, fromDate?: string, toDate?: string): Promise<ShipmentStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (warehouseId) where['warehouseId'] = warehouseId;
    if (fromDate || toDate) {
      where['createdAt'] = {};
      if (fromDate) (where['createdAt'] as Record<string, unknown>)['gte'] = new Date(fromDate);
      if (toDate) (where['createdAt'] as Record<string, unknown>)['lte'] = new Date(toDate);
    }

    const rows = (await this.delegate.findMany({
      where: where as never,
      select: {
        status: true, type: true, priority: true,
        shippingCost: true, codAmount: true, actualWeightKg: true, itemCount: true, currency: true,
      },
    })) as Array<{
      status: string; type: string; priority: string;
      shippingCost: unknown; codAmount: unknown; actualWeightKg: unknown; itemCount: number; currency: string;
    }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    let totalRevenue = 0;
    let totalCOD = 0;
    let totalWeight = 0;
    let weightCount = 0;
    let totalItems = 0;
    let currency = 'BDT';

    const toNum = (v: unknown): number => {
      if (v === null || v === undefined) return 0;
      if (typeof v === 'number') return v;
      if (typeof v === 'string') return Number(v);
      if (typeof v === 'object' && v !== null && 'toNumber' in v) {
        return (v as { toNumber: () => number }).toNumber();
      }
      return Number(v);
    };

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byPriority[r.priority] = (byPriority[r.priority] ?? 0) + 1;
      totalRevenue += toNum(r.shippingCost);
      totalCOD += toNum(r.codAmount);
      totalItems += r.itemCount;
      const w = toNum(r.actualWeightKg);
      if (w > 0) {
        totalWeight += w;
        weightCount += 1;
      }
      if (r.currency) currency = r.currency;
    }

    return {
      total: rows.length,
      totalRevenue,
      totalCOD,
      currency,
      byStatus,
      byType,
      byPriority,
      averageWeightKg: weightCount > 0 ? totalWeight / weightCount : 0,
      averageItemCount: rows.length > 0 ? totalItems / rows.length : 0,
    };
  }

  // ═══ Cron-Support Queries ═══
  async findStale(olderThanMinutes: number): Promise<readonly ShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: {
        updatedAt: { lt: cutoff },
        status: { notIn: ['delivered', 'returned', 'cancelled'] },
        deletedAt: null,
      },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findPendingOlderThan(olderThanMinutes: number): Promise<readonly ShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { status: 'pending', createdAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findInTransit(): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'in_transit', deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findDelayed(): Promise<readonly ShipmentEntity[]> {
    const now = new Date();
    const rows = (await this.delegate.findMany({
      where: {
        estimatedDeliveryAt: { lt: now },
        status: { notIn: ['delivered', 'returned', 'cancelled'] },
        deletedAt: null,
      },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  async findRetryable(_maxAttempts: number): Promise<readonly ShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'failed', deletedAt: null },
    })) as LogisticsShipmentRow[];
    return rows.map((r) => ShipmentPrismaMapper.toDomain(r));
  }

  // ═══ Soft Delete ═══
  async softDelete(id: string, deletedBy?: string): Promise<void> {
    void deletedBy;
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }

  // ═══ Existence Checks ═══
  async existsByShipmentNumber(shipmentNumber: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { shipmentNumber } });
    return count > 0;
  }

  async existsByTrackingNumber(trackingNumber: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { trackingNumber } });
    return count > 0;
  }

  // ═══ Helpers ═══
  private buildWhere(options: ShipmentListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.priority) where['priority'] = f.priority;
    if (f.orderId) where['orderId'] = f.orderId;
    if (f.userId) where['userId'] = f.userId;
    if (f.vendorId) where['vendorId'] = f.vendorId;
    if (f.warehouseId) where['warehouseId'] = f.warehouseId;
    if (f.courierId) where['courierId'] = f.courierId;
    if (f.isCOD !== undefined) where['isCOD'] = f.isCOD;
    if (f.isInsured !== undefined) where['isInsured'] = f.isInsured;
    if (f.search) {
      where['OR'] = [
        { trackingNumber: { contains: f.search, mode: 'insensitive' } },
        { shipmentNumber: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}

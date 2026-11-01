/**
 * ReturnShipmentPrismaRepository — implements ReturnShipmentRepository
 */
import { Injectable } from '@nestjs/common';
import type {
  ReturnShipmentRepository,
  ReturnShipmentListOptions,
  ReturnShipmentPaginationResult,
  ReturnShipmentStats,
} from '@domain/repositories/return-shipment.repository.interface';
import type { ReturnShipmentEntity } from '@domain/entities/return-shipment.entity';
import type { ReturnShipmentIdVO } from '@domain/value-objects/primitives/return-shipment-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { ReturnShipmentPrismaMapper, type LogisticsReturnShipmentRow } from '../mappers/return-shipment.prisma.mapper.js';

const MODEL = 'logisticsReturnShipment';

interface PrismaDelegate {
  findFirst: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args: unknown) => Promise<unknown[]>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
  count: (args?: unknown) => Promise<number>;
}

const toNum = (v: unknown): number => {
  if (v === null || v === undefined) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') return Number(v);
  if (typeof v === 'object' && 'toNumber' in v) return (v as { toNumber: () => number }).toNumber();
  return Number(v);
};

@Injectable()
export class ReturnShipmentPrismaRepository implements ReturnShipmentRepository {
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  async findById(id: string): Promise<ReturnShipmentEntity | null> {
    return this.findByIdVO({ value: id } as ReturnShipmentIdVO);
  }

  async findByIdVO(id: ReturnShipmentIdVO): Promise<ReturnShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsReturnShipmentRow | null;
    return raw ? ReturnShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: 'desc' },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async save(entity: ReturnShipmentEntity): Promise<ReturnShipmentEntity> {
    const data = ReturnShipmentPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      })) as LogisticsReturnShipmentRow;
      return ReturnShipmentPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsReturnShipmentRow;
    return ReturnShipmentPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    return (await this.delegate.count({ where: { id } })) > 0;
  }

  async findByRmaNumber(rmaNumber: string): Promise<ReturnShipmentEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { rmaNumber, deletedAt: null },
    })) as LogisticsReturnShipmentRow | null;
    return raw ? ReturnShipmentPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async findByOrderId(orderId: string): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async findByUserId(userId: string): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { userId, deletedAt: null },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async findByOriginalShipmentId(shipmentId: string): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { originalShipmentId: shipmentId, deletedAt: null },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async findPaginated(options: ReturnShipmentListOptions): Promise<ReturnShipmentPaginationResult> {
    const page = options.page ?? 1;
    const limit = options.limit ?? 20;
    const filter = options.filter ?? {};

    const where: Record<string, unknown> = { deletedAt: null };
    if (filter.status) where['status'] = filter.status;
    if (filter.type) where['type'] = filter.type;
    if (filter.reason) where['reason'] = filter.reason;
    if (filter.orderId) where['orderId'] = filter.orderId;
    if (filter.originalShipmentId) where['originalShipmentId'] = filter.originalShipmentId;
    if (filter.userId) where['userId'] = filter.userId;
    if (filter.minAmount !== undefined) where['refundAmount'] = { gte: filter.minAmount };
    if (filter.maxAmount !== undefined) where['refundAmount'] = { lte: filter.maxAmount };
    if (filter.fromDate || filter.toDate) {
      const dateFilter: Record<string, Date> = {};
      if (filter.fromDate) dateFilter['gte'] = new Date(filter.fromDate);
      if (filter.toDate) dateFilter['lte'] = new Date(filter.toDate);
      where['createdAt'] = dateFilter;
    }
    if (filter.search) where['OR'] = [
      { rmaNumber: { contains: filter.search, mode: 'insensitive' } },
      { description: { contains: filter.search, mode: 'insensitive' } },
    ];

    const orderBy = { [options.sortBy ?? 'createdAt']: options.sortDir ?? 'desc' };

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: orderBy as never,
        skip: (page - 1) * limit,
        take: limit,
      }) as Promise<LogisticsReturnShipmentRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getStats(fromDate?: string, toDate?: string): Promise<ReturnShipmentStats> {
    const where: Record<string, unknown> = { deletedAt: null };
    if (fromDate || toDate) {
      const dateFilter: Record<string, Date> = {};
      if (fromDate) dateFilter['gte'] = new Date(fromDate);
      if (toDate) dateFilter['lte'] = new Date(toDate);
      where['createdAt'] = dateFilter;
    }

    const rows = (await this.delegate.findMany({
      where: where as never,
      select: { status: true, type: true, reason: true, refundAmount: true, refundCurrency: true },
    })) as Array<{
      status: string;
      type: string;
      reason: string;
      refundAmount: unknown;
      refundCurrency: string | null;
    }>;

    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byReason: Record<string, number> = {};
    let totalRefunded = 0;
    let currency = 'BDT';
    let refundCount = 0;

    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
      byReason[r.reason] = (byReason[r.reason] ?? 0) + 1;

      const amt = toNum(r.refundAmount);
      if (amt > 0) {
        totalRefunded += amt;
        refundCount += 1;
      }
      if (r.refundCurrency) currency = r.refundCurrency;
    }

    return {
      total: rows.length,
      byStatus,
      byType,
      byReason,
      totalRefunded,
      currency,
      averageRefund: refundCount > 0 ? totalRefunded / refundCount : 0,
    };
  }

  async findPendingApproval(): Promise<readonly ReturnShipmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'requested', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly ReturnShipmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { updatedAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsReturnShipmentRow[];
    return rows.map((r) => ReturnShipmentPrismaMapper.toDomain(r));
  }

  async existsByRmaNumber(rmaNumber: string): Promise<boolean> {
    return (await this.delegate.count({ where: { rmaNumber } })) > 0;
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    void deletedBy;
    await this.delegate.update({
      where: { id },
      data: { deletedAt: new Date() } as never,
    });
  }
}

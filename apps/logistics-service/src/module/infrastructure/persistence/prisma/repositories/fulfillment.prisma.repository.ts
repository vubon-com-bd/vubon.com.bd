import { Injectable, Logger } from '@nestjs/common';
import type { FulfillmentRepository, FulfillmentListOptions, FulfillmentPaginationResult, FulfillmentStats } from '@domain/repositories/fulfillment.repository.interface';
import type { FulfillmentEntity } from '@domain/entities/fulfillment.entity';
import type { FulfillmentIdVO } from '@domain/value-objects/primitives/fulfillment-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { FulfillmentPrismaMapper, type LogisticsFulfillmentRow } from '../mappers/fulfillment.prisma.mapper.js';

const MODEL = 'logisticsFulfillment';
interface PrismaDelegate {
  findFirst: (a: unknown) => Promise<unknown>;
  findUnique: (a: unknown) => Promise<unknown>;
  findMany: (a: unknown) => Promise<unknown[]>;
  create: (a: unknown) => Promise<unknown>;
  update: (a: unknown) => Promise<unknown>;
  delete: (a: unknown) => Promise<unknown>;
  count: (a?: unknown) => Promise<number>;
}

@Injectable()
export class FulfillmentPrismaRepository implements FulfillmentRepository {
  private readonly logger = new Logger(FulfillmentPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<FulfillmentEntity | null> { return this.findByIdVO({ value: id } as FulfillmentIdVO); }
  async findByIdVO(id: FulfillmentIdVO): Promise<FulfillmentEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsFulfillmentRow | null;
    return raw ? FulfillmentPrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async save(entity: FulfillmentEntity): Promise<FulfillmentEntity> {
    const data = FulfillmentPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsFulfillmentRow;
      return FulfillmentPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsFulfillmentRow;
    return FulfillmentPrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByOrderId(orderId: string): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { orderId, deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findByVendorId(vendorId: string): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { vendorId, deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findByWarehouseId(warehouseId: string): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { warehouseId, deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findByStatus(status: string): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findPending(): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status: 'pending', deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findSlaBreached(): Promise<readonly FulfillmentEntity[]> {
    const now = new Date();
    const rows = (await this.delegate.findMany({ where: { slaDueAt: { lt: now }, deletedAt: null } })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }
  async findPaginated(options: FulfillmentListOptions): Promise<FulfillmentPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['orderId']) where['orderId'] = filter['orderId'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsFulfillmentRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => FulfillmentPrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as FulfillmentPaginationResult;
  }
  async getStats(): Promise<FulfillmentStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true, priority: true } })) as Array<{ status: string; type: string; priority: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    const byPriority: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; byPriority[r.priority] = (byPriority[r.priority] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType, byPriority } as FulfillmentStats;
  }
  async findPendingByPriority(): Promise<readonly FulfillmentEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { priority: 'desc' },
    })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly FulfillmentEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { updatedAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsFulfillmentRow[];
    return rows.map((r) => FulfillmentPrismaMapper.toDomain(r));
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
}

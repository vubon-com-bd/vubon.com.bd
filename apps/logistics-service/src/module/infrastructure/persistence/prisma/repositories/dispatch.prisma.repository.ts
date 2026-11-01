import { Injectable, Logger } from '@nestjs/common';
import type { DispatchRepository, DispatchListOptions, DispatchPaginationResult, DispatchStats } from '@domain/repositories/dispatch.repository.interface';
import type { DispatchEntity } from '@domain/entities/dispatch.entity';
import type { DispatchIdVO } from '@domain/value-objects/primitives/dispatch-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { DispatchPrismaMapper, type LogisticsDispatchRow } from '../mappers/dispatch.prisma.mapper.js';

const MODEL = 'logisticsDispatch';
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
export class DispatchPrismaRepository implements DispatchRepository {
  private readonly logger = new Logger(DispatchPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<DispatchEntity | null> { return this.findByIdVO({ value: id } as DispatchIdVO); }
  async findByIdVO(id: DispatchIdVO): Promise<DispatchEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsDispatchRow | null;
    return raw ? DispatchPrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }
  async save(entity: DispatchEntity): Promise<DispatchEntity> {
    const data = DispatchPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsDispatchRow;
      return DispatchPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsDispatchRow;
    return DispatchPrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByDispatchNumber(dispatchNumber: string): Promise<DispatchEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { dispatchNumber, deletedAt: null } })) as LogisticsDispatchRow | null;
    return raw ? DispatchPrismaMapper.toDomain(raw) : null;
  }
  async findByStatus(status: string): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }
  async findByCourierId(courierId: string): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({ where: { courierId, deletedAt: null } })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }
  async findByDriverId(driverId: string): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({ where: { driverId, deletedAt: null } })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }
  async findPaginated(options: DispatchListOptions): Promise<DispatchPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsDispatchRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => DispatchPrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as DispatchPaginationResult;
  }
  async getStats(): Promise<DispatchStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as DispatchStats;
  }
  async findByVehicleId(vehicleId: string): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { vehicleId, deletedAt: null },
    })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }

  async findContainingShipment(shipmentId: string): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { shipmentIds: { has: shipmentId }, deletedAt: null },
    })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly DispatchEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { updatedAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }

  async findPending(): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
    })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }

  async findInTransit(): Promise<readonly DispatchEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'in_transit', deletedAt: null },
    })) as LogisticsDispatchRow[];
    return rows.map((r) => DispatchPrismaMapper.toDomain(r));
  }

  async existsByDispatchNumber(dispatchNumber: string): Promise<boolean> {
    return (await this.delegate.count({ where: { dispatchNumber } })) > 0;
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
}

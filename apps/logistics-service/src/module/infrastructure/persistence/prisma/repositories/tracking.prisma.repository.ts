/**
 * TrackingPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  TrackingRepository,
  TrackingListOptions,
  TrackingPaginationResult,
  TrackingStats,
} from '@domain/repositories/tracking.repository.interface';
import type { TrackingEntity } from '@domain/entities/tracking.entity';
import type { TrackingIdVO } from '@domain/value-objects/primitives/tracking-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { TrackingPrismaMapper, type LogisticsTrackingRow } from '../mappers/tracking.prisma.mapper.js';

const MODEL = 'logisticsTracking';

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
export class TrackingPrismaRepository implements TrackingRepository {
  private readonly logger = new Logger(TrackingPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  async findById(id: string): Promise<TrackingEntity | null> {
    return this.findByIdVO({ value: id } as TrackingIdVO);
  }

  async findByIdVO(id: TrackingIdVO): Promise<TrackingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsTrackingRow | null;
    return raw ? TrackingPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrackingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null }, orderBy: { createdAt: 'desc' },
    })) as LogisticsTrackingRow[];
    return rows.map((r) => TrackingPrismaMapper.toDomain(r));
  }

  async save(entity: TrackingEntity): Promise<TrackingEntity> {
    const data = TrackingPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id }, select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id }, data: data as never,
      })) as LogisticsTrackingRow;
      return TrackingPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsTrackingRow;
    return TrackingPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async findByTrackingNumber(trackingNumber: string): Promise<TrackingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { trackingNumber, deletedAt: null },
    })) as LogisticsTrackingRow | null;
    return raw ? TrackingPrismaMapper.toDomain(raw) : null;
  }

  async findByShipmentId(shipmentId: string): Promise<TrackingEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { shipmentId, deletedAt: null },
    })) as LogisticsTrackingRow | null;
    return raw ? TrackingPrismaMapper.toDomain(raw) : null;
  }

  async findByOrderId(orderId: string): Promise<readonly TrackingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    })) as LogisticsTrackingRow[];
    return rows.map((r) => TrackingPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly TrackingEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsTrackingRow[];
    return rows.map((r) => TrackingPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly TrackingEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { lastUpdatedAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsTrackingRow[];
    return rows.map((r) => TrackingPrismaMapper.toDomain(r));
  }

  async findExpired(): Promise<readonly TrackingEntity[]> {
    const now = new Date();
    const rows = (await this.delegate.findMany({
      where: { expiresAt: { lt: now }, deletedAt: null },
    })) as LogisticsTrackingRow[];
    return rows.map((r) => TrackingPrismaMapper.toDomain(r));
  }

  async existsByTrackingNumber(trackingNumber: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { trackingNumber } });
    return count > 0;
  }

  async findPaginated(options: TrackingListOptions): Promise<TrackingPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['shipmentId']) where['shipmentId'] = filter['shipmentId'];

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never,
        skip: (page - 1) * limit, take: limit,
      }) as Promise<LogisticsTrackingRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => TrackingPrismaMapper.toDomain(r)),
      total, page, limit, totalPages: Math.ceil(total / limit),
    } as TrackingPaginationResult;
  }

  async getStats(): Promise<TrackingStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, source: true },
    })) as Array<{ status: string; source: string }>;
    const byStatus: Record<string, number> = {};
    const bySource: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      bySource[r.source] = (bySource[r.source] ?? 0) + 1;
    }
    return { total: rows.length, byStatus, bySource } as TrackingStats;
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
}

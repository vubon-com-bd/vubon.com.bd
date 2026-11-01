/**
 * DeliveryPrismaRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  DeliveryRepository,
  DeliveryListOptions,
  DeliveryPaginationResult,
  DeliveryStats,
} from '@domain/repositories/delivery.repository.interface';
import type { DeliveryEntity } from '@domain/entities/delivery.entity';
import type { DeliveryIdVO } from '@domain/value-objects/primitives/delivery-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { DeliveryPrismaMapper, type LogisticsDeliveryRow } from '../mappers/delivery.prisma.mapper.js';

const MODEL = 'logisticsDelivery';

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
export class DeliveryPrismaRepository implements DeliveryRepository {
  private readonly logger = new Logger(DeliveryPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  async findById(id: string): Promise<DeliveryEntity | null> {
    return this.findByIdVO({ value: id } as DeliveryIdVO);
  }

  async findByIdVO(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsDeliveryRow | null;
    return raw ? DeliveryPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null }, orderBy: { createdAt: 'desc' },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data = DeliveryPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id }, select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id }, data: data as never,
      })) as LogisticsDeliveryRow;
      return DeliveryPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsDeliveryRow;
    return DeliveryPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async findByShipmentId(shipmentId: string): Promise<DeliveryEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { shipmentId, deletedAt: null },
    })) as LogisticsDeliveryRow | null;
    return raw ? DeliveryPrismaMapper.toDomain(raw) : null;
  }

  async findByOrderId(orderId: string): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { orderId, deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByDriverId(driverId: string): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { driverId, deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findByRouteId(routeId: string): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { routeId, deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findStale(olderThanMinutes: number): Promise<readonly DeliveryEntity[]> {
    const cutoff = new Date(Date.now() - olderThanMinutes * 60_000);
    const rows = (await this.delegate.findMany({
      where: { updatedAt: { lt: cutoff }, deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findInTransit(): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'in_transit', deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findScheduled(): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'scheduled', deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findFailedRetryable(): Promise<readonly DeliveryEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'failed', deletedAt: null },
    })) as LogisticsDeliveryRow[];
    return rows.map((r) => DeliveryPrismaMapper.toDomain(r));
  }

  async findPaginated(options: DeliveryListOptions): Promise<DeliveryPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['orderId']) where['orderId'] = filter['orderId'];
    if (filter['driverId']) where['driverId'] = filter['driverId'];

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never,
        skip: (page - 1) * limit, take: limit,
      }) as Promise<LogisticsDeliveryRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => DeliveryPrismaMapper.toDomain(r)),
      total, page, limit, totalPages: Math.ceil(total / limit),
    } as DeliveryPaginationResult;
  }

  async getStats(): Promise<DeliveryStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null },
      select: { status: true, type: true },
    })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
    }
    return { total: rows.length, byStatus, byType } as DeliveryStats;
  }

  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
}

/**
 * CourierPrismaRepository — implements CourierRepository
 */
import { Injectable, Logger } from '@nestjs/common';
import type {
  CourierRepository,
  CourierListOptions,
  CourierPaginationResult,
  CourierStats,
} from '@domain/repositories/courier.repository.interface';
import type { CourierEntity } from '@domain/entities/courier.entity';
import type { CourierIdVO } from '@domain/value-objects/primitives/courier-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { CourierPrismaMapper, type LogisticsCourierRow } from '../mappers/courier.prisma.mapper.js';

const MODEL = 'logisticsCourier';

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
export class CourierPrismaRepository implements CourierRepository {
  private readonly logger = new Logger(CourierPrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}

  private get delegate(): PrismaDelegate {
    return this.prisma.getModel<PrismaDelegate>(MODEL);
  }

  async findById(id: string): Promise<CourierEntity | null> {
    return this.findByIdVO({ value: id } as CourierIdVO);
  }

  async findByIdVO(id: CourierIdVO): Promise<CourierEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { id: id.value, deletedAt: null },
    })) as LogisticsCourierRow | null;
    return raw ? CourierPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null }, orderBy: { createdAt: 'desc' },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async save(entity: CourierEntity): Promise<CourierEntity> {
    const data = CourierPrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({
      where: { id: entity.id }, select: { id: true },
    })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({
        where: { id: entity.id }, data: data as never,
      })) as LogisticsCourierRow;
      return CourierPrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsCourierRow;
    return CourierPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async findByCode(code: string): Promise<CourierEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { code, deletedAt: null },
    })) as LogisticsCourierRow | null;
    return raw ? CourierPrismaMapper.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status, deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findDefault(): Promise<CourierEntity | null> {
    const raw = (await this.delegate.findFirst({
      where: { isDefault: true, deletedAt: null },
    })) as LogisticsCourierRow | null;
    return raw ? CourierPrismaMapper.toDomain(raw) : null;
  }

  async findByType(type: string): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { type, deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findOperational(): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { priority: 'desc' },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findSupportingCOD(): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { supportsCOD: true, status: 'active', deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findSupportingInsurance(): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { supportsInsurance: true, status: 'active', deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findSupportingInternational(): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { supportsInternational: true, status: 'active', deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findByZone(zone: string): Promise<readonly CourierEntity[]> {
    const rows = (await this.delegate.findMany({
      where: { coverageZones: { has: zone }, deletedAt: null },
    })) as LogisticsCourierRow[];
    return rows.map((r) => CourierPrismaMapper.toDomain(r));
  }

  async findPaginated(options: CourierListOptions): Promise<CourierPaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['type']) where['type'] = filter['type'];
    if (filter['search']) where['OR'] = [{ name: { contains: filter['search'], mode: 'insensitive' } }];

    const [rows, total] = await Promise.all([
      this.delegate.findMany({
        where: where as never,
        orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never,
        skip: (page - 1) * limit, take: limit,
      }) as Promise<LogisticsCourierRow[]>,
      this.delegate.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => CourierPrismaMapper.toDomain(r)),
      total, page, limit, totalPages: Math.ceil(total / limit),
    } as CourierPaginationResult;
  }

  async getStats(): Promise<CourierStats> {
    const rows = (await this.delegate.findMany({
      where: { deletedAt: null }, select: { status: true, type: true },
    })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) {
      byStatus[r.status] = (byStatus[r.status] ?? 0) + 1;
      byType[r.type] = (byType[r.type] ?? 0) + 1;
    }
    return { total: rows.length, byStatus, byType } as CourierStats;
  }

  async softDelete(id: string, deletedBy?: string): Promise<void> {
    void deletedBy;
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }

  async existsByCode(code: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { code } });
    return count > 0;
  }
}

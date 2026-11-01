import { Injectable, Logger } from '@nestjs/common';
import type { ZoneRepository, ZoneListOptions, ZonePaginationResult, ZoneStats } from '@domain/repositories/zone.repository.interface';
import type { ZoneEntity } from '@domain/entities/zone.entity';
import type { ZoneIdVO } from '@domain/value-objects/primitives/zone-id.vo';
import { LogisticsPrismaService } from '../prisma.service.js';
import { ZonePrismaMapper, type LogisticsZoneRow } from '../mappers/zone.prisma.mapper.js';

const MODEL = 'logisticsZone';
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
export class ZonePrismaRepository implements ZoneRepository {
  private readonly logger = new Logger(ZonePrismaRepository.name);
  constructor(private readonly prisma: LogisticsPrismaService) {}
  private get delegate(): PrismaDelegate { return this.prisma.getModel<PrismaDelegate>(MODEL); }

  async findById(id: string): Promise<ZoneEntity | null> { return this.findByIdVO({ value: id } as ZoneIdVO); }
  async findByIdVO(id: ZoneIdVO): Promise<ZoneEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { id: id.value, deletedAt: null } })) as LogisticsZoneRow | null;
    return raw ? ZonePrismaMapper.toDomain(raw) : null;
  }
  async findAll(): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, orderBy: { createdAt: 'desc' } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }
  async save(entity: ZoneEntity): Promise<ZoneEntity> {
    const data = ZonePrismaMapper.toPersistence(entity);
    const existing = (await this.delegate.findUnique({ where: { id: entity.id }, select: { id: true } })) as { id: string } | null;
    if (existing) {
      const updated = (await this.delegate.update({ where: { id: entity.id }, data: data as never })) as LogisticsZoneRow;
      return ZonePrismaMapper.toDomain(updated);
    }
    const created = (await this.delegate.create({ data: data as never })) as LogisticsZoneRow;
    return ZonePrismaMapper.toDomain(created);
  }
  async delete(id: string): Promise<void> { await this.delegate.delete({ where: { id } }); }
  async exists(id: string): Promise<boolean> { return (await this.delegate.count({ where: { id } })) > 0; }
  async findByCode(code: string): Promise<ZoneEntity | null> {
    const raw = (await this.delegate.findFirst({ where: { code, deletedAt: null } })) as LogisticsZoneRow | null;
    return raw ? ZonePrismaMapper.toDomain(raw) : null;
  }
  async findByParentId(parentId: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { parentId, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }
  async findActive(): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { isActive: true, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }
  async findByStatus(status: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { status, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }
  async findPaginated(options: ZoneListOptions): Promise<ZonePaginationResult> {
    const opts = options as unknown as Record<string, unknown>;
    const page = (opts['page'] as number) ?? 1;
    const limit = (opts['limit'] as number) ?? 20;
    const filter = (opts['filter'] as Record<string, unknown>) ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (filter['status']) where['status'] = filter['status'];
    if (filter['parentId']) where['parentId'] = filter['parentId'];
    const [rows, total] = await Promise.all([
      this.delegate.findMany({ where: where as never, orderBy: { [(opts['sortBy'] as string) ?? 'createdAt']: opts['sortDir'] ?? 'desc' } as never, skip: (page - 1) * limit, take: limit }) as Promise<LogisticsZoneRow[]>,
      this.delegate.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => ZonePrismaMapper.toDomain(r)), total, page, limit, totalPages: Math.ceil(total / limit) } as ZonePaginationResult;
  }
  async getStats(): Promise<ZoneStats> {
    const rows = (await this.delegate.findMany({ where: { deletedAt: null }, select: { status: true, type: true } })) as Array<{ status: string; type: string }>;
    const byStatus: Record<string, number> = {};
    const byType: Record<string, number> = {};
    for (const r of rows) { byStatus[r.status] = (byStatus[r.status] ?? 0) + 1; byType[r.type] = (byType[r.type] ?? 0) + 1; }
    return { total: rows.length, byStatus, byType } as ZoneStats;
  }
  async softDelete(id: string): Promise<void> {
    await this.delegate.update({ where: { id }, data: { deletedAt: new Date() } as never });
  }
  async findByType(type: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { type, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }

  async findByPostalCode(postalCode: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { postalCodes: { has: postalCode }, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }

  async findByDistrict(district: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { districts: { has: district }, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }

  async findByDivision(division: string): Promise<readonly ZoneEntity[]> {
    const rows = (await this.delegate.findMany({ where: { divisions: { has: division }, deletedAt: null } })) as LogisticsZoneRow[];
    return rows.map((r) => ZonePrismaMapper.toDomain(r));
  }

  async existsByCode(code: string): Promise<boolean> { return (await this.delegate.count({ where: { code } })) > 0; }
}

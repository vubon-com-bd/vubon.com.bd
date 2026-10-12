import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  ZoneRepository, ZoneListOptions, ZonePaginationResult,
} from '../../../../domain/repositories/zone.repository.interface.js';
import { ZoneEntity } from '../../../../domain/entities/zone.entity.js';
import { ZoneIdVO } from '../../../../domain/value-objects/primitives/zone-id.vo.js';
import { ZoneStatusVO } from '../../../../domain/value-objects/primitives/zone-status.vo.js';
import { ZoneTypeVO } from '../../../../domain/value-objects/primitives/zone-type.vo.js';
import { ZonePrismaMapper } from '../zone.prisma.mapper.js';

@Injectable()
export class ZonePrismaRepository implements ZoneRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<ZoneEntity | null> { return this.findByIdVO(ZoneIdVO.reconstitute(id)); }
  async findByIdVO(id: ZoneIdVO): Promise<ZoneEntity | null> {
    const row = await this.prisma.logisticsZone.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? ZonePrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { deletedAt: null }, orderBy: { name: 'asc' } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findByCode(code: string): Promise<ZoneEntity | null> {
    const row = await this.prisma.logisticsZone.findFirst({ where: { code, deletedAt: null } });
    return row ? ZonePrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: ZoneStatusVO): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findByType(type: ZoneTypeVO): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findActive(): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { status: 'active', isActive: true, deletedAt: null } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findByParent(parentId: ZoneIdVO): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { parentId: parentId.value, deletedAt: null } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findByPostalCode(code: string): Promise<ZoneEntity | null> {
    const row = await this.prisma.logisticsZone.findFirst({ where: { postalCodes: { has: code }, status: 'active', deletedAt: null } });
    return row ? ZonePrismaMapper.toDomain(row as never) : null;
  }
  async findByDistrict(district: string): Promise<ZoneEntity | null> {
    const row = await this.prisma.logisticsZone.findFirst({ where: { districts: { has: district }, status: 'active', deletedAt: null } });
    return row ? ZonePrismaMapper.toDomain(row as never) : null;
  }
  async findByDivision(division: string): Promise<readonly ZoneEntity[]> {
    const rows = await this.prisma.logisticsZone.findMany({ where: { divisions: { has: division }, status: 'active', deletedAt: null } });
    return rows.map((r) => ZonePrismaMapper.toDomain(r as never));
  }
  async findForAddress(input: { postalCode?: string; district?: string; division?: string }): Promise<ZoneEntity | null> {
    if (input.postalCode) { const z = await this.findByPostalCode(input.postalCode); if (z) return z; }
    if (input.district) { const z = await this.findByDistrict(input.district); if (z) return z; }
    if (input.division) { const z = await this.prisma.logisticsZone.findFirst({ where: { divisions: { has: input.division }, status: 'active', deletedAt: null } }); if (z) return ZonePrismaMapper.toDomain(z as never); }
    return null;
  }
  async findPaginated(options: ZoneListOptions): Promise<ZonePaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.parentId) where['parentId'] = f.parentId;
    if (f.isRemote !== undefined) where['isRemote'] = f.isRemote;
    if (f.search) where['OR'] = [{ name: { contains: f.search, mode: 'insensitive' } }, { code: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'name']: options.sortDir ?? 'asc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsZone.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsZone.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => ZonePrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByCode(code: string): Promise<boolean> {
    return (await this.prisma.logisticsZone.count({ where: { code } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsZone.count({ where: { id } })) > 0;
  }
  async save(entity: ZoneEntity): Promise<ZoneEntity> {
    const data = ZonePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsZone.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsZone.update({ where: { id: entity.id }, data: data as never });
      return ZonePrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsZone.create({ data: data as never });
    return ZonePrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsZone.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsZone.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

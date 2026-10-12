import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  PackagingRepository, PackagingListOptions, PackagingPaginationResult,
} from '../../../../domain/repositories/packaging.repository.interface.js';
import { PackagingEntity } from '../../../../domain/entities/packaging.entity.js';
import { PackagingIdVO } from '../../../../domain/value-objects/primitives/packaging-id.vo.js';
import { PackagingStatusVO } from '../../../../domain/value-objects/primitives/packaging-status.vo.js';
import { PackagingTypeVO } from '../../../../domain/value-objects/primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../../../../domain/value-objects/primitives/packaging-material.vo.js';
import { PackagingPrismaMapper } from '../packaging.prisma.mapper.js';

@Injectable()
export class PackagingPrismaRepository implements PackagingRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<PackagingEntity | null> { return this.findByIdVO(PackagingIdVO.reconstitute(id)); }
  async findByIdVO(id: PackagingIdVO): Promise<PackagingEntity | null> {
    const row = await this.prisma.logisticsPackaging.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? PackagingPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { deletedAt: null }, orderBy: { name: 'asc' } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findByCode(code: string): Promise<PackagingEntity | null> {
    const row = await this.prisma.logisticsPackaging.findFirst({ where: { code, deletedAt: null } });
    return row ? PackagingPrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: PackagingStatusVO): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findByType(type: PackagingTypeVO): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { type: type.value, deletedAt: null } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findByMaterial(material: PackagingMaterialVO): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { material: material.value, deletedAt: null } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findInStock(): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { status: 'active', stock: { gt: 0 }, deletedAt: null } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findDefault(): Promise<PackagingEntity | null> {
    const row = await this.prisma.logisticsPackaging.findFirst({ where: { isDefault: true, deletedAt: null } });
    return row ? PackagingPrismaMapper.toDomain(row as never) : null;
  }
  async findCapableOf(weightKg: number, dims?: { lengthCm: number; widthCm: number; heightCm: number }): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { status: 'active', stock: { gt: 0 }, deletedAt: null } });
    return rows
      .filter((r) => Number(r.maxWeightKg) >= weightKg &&
        (!dims || (Number(r.lengthCm) >= dims.lengthCm && Number(r.widthCm) >= dims.widthCm && Number(r.heightCm) >= dims.heightCm)))
      .map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findLowStock(threshold: number): Promise<readonly PackagingEntity[]> {
    const rows = await this.prisma.logisticsPackaging.findMany({ where: { stock: { lte: threshold }, deletedAt: null } });
    return rows.map((r) => PackagingPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: PackagingListOptions): Promise<PackagingPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.material) where['material'] = f.material;
    if (f.isFragile !== undefined) where['isFragile'] = f.isFragile;
    if (f.inStock !== undefined) where['stock'] = f.inStock ? { gt: 0 } : 0;
    if (f.search) where['OR'] = [{ name: { contains: f.search, mode: 'insensitive' } }, { code: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'name']: options.sortDir ?? 'asc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsPackaging.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsPackaging.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => PackagingPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByCode(code: string): Promise<boolean> {
    return (await this.prisma.logisticsPackaging.count({ where: { code } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsPackaging.count({ where: { id } })) > 0;
  }
  async save(entity: PackagingEntity): Promise<PackagingEntity> {
    const data = PackagingPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsPackaging.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsPackaging.update({ where: { id: entity.id }, data: data as never });
      return PackagingPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsPackaging.create({ data: data as never });
    return PackagingPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsPackaging.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsPackaging.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}

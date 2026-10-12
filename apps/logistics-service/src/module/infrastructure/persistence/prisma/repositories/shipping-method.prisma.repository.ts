import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  ShippingMethodRepository, ShippingMethodListOptions, ShippingMethodPaginationResult,
} from '../../../../domain/repositories/shipping-method.repository.interface.js';
import { ShippingMethodEntity } from '../../../../domain/entities/shipping-method.entity.js';
import { ShippingMethodIdVO } from '../../../../domain/value-objects/primitives/shipping-method-id.vo.js';
import { ShippingMethodValueVO } from '../../../../domain/value-objects/primitives/shipping-method-value.vo.js';
import { ShippingMethodStatusVO } from '../../../../domain/value-objects/primitives/shipping-method-status.vo.js';
import { ShippingMethodPrismaMapper } from '../shipping-method.prisma.mapper.js';

@Injectable()
export class ShippingMethodPrismaRepository implements ShippingMethodRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findById(id: string): Promise<ShippingMethodEntity | null> { return this.findByIdVO(ShippingMethodIdVO.reconstitute(id)); }
  async findByIdVO(id: ShippingMethodIdVO): Promise<ShippingMethodEntity | null> {
    const row = await this.prisma.logisticsShippingMethod.findFirst({ where: { id: id.value, deletedAt: null } });
    return row ? ShippingMethodPrismaMapper.toDomain(row as never) : null;
  }
  async findAll(): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.logisticsShippingMethod.findMany({ where: { deletedAt: null }, orderBy: { name: 'asc' } });
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r as never));
  }
  async findByCode(code: ShippingMethodValueVO): Promise<ShippingMethodEntity | null> {
    const row = await this.prisma.logisticsShippingMethod.findFirst({ where: { code: code.value, deletedAt: null } });
    return row ? ShippingMethodPrismaMapper.toDomain(row as never) : null;
  }
  async findByStatus(status: ShippingMethodStatusVO): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.logisticsShippingMethod.findMany({ where: { status: status.value, deletedAt: null } });
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r as never));
  }
  async findSelectable(): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.logisticsShippingMethod.findMany({ where: { status: { in: ['active', 'seasonal'] }, isActive: true, deletedAt: null } });
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r as never));
  }
  async findByZone(zoneId: string): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.logisticsShippingMethod.findMany({ where: { coverageZones: { has: zoneId }, isActive: true, deletedAt: null } });
    return rows.map((r) => ShippingMethodPrismaMapper.toDomain(r as never));
  }
  async findDefault(): Promise<ShippingMethodEntity | null> {
    const row = await this.prisma.logisticsShippingMethod.findFirst({ where: { isDefault: true, deletedAt: null } });
    return row ? ShippingMethodPrismaMapper.toDomain(row as never) : null;
  }
  async findEligibleFor(zoneId: string, weightKg: number): Promise<readonly ShippingMethodEntity[]> {
    const rows = await this.prisma.logisticsShippingMethod.findMany({ where: { status: { in: ['active', 'seasonal'] }, isActive: true, deletedAt: null } });
    return rows
      .filter((r) => (r.coverageZones.length === 0 || r.coverageZones.includes(zoneId)) && (r.maxWeightKg === null || Number(r.maxWeightKg) >= weightKg))
      .map((r) => ShippingMethodPrismaMapper.toDomain(r as never));
  }
  async findPaginated(options: ShippingMethodListOptions): Promise<ShippingMethodPaginationResult> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.code) where['code'] = f.code;
    if (f.zoneId) where['coverageZones'] = { has: f.zoneId };
    if (f.codEnabled !== undefined) where['codEnabled'] = f.codEnabled;
    if (f.search) where['OR'] = [{ name: { contains: f.search, mode: 'insensitive' } }, { displayName: { contains: f.search, mode: 'insensitive' } }];
    const orderBy = { [options.sortBy ?? 'name']: options.sortDir ?? 'asc' } as Record<string, 'asc' | 'desc'>;
    const [rows, total] = await Promise.all([
      this.prisma.logisticsShippingMethod.findMany({ where: where as never, orderBy, skip: (options.page - 1) * options.limit, take: options.limit }),
      this.prisma.logisticsShippingMethod.count({ where: where as never }),
    ]);
    return { items: rows.map((r) => ShippingMethodPrismaMapper.toDomain(r as never)), total, page: options.page, limit: options.limit, totalPages: Math.ceil(total / options.limit) };
  }
  async existsByCode(code: ShippingMethodValueVO): Promise<boolean> {
    return (await this.prisma.logisticsShippingMethod.count({ where: { code: code.value } })) > 0;
  }
  async exists(id: string): Promise<boolean> {
    return (await this.prisma.logisticsShippingMethod.count({ where: { id } })) > 0;
  }
  async save(entity: ShippingMethodEntity): Promise<ShippingMethodEntity> {
    const data = ShippingMethodPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsShippingMethod.findUnique({ where: { id: entity.id }, select: { id: true } });
    if (existing) {
      const updated = await this.prisma.logisticsShippingMethod.update({ where: { id: entity.id }, data: data as never });
      return ShippingMethodPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsShippingMethod.create({ data: data as never });
    return ShippingMethodPrismaMapper.toDomain(created as never);
  }
  async delete(id: string): Promise<void> { await this.prisma.logisticsShippingMethod.delete({ where: { id } }); }
  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsShippingMethod.update({ where: { id }, data: { deletedAt: new Date() } });
  }
  async clearDefaultExcept(methodId: string): Promise<void> {
    await this.prisma.logisticsShippingMethod.updateMany({
      where: { isDefault: true, id: { not: methodId } },
      data: { isDefault: false },
    });
  }
}

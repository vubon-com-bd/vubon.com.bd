/**
 * WarehousePrismaRepository — implements WarehouseRepository
 * @module logistics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  WarehouseRepository,
  WarehouseListOptions,
  WarehousePaginationResult,
} from '../../../../domain/repositories/warehouse.repository.interface.js';
import { WarehouseEntity } from '../../../../domain/entities/warehouse.entity.js';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo.js';
import { WarehouseCodeVO } from '../../../../domain/value-objects/primitives/warehouse-code.vo.js';
import { WarehouseStatusVO } from '../../../../domain/value-objects/primitives/warehouse-status.vo.js';
import { WarehouseTypeVO } from '../../../../domain/value-objects/primitives/warehouse-type.vo.js';
import { WarehousePrismaMapper } from '../warehouse.prisma.mapper.js';

@Injectable()
export class WarehousePrismaRepository implements WarehouseRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<WarehouseEntity | null> {
    return this.findByIdVO(WarehouseIdVO.reconstitute(id));
  }

  async findByIdVO(id: WarehouseIdVO): Promise<WarehouseEntity | null> {
    const row = await this.prisma.logisticsWarehouse.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? WarehousePrismaMapper.toDomain(row as never) : null;
  }

  async findAll(): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: { deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findByCode(code: WarehouseCodeVO): Promise<WarehouseEntity | null> {
    const row = await this.prisma.logisticsWarehouse.findFirst({
      where: { code: code.value, deletedAt: null },
    });
    return row ? WarehousePrismaMapper.toDomain(row as never) : null;
  }

  async findByStatus(status: WarehouseStatusVO): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findByType(type: WarehouseTypeVO): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findByZone(zone: string): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: { zone, deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findAcceptingInbound(): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { name: 'asc' },
    });
    return rows.map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findWithCapacity(volumeM3: number, weightKg: number): Promise<readonly WarehouseEntity[]> {
    // Raw SQL for capacity comparison (Prisma can't compare two columns in same model easily)
    const rows = await this.prisma.logisticsWarehouse.findMany({
      where: {
        status: 'active',
        deletedAt: null,
      },
    });
    return rows
      .filter((r) => {
        const capM3 = Number(r.capacityM3) - Number(r.usedM3);
        const capKg = Number(r.capacityKg) - Number(r.usedKg);
        return capM3 >= volumeM3 && capKg >= weightKg;
      })
      .map((r) => WarehousePrismaMapper.toDomain(r as never));
  }

  async findDefault(): Promise<WarehouseEntity | null> {
    const row = await this.prisma.logisticsWarehouse.findFirst({
      where: { isDefault: true, deletedAt: null },
    });
    return row ? WarehousePrismaMapper.toDomain(row as never) : null;
  }

  async findPaginated(options: WarehouseListOptions): Promise<WarehousePaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'name']: options.sortDir ?? 'asc' } as Record<string, 'asc' | 'desc'>;

    const [rows, total] = await Promise.all([
      this.prisma.logisticsWarehouse.findMany({
        where: where as never, orderBy,
        skip: (options.page - 1) * options.limit, take: options.limit,
      }),
      this.prisma.logisticsWarehouse.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => WarehousePrismaMapper.toDomain(r as never)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async existsByCode(code: WarehouseCodeVO): Promise<boolean> {
    const count = await this.prisma.logisticsWarehouse.count({ where: { code: code.value } });
    return count > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.logisticsWarehouse.count({ where: { id } });
    return count > 0;
  }

  async save(entity: WarehouseEntity): Promise<WarehouseEntity> {
    const data = WarehousePrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsWarehouse.findUnique({
      where: { id: entity.id }, select: { id: true },
    });
    if (existing) {
      const updated = await this.prisma.logisticsWarehouse.update({
        where: { id: entity.id }, data: data as never,
      });
      return WarehousePrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsWarehouse.create({ data: data as never });
    return WarehousePrismaMapper.toDomain(created as never);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.logisticsWarehouse.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsWarehouse.update({
      where: { id }, data: { deletedAt: new Date() },
    });
  }

  private buildWhere(options: WarehouseListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.zone) where['zone'] = f.zone;
    if (f.search) {
      where['OR'] = [
        { name: { contains: f.search, mode: 'insensitive' } },
        { code: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}

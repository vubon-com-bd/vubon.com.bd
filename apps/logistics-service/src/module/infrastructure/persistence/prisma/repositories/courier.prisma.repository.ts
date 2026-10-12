/**
 * CourierPrismaRepository — implements CourierRepository
 * @module logistics-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import type {
  CourierRepository,
  CourierListOptions,
  CourierPaginationResult,
} from '../../../../domain/repositories/courier.repository.interface.js';
import { CourierEntity } from '../../../../domain/entities/courier.entity.js';
import { CourierIdVO } from '../../../../domain/value-objects/primitives/courier-id.vo.js';
import { CourierStatusVO } from '../../../../domain/value-objects/primitives/courier-status.vo.js';
import { CourierTypeVO } from '../../../../domain/value-objects/primitives/courier-type.vo.js';
import { CourierNameVO } from '../../../../domain/value-objects/primitives/courier-name.vo.js';
import { CourierPrismaMapper } from '../courier.prisma.mapper.js';

@Injectable()
export class CourierPrismaRepository implements CourierRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<CourierEntity | null> {
    return this.findByIdVO(CourierIdVO.reconstitute(id));
  }

  async findByIdVO(id: CourierIdVO): Promise<CourierEntity | null> {
    const row = await this.prisma.logisticsCourier.findFirst({
      where: { id: id.value, deletedAt: null },
    });
    return row ? CourierPrismaMapper.toDomain(row as never) : null;
  }

  async findAll(): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.logisticsCourier.findMany({
      where: { deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => CourierPrismaMapper.toDomain(r as never));
  }

  async findByCode(code: CourierNameVO): Promise<CourierEntity | null> {
    const row = await this.prisma.logisticsCourier.findFirst({
      where: { code: code.value, deletedAt: null },
    });
    return row ? CourierPrismaMapper.toDomain(row as never) : null;
  }

  async findByStatus(status: CourierStatusVO): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.logisticsCourier.findMany({
      where: { status: status.value, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => CourierPrismaMapper.toDomain(r as never));
  }

  async findByType(type: CourierTypeVO): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.logisticsCourier.findMany({
      where: { type: type.value, deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => CourierPrismaMapper.toDomain(r as never));
  }

  async findOperational(): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.logisticsCourier.findMany({
      where: { status: 'active', deletedAt: null },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => CourierPrismaMapper.toDomain(r as never));
  }

  async findDefault(): Promise<CourierEntity | null> {
    const row = await this.prisma.logisticsCourier.findFirst({
      where: { isDefault: true, deletedAt: null },
    });
    return row ? CourierPrismaMapper.toDomain(row as never) : null;
  }

  async findCoveringZone(zone: string): Promise<readonly CourierEntity[]> {
    const rows = await this.prisma.logisticsCourier.findMany({
      where: {
        status: 'active',
        deletedAt: null,
        coverageZones: { has: zone },
      },
      orderBy: { priority: 'asc' },
    });
    return rows.map((r) => CourierPrismaMapper.toDomain(r as never));
  }

  async findPaginated(options: CourierListOptions): Promise<CourierPaginationResult> {
    const where = this.buildWhere(options);
    const orderBy = { [options.sortBy ?? 'priority']: options.sortDir ?? 'asc' } as Record<string, 'asc' | 'desc'>;

    const [rows, total] = await Promise.all([
      this.prisma.logisticsCourier.findMany({
        where: where as never, orderBy,
        skip: (options.page - 1) * options.limit, take: options.limit,
      }),
      this.prisma.logisticsCourier.count({ where: where as never }),
    ]);

    return {
      items: rows.map((r) => CourierPrismaMapper.toDomain(r as never)),
      total, page: options.page, limit: options.limit,
      totalPages: Math.ceil(total / options.limit),
    };
  }

  async existsByCode(code: CourierNameVO): Promise<boolean> {
    const count = await this.prisma.logisticsCourier.count({ where: { code: code.value } });
    return count > 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.logisticsCourier.count({ where: { id } });
    return count > 0;
  }

  async save(entity: CourierEntity): Promise<CourierEntity> {
    const data = CourierPrismaMapper.toPersistence(entity);
    const existing = await this.prisma.logisticsCourier.findUnique({
      where: { id: entity.id }, select: { id: true },
    });
    if (existing) {
      const updated = await this.prisma.logisticsCourier.update({
        where: { id: entity.id }, data: data as never,
      });
      return CourierPrismaMapper.toDomain(updated as never);
    }
    const created = await this.prisma.logisticsCourier.create({ data: data as never });
    return CourierPrismaMapper.toDomain(created as never);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.logisticsCourier.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<void> {
    await this.prisma.logisticsCourier.update({
      where: { id }, data: { deletedAt: new Date() },
    });
  }

  async clearDefaultExcept(courierId: string): Promise<void> {
    await this.prisma.logisticsCourier.updateMany({
      where: { isDefault: true, id: { not: courierId } },
      data: { isDefault: false },
    });
  }

  private buildWhere(options: CourierListOptions): Record<string, unknown> {
    const f = options.filter ?? {};
    const where: Record<string, unknown> = { deletedAt: null };
    if (f.status) where['status'] = f.status;
    if (f.type) where['type'] = f.type;
    if (f.supportsCOD !== undefined) where['supportsCOD'] = f.supportsCOD;
    if (f.supportsInsurance !== undefined) where['supportsInsurance'] = f.supportsInsurance;
    if (f.supportsInternational !== undefined) where['supportsInternational'] = f.supportsInternational;
    if (f.zone) where['coverageZones'] = { has: f.zone };
    if (f.search) {
      where['OR'] = [
        { name: { contains: f.search, mode: 'insensitive' } },
        { displayName: { contains: f.search, mode: 'insensitive' } },
        { code: { contains: f.search, mode: 'insensitive' } },
      ];
    }
    return where;
  }
}

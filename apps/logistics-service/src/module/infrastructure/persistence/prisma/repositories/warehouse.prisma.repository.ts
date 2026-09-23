import { Injectable } from '@nestjs/common';
import { Warehouse as PrismaWarehouse } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { WarehouseEntity } from '../../../../domain/entities/warehouse.entity';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo';
import { WarehouseCodeVO } from '../../../../domain/value-objects/primitives/warehouse-code.vo';
import { WarehouseNameVO } from '../../../../domain/value-objects/primitives/warehouse-name.vo';
import { WarehouseStatusVO } from '../../../../domain/value-objects/primitives/warehouse-status.vo';
import type { WarehouseRepository } from '../../../../domain/repositories/warehouse.repository.interface';

@Injectable()
export class WarehousePrismaRepository
  extends BasePrismaRepository<WarehouseEntity, WarehouseIdVO>
  implements WarehouseRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaWarehouse): WarehouseEntity {
    return WarehouseEntity.reconstitute(
      WarehouseIdVO.create(raw.id),
      {
        code: WarehouseCodeVO.create(raw.code),
        name: WarehouseNameVO.create(raw.name),
        status: WarehouseStatusVO.create(raw.status),
        division: raw.division,
        district: raw.district,
        address: raw.address,
        capacity: raw.capacity,
        locations: [],
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: WarehouseIdVO): Promise<WarehouseEntity | null> {
    const raw = await this.prisma.warehouse.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.warehouse.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: WarehouseEntity): Promise<WarehouseEntity> {
    const data = {
      code: entity.code.value,
      name: entity.name.value,
      type: 'standard',
      status: entity.status.value,
      division: entity.division,
      district: entity.district,
      address: entity.address,
      capacity: entity.capacity,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.warehouse.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: WarehouseIdVO): Promise<void> {
    await this.prisma.warehouse.delete({ where: { id: id.value } });
  }

  async findByCode(code: WarehouseCodeVO): Promise<WarehouseEntity | null> {
    const raw = await this.prisma.warehouse.findUnique({ where: { code: code.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByDivision(division: string): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.warehouse.findMany({ where: { division } });
    return rows.map((r) => this.toDomain(r));
  }

  async findActive(): Promise<readonly WarehouseEntity[]> {
    const rows = await this.prisma.warehouse.findMany({ where: { status: 'active' } });
    return rows.map((r) => this.toDomain(r));
  }
}

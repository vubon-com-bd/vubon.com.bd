import { Injectable } from '@nestjs/common';
import { WarehouseLocation as PrismaLocation } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { InventoryLocationEntity } from '../../../../domain/entities/inventory-location.entity';
import { LocationIdVO } from '../../../../domain/value-objects/primitives/location-id.vo';
import { LocationCodeVO } from '../../../../domain/value-objects/primitives/location-code.vo';
import { LocationNameVO } from '../../../../domain/value-objects/primitives/location-name.vo';
import { LocationStatusVO } from '../../../../domain/value-objects/primitives/location-status.vo';
import { LocationTypeVO } from '../../../../domain/value-objects/primitives/location-type.vo';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo';
import type { InventoryLocationRepository } from '../../../../domain/repositories/inventory-location.repository.interface';

@Injectable()
export class InventoryLocationPrismaRepository
  extends BasePrismaRepository<InventoryLocationEntity, LocationIdVO>
  implements InventoryLocationRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaLocation): InventoryLocationEntity {
    return InventoryLocationEntity.reconstitute(
      LocationIdVO.create(raw.id),
      {
        warehouseId: WarehouseIdVO.create(raw.warehouseId),
        code: LocationCodeVO.create(raw.code),
        name: raw.name ? LocationNameVO.create(raw.name) : null,
        type: LocationTypeVO.create(raw.type),
        status: LocationStatusVO.create(raw.status),
        capacity: raw.capacity,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: LocationIdVO): Promise<InventoryLocationEntity | null> {
    const raw = await this.prisma.warehouseLocation.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly InventoryLocationEntity[]> {
    const rows = await this.prisma.warehouseLocation.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: InventoryLocationEntity): Promise<InventoryLocationEntity> {
    const data = {
      warehouseId: entity.warehouseId.value,
      code: entity.code.value,
      name: entity.name?.value ?? null,
      type: entity.type.value,
      status: entity.status.value,
      capacity: entity.capacity,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.warehouseLocation.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: LocationIdVO): Promise<void> {
    await this.prisma.warehouseLocation.delete({ where: { id: id.value } });
  }

  async findByWarehouse(warehouseId: WarehouseIdVO): Promise<readonly InventoryLocationEntity[]> {
    const rows = await this.prisma.warehouseLocation.findMany({ where: { warehouseId: warehouseId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findAvailable(warehouseId: WarehouseIdVO): Promise<readonly InventoryLocationEntity[]> {
    const rows = await this.prisma.warehouseLocation.findMany({
      where: { warehouseId: warehouseId.value, status: 'available' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

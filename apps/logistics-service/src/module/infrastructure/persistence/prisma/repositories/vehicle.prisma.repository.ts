import { Injectable } from '@nestjs/common';
import { Vehicle as PrismaVehicle } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { VehicleEntity } from '../../../../domain/entities/vehicle.entity';
import { VehicleIdVO } from '../../../../domain/value-objects/primitives/vehicle-id.vo';
import { VehicleNumberVO } from '../../../../domain/value-objects/primitives/vehicle-number.vo';
import { VehicleStatusVO } from '../../../../domain/value-objects/primitives/vehicle-status.vo';
import { VehicleTypeVO } from '../../../../domain/value-objects/primitives/vehicle-type.vo';
import type { VehicleRepository } from '../../../../domain/repositories/vehicle.repository.interface';

@Injectable()
export class VehiclePrismaRepository
  extends BasePrismaRepository<VehicleEntity, VehicleIdVO>
  implements VehicleRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaVehicle): VehicleEntity {
    return VehicleEntity.reconstitute(
      VehicleIdVO.create(raw.id),
      {
        number: VehicleNumberVO.create(raw.vehicleNo),
        type: VehicleTypeVO.create(raw.type),
        status: VehicleStatusVO.create(raw.status),
        capacity: null,
        fuelType: null,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: VehicleIdVO): Promise<VehicleEntity | null> {
    const raw = await this.prisma.vehicle.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.vehicle.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: VehicleEntity): Promise<VehicleEntity> {
    const data = {
      vehicleNo: entity.number.value,
      type: entity.type.value,
      status: entity.status.value,
      capacity: entity.capacity?.value ?? null,
      fuelType: entity.fuelType?.value ?? null,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.vehicle.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: VehicleIdVO): Promise<void> {
    await this.prisma.vehicle.delete({ where: { id: id.value } });
  }

  async findByNumber(number: VehicleNumberVO): Promise<VehicleEntity | null> {
    const raw = await this.prisma.vehicle.findUnique({ where: { vehicleNo: number.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAvailable(): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.vehicle.findMany({ where: { status: 'available' } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByType(type: string): Promise<readonly VehicleEntity[]> {
    const rows = await this.prisma.vehicle.findMany({ where: { type } });
    return rows.map((r) => this.toDomain(r));
  }
}

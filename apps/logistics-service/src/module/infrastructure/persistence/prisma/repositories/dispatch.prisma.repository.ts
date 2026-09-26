import { Injectable } from '@nestjs/common';
import { Dispatch as PrismaDispatch } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DispatchEntity } from '../../../../domain/entities/dispatch.entity';
import { DispatchIdVO } from '../../../../domain/value-objects/primitives/dispatch-id.vo';
import { DispatchStatusVO } from '../../../../domain/value-objects/primitives/dispatch-status.vo';
import { DispatchTypeVO } from '../../../../domain/value-objects/primitives/dispatch-type.vo';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import { VehicleIdVO } from '../../../../domain/value-objects/primitives/vehicle-id.vo';
import { DriverIdVO } from '../../../../domain/value-objects/primitives/driver-id.vo';
import { RouteIdVO } from '../../../../domain/value-objects/primitives/route-id.vo';
import type { DispatchRepository } from '../../../../domain/repositories/dispatch.repository.interface';

@Injectable()
export class DispatchPrismaRepository
  extends BasePrismaRepository<DispatchEntity, DispatchIdVO>
  implements DispatchRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDispatch): DispatchEntity {
    return DispatchEntity.reconstitute(
      DispatchIdVO.create(raw.id),
      {
        shipmentId: ShipmentIdVO.create(raw.shipmentId),
        vehicleId: raw.vehicleId ? VehicleIdVO.create(raw.vehicleId) : null,
        driverId: raw.driverId ? DriverIdVO.create(raw.driverId) : null,
        routeId: raw.routeId ? RouteIdVO.create(raw.routeId) : null,
        status: DispatchStatusVO.create(raw.status),
        type: DispatchTypeVO.create(raw.type),
        departedAt: raw.departedAt,
        arrivedAt: raw.arrivedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: DispatchIdVO): Promise<DispatchEntity | null> {
    const raw = await this.prisma.dispatch.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.dispatch.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DispatchEntity): Promise<DispatchEntity> {
    const data = {
      shipmentId: entity.shipmentId.value,
      vehicleId: entity.vehicleId?.value ?? null,
      driverId: entity.driverId?.value ?? null,
      routeId: entity.routeId?.value ?? null,
      status: entity.status.value,
      type: entity.type.value,
      departedAt: entity.departedAt,
      arrivedAt: entity.arrivedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.dispatch.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DispatchIdVO): Promise<void> {
    await this.prisma.dispatch.delete({ where: { id: id.value } });
  }

  async findByVehicle(vehicleId: VehicleIdVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.dispatch.findMany({ where: { vehicleId: vehicleId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByDriver(driverId: DriverIdVO): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.dispatch.findMany({ where: { driverId: driverId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly DispatchEntity[]> {
    const rows = await this.prisma.dispatch.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}

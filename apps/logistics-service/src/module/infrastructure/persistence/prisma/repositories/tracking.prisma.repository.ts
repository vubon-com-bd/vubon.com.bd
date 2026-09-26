import { Injectable } from '@nestjs/common';
import { Tracking as PrismaTracking } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { TrackingEntity } from '../../../../domain/entities/tracking.entity';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo';
import { ShipmentIdVO } from '../../../../domain/value-objects/primitives/shipment-id.vo';
import type { TrackingRepository } from '../../../../domain/repositories/tracking.repository.interface';

@Injectable()
export class TrackingPrismaRepository
  extends BasePrismaRepository<TrackingEntity, TrackingIdVO>
  implements TrackingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaTracking): TrackingEntity {
    return TrackingEntity.reconstitute(
      TrackingIdVO.create(raw.id),
      {
        number: TrackingNumberVO.create(raw.trackingNumber),
        shipmentId: ShipmentIdVO.create(raw.shipmentId),
        status: TrackingStatusVO.create(raw.status),
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: TrackingIdVO): Promise<TrackingEntity | null> {
    const raw = await this.prisma.tracking.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly TrackingEntity[]> {
    const rows = await this.prisma.tracking.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: TrackingEntity): Promise<TrackingEntity> {
    const data = {
      trackingNumber: entity.number.value,
      shipmentId: entity.shipmentId.value,
      status: entity.status.value,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.tracking.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TrackingIdVO): Promise<void> {
    await this.prisma.tracking.delete({ where: { id: id.value } });
  }

  async findByNumber(number: TrackingNumberVO): Promise<TrackingEntity | null> {
    const raw = await this.prisma.tracking.findUnique({ where: { trackingNumber: number.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findByShipment(shipmentId: ShipmentIdVO): Promise<TrackingEntity | null> {
    const raw = await this.prisma.tracking.findFirst({ where: { shipmentId: shipmentId.value } });
    return raw ? this.toDomain(raw) : null;
  }
}

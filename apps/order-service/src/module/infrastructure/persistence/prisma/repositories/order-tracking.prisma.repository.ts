import { Injectable } from '@nestjs/common';
import { OrderTracking as PrismaOrderTracking, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderTrackingEntity } from '../../../../domain/entities/order-tracking.entity';
import { TrackingIdVO } from '../../../../domain/value-objects/primitives/tracking-id.vo';
import { TrackingStatusVO } from '../../../../domain/value-objects/primitives/tracking-status.vo';
import { TrackingNumberVO } from '../../../../domain/value-objects/primitives/tracking-number.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { OrderTrackingRepository } from '../../../../domain/repositories/order-tracking.repository.interface';

@Injectable()
export class OrderTrackingPrismaRepository
  extends BasePrismaRepository<OrderTrackingEntity, TrackingIdVO>
  implements OrderTrackingRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderTracking): OrderTrackingEntity {
    const events = (raw.events ?? []) as ReadonlyArray<Record<string, unknown>>;
    return OrderTrackingEntity.reconstitute(
      TrackingIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        status: TrackingStatusVO.create(raw.status),
        trackingNumber: raw.trackingNumber
          ? TrackingNumberVO.create(raw.trackingNumber)
          : null,
        carrier: raw.carrier,
        events,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: TrackingIdVO): Promise<OrderTrackingEntity | null> {
    const raw = await this.prisma.orderTracking.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.prisma.orderTracking.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderTrackingEntity): Promise<OrderTrackingEntity> {
    const data = {
      orderId: entity.orderId.value,
      status: entity.status.value,
      trackingNumber: entity.trackingNumber?.value ?? null,
      carrier: entity.carrier,
      events: entity.events as Prisma.InputJsonValue,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.orderTracking.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: TrackingIdVO): Promise<void> {
    await this.prisma.orderTracking.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly OrderTrackingEntity[]> {
    const rows = await this.prisma.orderTracking.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findByTrackingNumber(number: TrackingNumberVO): Promise<OrderTrackingEntity | null> {
    const raw = await this.prisma.orderTracking.findFirst({
      where: { trackingNumber: number.value },
    });
    return raw ? this.toDomain(raw) : null;
  }
}

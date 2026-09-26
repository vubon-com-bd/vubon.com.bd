import { Injectable } from '@nestjs/common';
import { Delivery as PrismaDelivery } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DeliveryEntity } from '../../../../domain/entities/delivery.entity';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo';
import { DeliveryTypeVO } from '../../../../domain/value-objects/primitives/delivery-type.vo';
import { DeliveryMethodIdVO } from '../../../../domain/value-objects/primitives/delivery-method-id.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { DeliveryRepository } from '../../../../domain/repositories/delivery.repository.interface';

@Injectable()
export class DeliveryPrismaRepository
  extends BasePrismaRepository<DeliveryEntity, DeliveryIdVO>
  implements DeliveryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDelivery): DeliveryEntity {
    return DeliveryEntity.reconstitute(
      DeliveryIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        status: DeliveryStatusVO.create(raw.status),
        type: DeliveryTypeVO.create(raw.type),
        methodId: raw.deliveryMethodId ? DeliveryMethodIdVO.create(raw.deliveryMethodId) : null,
        scheduledAt: raw.scheduledAt,
        attemptedAt: raw.attemptedAt,
        deliveredAt: raw.deliveredAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: DeliveryIdVO): Promise<DeliveryEntity | null> {
    const raw = await this.prisma.delivery.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.delivery.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DeliveryEntity): Promise<DeliveryEntity> {
    const data = {
      orderId: entity.orderId.value,
      status: entity.status.value,
      type: entity.type.value,
      deliveryMethodId: entity.methodId?.value ?? null,
      scheduledAt: entity.scheduledAt,
      attemptedAt: entity.attemptedAt,
      deliveredAt: entity.deliveredAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.delivery.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: DeliveryIdVO): Promise<void> {
    await this.prisma.delivery.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<DeliveryEntity | null> {
    const raw = await this.prisma.delivery.findUnique({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly DeliveryEntity[]> {
    const rows = await this.prisma.delivery.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}

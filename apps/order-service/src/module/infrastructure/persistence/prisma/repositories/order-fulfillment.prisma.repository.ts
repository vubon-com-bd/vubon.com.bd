import { Injectable } from '@nestjs/common';
import { OrderFulfillment as PrismaOrderFulfillment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderFulfillmentEntity } from '../../../../domain/entities/order-fulfillment.entity';
import { FulfillmentIdVO } from '../../../../domain/value-objects/primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../../../../domain/value-objects/primitives/fulfillment-status.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { VendorIdVO } from '../../../../domain/value-objects/primitives/vendor-id.vo';
import type { OrderFulfillmentRepository } from '../../../../domain/repositories/order-fulfillment.repository.interface';

@Injectable()
export class OrderFulfillmentPrismaRepository
  extends BasePrismaRepository<OrderFulfillmentEntity, FulfillmentIdVO>
  implements OrderFulfillmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderFulfillment): OrderFulfillmentEntity {
    return OrderFulfillmentEntity.reconstitute(
      FulfillmentIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        vendorId: raw.vendorId ? VendorIdVO.create(raw.vendorId) : null,
        status: FulfillmentStatusVO.create(raw.status),
        startedAt: raw.startedAt,
        packedAt: raw.packedAt,
        shippedAt: raw.shippedAt,
        completedAt: raw.completedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: FulfillmentIdVO): Promise<OrderFulfillmentEntity | null> {
    const raw = await this.prisma.orderFulfillment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.prisma.orderFulfillment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderFulfillmentEntity): Promise<OrderFulfillmentEntity> {
    const data = {
      orderId: entity.orderId.value,
      vendorId: entity.vendorId?.value ?? null,
      status: entity.status.value,
      startedAt: entity.startedAt,
      packedAt: entity.packedAt,
      shippedAt: entity.shippedAt,
      completedAt: entity.completedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.orderFulfillment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FulfillmentIdVO): Promise<void> {
    await this.prisma.orderFulfillment.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<OrderFulfillmentEntity | null> {
    const raw = await this.prisma.orderFulfillment.findUnique({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByVendor(vendorId: VendorIdVO): Promise<readonly OrderFulfillmentEntity[]> {
    const rows = await this.prisma.orderFulfillment.findMany({
      where: { vendorId: vendorId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

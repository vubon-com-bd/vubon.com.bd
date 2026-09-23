import { Injectable } from '@nestjs/common';
import { Fulfillment as PrismaFulfillment } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { FulfillmentEntity } from '../../../../domain/entities/fulfillment.entity';
import { FulfillmentIdVO } from '../../../../domain/value-objects/primitives/fulfillment-id.vo';
import { FulfillmentStatusVO } from '../../../../domain/value-objects/primitives/fulfillment-status.vo';
import { FulfillmentTypeVO } from '../../../../domain/value-objects/primitives/fulfillment-type.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { WarehouseIdVO } from '../../../../domain/value-objects/primitives/warehouse-id.vo';
import type { FulfillmentRepository } from '../../../../domain/repositories/fulfillment.repository.interface';

@Injectable()
export class FulfillmentPrismaRepository
  extends BasePrismaRepository<FulfillmentEntity, FulfillmentIdVO>
  implements FulfillmentRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaFulfillment): FulfillmentEntity {
    return FulfillmentEntity.reconstitute(
      FulfillmentIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        warehouseId: WarehouseIdVO.create(raw.warehouseId),
        status: FulfillmentStatusVO.create(raw.status),
        type: FulfillmentTypeVO.create(raw.type),
        strategy: raw.strategy,
        startedAt: raw.startedAt,
        completedAt: raw.completedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      raw.deletedAt?.toISOString() ?? null,
    );
  }

  async findById(id: FulfillmentIdVO): Promise<FulfillmentEntity | null> {
    const raw = await this.prisma.fulfillment.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.fulfillment.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: FulfillmentEntity): Promise<FulfillmentEntity> {
    const data = {
      orderId: entity.orderId.value,
      warehouseId: entity.warehouseId.value,
      status: entity.status.value,
      type: entity.type.value,
      strategy: entity.strategy,
      startedAt: entity.startedAt,
      completedAt: entity.completedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.fulfillment.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: FulfillmentIdVO): Promise<void> {
    await this.prisma.fulfillment.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.fulfillment.findMany({ where: { orderId: orderId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async findByStatus(status: string): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.fulfillment.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }

  async findPending(): Promise<readonly FulfillmentEntity[]> {
    const rows = await this.prisma.fulfillment.findMany({ where: { status: 'pending' } });
    return rows.map((r) => this.toDomain(r));
  }
}

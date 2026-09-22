import { Injectable } from '@nestjs/common';
import { OrderCancel as PrismaOrderCancel } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderCancelEntity } from '../../../../domain/entities/order-cancel.entity';
import { CancelIdVO } from '../../../../domain/value-objects/primitives/cancel-id.vo';
import { CancelReasonVO } from '../../../../domain/value-objects/primitives/cancel-reason.vo';
import { CancelStatusVO } from '../../../../domain/value-objects/primitives/cancel-status.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import type { OrderCancelRepository } from '../../../../domain/repositories/order-cancel.repository.interface';

@Injectable()
export class OrderCancelPrismaRepository
  extends BasePrismaRepository<OrderCancelEntity, CancelIdVO>
  implements OrderCancelRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderCancel): OrderCancelEntity {
    return OrderCancelEntity.reconstitute(
      CancelIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        customerId: CustomerIdVO.create(raw.customerId),
        reason: CancelReasonVO.create(raw.reason),
        status: CancelStatusVO.create(raw.status),
        approvedAt: raw.approvedAt,
        rejectedAt: raw.rejectedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: CancelIdVO): Promise<OrderCancelEntity | null> {
    const raw = await this.prisma.orderCancel.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderCancelEntity[]> {
    const rows = await this.prisma.orderCancel.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderCancelEntity): Promise<OrderCancelEntity> {
    const data = {
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      approvedAt: entity.approvedAt,
      rejectedAt: entity.rejectedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.orderCancel.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: CancelIdVO): Promise<void> {
    await this.prisma.orderCancel.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<OrderCancelEntity | null> {
    const raw = await this.prisma.orderCancel.findUnique({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly OrderCancelEntity[]> {
    const rows = await this.prisma.orderCancel.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}

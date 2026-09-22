import { Injectable } from '@nestjs/common';
import { OrderReturn as PrismaOrderReturn } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderReturnEntity } from '../../../../domain/entities/order-return.entity';
import { ReturnIdVO } from '../../../../domain/value-objects/primitives/return-id.vo';
import { ReturnReasonVO } from '../../../../domain/value-objects/primitives/return-reason.vo';
import { ReturnStatusVO } from '../../../../domain/value-objects/primitives/return-status.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import { CustomerIdVO } from '../../../../domain/value-objects/primitives/customer-id.vo';
import type { OrderReturnRepository } from '../../../../domain/repositories/order-return.repository.interface';

@Injectable()
export class OrderReturnPrismaRepository
  extends BasePrismaRepository<OrderReturnEntity, ReturnIdVO>
  implements OrderReturnRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderReturn): OrderReturnEntity {
    return OrderReturnEntity.reconstitute(
      ReturnIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        customerId: CustomerIdVO.create(raw.customerId),
        reason: ReturnReasonVO.create(raw.reason),
        status: ReturnStatusVO.create(raw.status),
        approvedAt: raw.approvedAt,
        rejectedAt: raw.rejectedAt,
        completedAt: raw.completedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
    );
  }

  async findById(id: ReturnIdVO): Promise<OrderReturnEntity | null> {
    const raw = await this.prisma.orderReturn.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.prisma.orderReturn.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderReturnEntity): Promise<OrderReturnEntity> {
    const data = {
      orderId: entity.orderId.value,
      customerId: entity.customerId.value,
      reason: entity.reason.value,
      status: entity.status.value,
      approvedAt: entity.approvedAt,
      rejectedAt: entity.rejectedAt,
      completedAt: entity.completedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.orderReturn.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: ReturnIdVO): Promise<void> {
    await this.prisma.orderReturn.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<OrderReturnEntity | null> {
    const raw = await this.prisma.orderReturn.findUnique({
      where: { orderId: orderId.value },
    });
    return raw ? this.toDomain(raw) : null;
  }

  async findByStatus(status: string): Promise<readonly OrderReturnEntity[]> {
    const rows = await this.prisma.orderReturn.findMany({ where: { status } });
    return rows.map((r) => this.toDomain(r));
  }
}

import { Injectable } from '@nestjs/common';
import { OrderHistory as PrismaOrderHistory, Prisma } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { OrderHistoryEntity } from '../../../../domain/entities/order-history.entity';
import { HistoryIdVO } from '../../../../domain/value-objects/primitives/history-id.vo';
import { HistoryTypeVO } from '../../../../domain/value-objects/primitives/history-type.vo';
import { OrderIdVO } from '../../../../domain/value-objects/primitives/order-id.vo';
import type { OrderHistoryRepository } from '../../../../domain/repositories/order-history.repository.interface';

@Injectable()
export class OrderHistoryPrismaRepository
  extends BasePrismaRepository<OrderHistoryEntity, HistoryIdVO>
  implements OrderHistoryRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaOrderHistory): OrderHistoryEntity {
    const payload = (raw.payload ?? {}) as Record<string, unknown>;
    return OrderHistoryEntity.reconstitute(
      HistoryIdVO.create(raw.id),
      {
        orderId: OrderIdVO.create(raw.orderId),
        type: HistoryTypeVO.create(raw.type),
        payload,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
    );
  }

  async findById(id: HistoryIdVO): Promise<OrderHistoryEntity | null> {
    const raw = await this.prisma.orderHistory.findUnique({ where: { id: id.value } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly OrderHistoryEntity[]> {
    const rows = await this.prisma.orderHistory.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: OrderHistoryEntity): Promise<OrderHistoryEntity> {
    const data = {
      orderId: entity.orderId.value,
      type: entity.type.value,
      payload: entity.payload as Prisma.InputJsonValue,
    };
    const raw = await this.prisma.orderHistory.upsert({
      where: { id: entity.id.value },
      create: { id: entity.id.value, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: HistoryIdVO): Promise<void> {
    await this.prisma.orderHistory.delete({ where: { id: id.value } });
  }

  async findByOrder(orderId: OrderIdVO): Promise<readonly OrderHistoryEntity[]> {
    const rows = await this.prisma.orderHistory.findMany({
      where: { orderId: orderId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }

  async findRecent(orderId: OrderIdVO, limit: number): Promise<readonly OrderHistoryEntity[]> {
    const rows = await this.prisma.orderHistory.findMany({
      where: { orderId: orderId.value },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => this.toDomain(r));
  }
}

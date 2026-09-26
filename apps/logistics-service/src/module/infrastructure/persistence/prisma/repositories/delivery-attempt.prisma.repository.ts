import { Injectable } from '@nestjs/common';
import { DeliveryAttempt as PrismaDeliveryAttempt } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { DeliveryAttemptEntity } from '../../../../domain/entities/delivery-attempt.entity';
import { DeliveryIdVO } from '../../../../domain/value-objects/primitives/delivery-id.vo';
import type { DeliveryAttemptRepository } from '../../../../domain/repositories/delivery-attempt.repository.interface';

@Injectable()
export class DeliveryAttemptPrismaRepository
  extends BasePrismaRepository<DeliveryAttemptEntity, string>
  implements DeliveryAttemptRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaDeliveryAttempt): DeliveryAttemptEntity {
    return DeliveryAttemptEntity.reconstitute(
      raw.id,
      {
        deliveryId: DeliveryIdVO.create(raw.deliveryId),
        attemptNo: raw.attemptNo,
        status: raw.status,
        note: null,
        attemptedAt: raw.attemptedAt,
      },
      raw.createdAt.toISOString(),
      raw.updatedAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<DeliveryAttemptEntity | null> {
    const raw = await this.prisma.deliveryAttempt.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly DeliveryAttemptEntity[]> {
    const rows = await this.prisma.deliveryAttempt.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: DeliveryAttemptEntity): Promise<DeliveryAttemptEntity> {
    const data = {
      deliveryId: entity.deliveryId.value,
      attemptNo: entity.attemptNo,
      status: entity.status,
      attemptedAt: entity.attemptedAt,
      updatedAt: new Date(),
    };
    const raw = await this.prisma.deliveryAttempt.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.deliveryAttempt.delete({ where: { id } });
  }

  async findByDelivery(deliveryId: DeliveryIdVO): Promise<readonly DeliveryAttemptEntity[]> {
    const rows = await this.prisma.deliveryAttempt.findMany({ where: { deliveryId: deliveryId.value } });
    return rows.map((r) => this.toDomain(r));
  }

  async countByDelivery(deliveryId: DeliveryIdVO): Promise<number> {
    return this.prisma.deliveryAttempt.count({ where: { deliveryId: deliveryId.value } });
  }
}

import { Injectable } from '@nestjs/common';
import { NotificationAttempt as PrismaAttempt } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationAttemptEntity } from '../../../../domain/entities/notification-attempt.entity';
import { DeliveryAttemptVO } from '../../../../domain/value-objects/primitives/delivery-attempt.vo';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../../../../domain/value-objects/primitives/delivery-error.vo';
import type { NotificationAttemptRepository } from '../../../../domain/repositories/notification-attempt.repository.interface';

@Injectable()
export class NotificationAttemptPrismaRepository
  extends BasePrismaRepository<NotificationAttemptEntity, string>
  implements NotificationAttemptRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAttempt): NotificationAttemptEntity {
    return NotificationAttemptEntity.reconstitute(
      raw.id,
      {
        deliveryId: raw.deliveryId,
        attemptNumber: DeliveryAttemptVO.create(raw.attemptNumber),
        status: DeliveryStatusVO.create(raw.status),
        error: raw.error ? DeliveryErrorVO.create(raw.error) : null,
        attemptedAt: raw.attemptedAt,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<NotificationAttemptEntity | null> {
    const raw = await this.prisma.notificationAttempt.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationAttemptEntity[]> {
    const rows = await this.prisma.notificationAttempt.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationAttemptEntity): Promise<NotificationAttemptEntity> {
    const data = {
      deliveryId: entity.deliveryId,
      attemptNumber: entity.attemptNumber.value,
      status: entity.status.value,
      error: entity.error?.value ?? null,
      attemptedAt: entity.attemptedAt,
    };
    const raw = await this.prisma.notificationAttempt.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationAttempt.delete({ where: { id } });
  }

  async findByDeliveryId(deliveryId: string): Promise<readonly NotificationAttemptEntity[]> {
    const rows = await this.prisma.notificationAttempt.findMany({
      where: { deliveryId },
      orderBy: { attemptNumber: 'asc' },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

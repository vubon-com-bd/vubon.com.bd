import { Injectable } from '@nestjs/common';
import { NotificationAction as PrismaAction } from '@prisma/client';
import { BasePrismaRepository } from '@vubon/shared-kernel/infrastructure';
import { PrismaService } from '../prisma.service';
import { NotificationActionEntity } from '../../../../domain/entities/notification-action.entity';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo';
import { ActionTypeVO } from '../../../../domain/value-objects/primitives/action-type.vo';
import { ActionUrlVO } from '../../../../domain/value-objects/primitives/action-url.vo';
import type { NotificationActionRepository } from '../../../../domain/repositories/notification-action.repository.interface';

@Injectable()
export class NotificationActionPrismaRepository
  extends BasePrismaRepository<NotificationActionEntity, string>
  implements NotificationActionRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  private toDomain(raw: PrismaAction): NotificationActionEntity {
    return NotificationActionEntity.reconstitute(
      raw.id,
      {
        notificationId: NotificationIdVO.create(raw.notificationId),
        type: ActionTypeVO.create(raw.type),
        url: ActionUrlVO.create(raw.url),
        label: raw.label,
      },
      raw.createdAt.toISOString(),
      raw.createdAt.toISOString(),
      null,
    );
  }

  async findById(id: string): Promise<NotificationActionEntity | null> {
    const raw = await this.prisma.notificationAction.findUnique({ where: { id } });
    return raw ? this.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationActionEntity[]> {
    const rows = await this.prisma.notificationAction.findMany();
    return rows.map((r) => this.toDomain(r));
  }

  async save(entity: NotificationActionEntity): Promise<NotificationActionEntity> {
    const data = {
      notificationId: entity.notificationId.value,
      type: entity.type.value,
      url: entity.url.value,
      label: entity.label,
    };
    const raw = await this.prisma.notificationAction.upsert({
      where: { id: entity.id },
      create: { id: entity.id, ...data },
      update: data,
    });
    return this.toDomain(raw);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.notificationAction.delete({ where: { id } });
  }

  async findByNotificationId(
    notificationId: NotificationIdVO,
  ): Promise<readonly NotificationActionEntity[]> {
    const rows = await this.prisma.notificationAction.findMany({
      where: { notificationId: notificationId.value },
    });
    return rows.map((r) => this.toDomain(r));
  }
}

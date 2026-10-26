/**
 * DeliveryAttemptPrismaRepository — implements NotificationAttemptRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable, Logger } from '@nestjs/common';

import type { NotificationAttemptRepository } from '@domain/repositories/notification-attempt.repository.interface.js';
import { NOTIFICATION_ATTEMPT_REPOSITORY } from '@domain/repositories/notification-attempt.repository.interface.js';
import { NotificationAttemptEntity } from '@domain/entities/notification-attempt.entity.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationDeliveryAttempt } from '@infrastructure/persistence/prisma/prisma.client.js';
import { DeliveryAttemptPrismaMapper } from '@infrastructure/persistence/prisma/mappers/delivery-attempt.prisma.mapper.js';

const MODEL_NAME = 'notificationDeliveryAttempt';

@Injectable()
export class DeliveryAttemptPrismaRepository
  extends NotificationBasePrismaRepository
  implements NotificationAttemptRepository
{
  private readonly logger = new Logger(DeliveryAttemptPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationDeliveryAttempt> {
    return this.model<PrismaNotificationDeliveryAttempt>(MODEL_NAME);
  }

  async findById(id: string): Promise<NotificationAttemptEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? DeliveryAttemptPrismaMapper.toDomain(raw) : null;
  }

  async findByNotification(
    notificationId: NotificationIdVO | string,
  ): Promise<readonly NotificationAttemptEntity[]> {
    const nid = typeof notificationId === 'string' ? notificationId : notificationId.value;
    const rows = await this.delegate.findMany({
      where: { notificationId: nid },
      orderBy: { attempt: 'asc' },
    });
    return rows.map((r) => DeliveryAttemptPrismaMapper.toDomain(r));
  }

  async findLatest(notificationId: string): Promise<NotificationAttemptEntity | null> {
    const raw = await this.delegate.findFirst({
      where: { notificationId },
      orderBy: { attempt: 'desc' },
    });
    return raw ? DeliveryAttemptPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationAttemptEntity[]> {
    const rows = await this.delegate.findMany({});
    return rows.map((r) => DeliveryAttemptPrismaMapper.toDomain(r));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: NotificationAttemptEntity): Promise<NotificationAttemptEntity> {
    const data = DeliveryAttemptPrismaMapper.toPersistence(entity);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      });
      return DeliveryAttemptPrismaMapper.toDomain(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return DeliveryAttemptPrismaMapper.toDomain(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async countAttempts(notificationId: string): Promise<number> {
    return this.delegate.count({ where: { notificationId } });
  }

  async countSuccessful(notificationId: string): Promise<number> {
    return this.delegate.count({
      where: { notificationId, status: 'sent' },
    });
  }

  static readonly _token = NOTIFICATION_ATTEMPT_REPOSITORY;
}

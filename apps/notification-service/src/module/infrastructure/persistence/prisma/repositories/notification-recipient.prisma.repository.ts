/**
 * NotificationRecipientPrismaRepository — recipient is embedded in Notification row
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';

import type { NotificationRecipientRepository } from '@domain/repositories/notification-recipient.repository.interface.js';
import { NOTIFICATION_RECIPIENT_REPOSITORY } from '@domain/repositories/notification-recipient.repository.interface.js';
import type { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import { NotificationRecipientPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-recipient.prisma.mapper.js';

const MODEL_NAME = 'notification';

@Injectable()
export class NotificationRecipientPrismaRepository
  extends NotificationBasePrismaRepository
  implements NotificationRecipientRepository
{
  private get delegate(): PrismaDelegate<PrismaNotification> {
    return this.model<PrismaNotification>(MODEL_NAME);
  }

  async findById(id: string): Promise<NotificationRecipientEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? NotificationRecipientPrismaMapper.toDomain(raw) : null;
  }

  async findByNotification(
    notificationId: NotificationIdVO | string,
  ): Promise<readonly NotificationRecipientEntity[]> {
    const nid = typeof notificationId === 'string' ? notificationId : notificationId.value;
    const raw = await this.delegate.findUnique({ where: { id: nid } });
    const recipient = raw ? NotificationRecipientPrismaMapper.toDomain(raw) : null;
    return recipient ? Object.freeze([recipient]) : Object.freeze([]);
  }

  async findByUser(userId: string): Promise<readonly NotificationRecipientEntity[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
    });
    return rows
      .map((r) => NotificationRecipientPrismaMapper.toDomain(r))
      .filter((e): e is NotificationRecipientEntity => e !== null);
  }

  async findByDeliveryStatus(status: string): Promise<readonly NotificationRecipientEntity[]> {
    const rows = await this.delegate.findMany({
      where: { deliveryStatus: status, deletedAt: null },
    });
    return rows
      .map((r) => NotificationRecipientPrismaMapper.toDomain(r))
      .filter((e): e is NotificationRecipientEntity => e !== null);
  }

  async findUndelivered(notificationId: string): Promise<readonly NotificationRecipientEntity[]> {
    const raw = await this.delegate.findUnique({ where: { id: notificationId } });
    if (!raw || raw.deliveryStatus === 'delivered') return Object.freeze([]);
    const recipient = NotificationRecipientPrismaMapper.toDomain(raw);
    return recipient ? Object.freeze([recipient]) : Object.freeze([]);
  }

  async findAll(): Promise<readonly NotificationRecipientEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows
      .map((r) => NotificationRecipientPrismaMapper.toDomain(r))
      .filter((e): e is NotificationRecipientEntity => e !== null);
  }

  async countByDeliveryStatus(notificationId: string, status: string): Promise<number> {
    return this.delegate.count({
      where: { id: notificationId, deliveryStatus: status },
    });
  }

  async save(entity: NotificationRecipientEntity): Promise<NotificationRecipientEntity> {
    const updated = await this.delegate.update({
      where: { id: entity.notificationId.value },
      data: {
        deliveryStatus: entity.deliveryStatus.value,
        deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
        readAt: entity.readAt ? new Date(entity.readAt) : null,
        failureReason: entity.failureReason ?? null,
      } as never,
    });
    const result = NotificationRecipientPrismaMapper.toDomain(updated);
    return result ?? entity;
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  static readonly _token = NOTIFICATION_RECIPIENT_REPOSITORY;
}

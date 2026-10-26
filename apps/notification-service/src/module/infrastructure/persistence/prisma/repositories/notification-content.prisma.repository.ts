/**
 * NotificationContentPrismaRepository — content is embedded in Notification row
 * @module notification-service/infrastructure/persistence/prisma/repositories
 */
import { Injectable } from '@nestjs/common';

import type { NotificationContentRepository } from '@domain/repositories/notification-content.repository.interface.js';
import { NOTIFICATION_CONTENT_REPOSITORY } from '@domain/repositories/notification-content.repository.interface.js';
import type { NotificationContentEntity } from '@domain/entities/notification-content.entity.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import { NotificationContentPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification-content.prisma.mapper.js';

const MODEL_NAME = 'notification';

@Injectable()
export class NotificationContentPrismaRepository
  extends NotificationBasePrismaRepository
  implements NotificationContentRepository
{
  private get delegate(): PrismaDelegate<PrismaNotification> {
    return this.model<PrismaNotification>(MODEL_NAME);
  }

  async findById(id: string): Promise<NotificationContentEntity | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? NotificationContentPrismaMapper.toDomain(raw) : null;
  }

  async findByNotification(
    notificationId: NotificationIdVO | string,
  ): Promise<NotificationContentEntity | null> {
    const nid = typeof notificationId === 'string' ? notificationId : notificationId.value;
    const raw = await this.delegate.findUnique({ where: { id: nid } });
    return raw ? NotificationContentPrismaMapper.toDomain(raw) : null;
  }

  async findAll(): Promise<readonly NotificationContentEntity[]> {
    const rows = await this.delegate.findMany({ where: { deletedAt: null } });
    return rows.map((r) => NotificationContentPrismaMapper.toDomain(r));
  }

  async findUnrendered(): Promise<readonly NotificationContentEntity[]> {
    const rows = await this.delegate.findMany({
      where: { status: 'pending', deletedAt: null },
      orderBy: { createdAt: 'asc' },
    });
    return rows.map((r) => NotificationContentPrismaMapper.toDomain(r));
  }

  async save(entity: NotificationContentEntity): Promise<NotificationContentEntity> {
    // Content is embedded — save the parent Notification
    const existing = await this.delegate.findUnique({ where: { id: entity.id } });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: {
          title: entity.content.subject.value,
          body: entity.content.body.value,
          imageUrl: entity.content.imageUrl?.value ?? null,
          iconUrl: entity.content.iconUrl?.value ?? null,
          actionUrl: entity.content.actionUrl?.value ?? null,
          data: entity.content.data.value,
        } as never,
      });
      return NotificationContentPrismaMapper.toDomain(updated);
    }
    return entity;
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async markRendered(contentId: string, _renderedAt: string): Promise<void> {
    await this.delegate.update({
      where: { id: contentId },
      data: { status: 'queued' } as never,
    });
  }

  static readonly _token = NOTIFICATION_CONTENT_REPOSITORY;
}

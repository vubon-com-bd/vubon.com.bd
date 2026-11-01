/**
 * NotificationEventPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — persists domain events for audit/replay.
 * No domain repository interface.
 */
import { Injectable, Logger } from '@nestjs/common';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationEvent } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  NotificationEventPrismaMapper,
  type NotificationEventRow,
} from '@infrastructure/persistence/prisma/mappers/notification-event.prisma.mapper.js';

const MODEL_NAME = 'notificationEvent';

@Injectable()
export class NotificationEventPrismaRepository
  extends NotificationBasePrismaRepository
{
  private readonly logger = new Logger(NotificationEventPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationEvent> {
    return this.model<PrismaNotificationEvent>(MODEL_NAME);
  }

  async findById(id: string): Promise<NotificationEventRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? NotificationEventPrismaMapper.toRow(raw) : null;
  }

  async findByNotification(notificationId: string): Promise<readonly NotificationEventRow[]> {
    const rows = await this.delegate.findMany({
      where: { notificationId },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => NotificationEventPrismaMapper.toRow(r));
  }

  async findByUser(userId: string): Promise<readonly NotificationEventRow[]> {
    const rows = await this.delegate.findMany({
      where: { userId },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => NotificationEventPrismaMapper.toRow(r));
  }

  async findByType(eventType: string): Promise<readonly NotificationEventRow[]> {
    const rows = await this.delegate.findMany({
      where: { eventType },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => NotificationEventPrismaMapper.toRow(r));
  }

  async save(row: NotificationEventRow): Promise<NotificationEventRow> {
    const data = NotificationEventPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return NotificationEventPrismaMapper.toRow(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return NotificationEventPrismaMapper.toRow(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async deleteByNotification(notificationId: string): Promise<number> {
    const result = await this.delegate.deleteMany({ where: { notificationId } });
    return (result as { count: number }).count;
  }

  async countByType(eventType: string): Promise<number> {
    return this.delegate.count({ where: { eventType } });
  }
}

/**
 * ActionLogPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — user-triggered action log.
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationActionLog } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  ActionLogPrismaMapper,
  type ActionLogRow,
} from '@infrastructure/persistence/prisma/mappers/action-log.prisma.mapper.js';

const MODEL_NAME = 'notificationActionLog';

@Injectable()
export class ActionLogPrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationActionLog> {
    return this.model<PrismaNotificationActionLog>(MODEL_NAME);
  }

  async findById(id: string): Promise<ActionLogRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? ActionLogPrismaMapper.toRow(raw) : null;
  }

  async findByNotification(notificationId: string): Promise<readonly ActionLogRow[]> {
    const rows = await this.delegate.findMany({
      where: { notificationId },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => ActionLogPrismaMapper.toRow(r));
  }

  async findByUser(userId: string): Promise<readonly ActionLogRow[]> {
    const rows = await this.delegate.findMany({
      where: { userId },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => ActionLogPrismaMapper.toRow(r));
  }

  async save(row: ActionLogRow): Promise<ActionLogRow> {
    const data = ActionLogPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return ActionLogPrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return ActionLogPrismaMapper.toRow(created);
  }
}

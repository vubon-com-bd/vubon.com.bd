/**
 * UnsubscribePrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — unsubscribe audit trail.
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationUnsubscribe } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  UnsubscribePrismaMapper,
  type UnsubscribeRow,
} from '@infrastructure/persistence/prisma/mappers/unsubscribe.prisma.mapper.js';

const MODEL_NAME = 'notificationUnsubscribe';

@Injectable()
export class UnsubscribePrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationUnsubscribe> {
    return this.model<PrismaNotificationUnsubscribe>(MODEL_NAME);
  }

  async findById(id: string): Promise<UnsubscribeRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? UnsubscribePrismaMapper.toRow(raw) : null;
  }

  async findByUser(userId: string): Promise<readonly UnsubscribeRow[]> {
    const rows = await this.delegate.findMany({
      where: { userId, deletedAt: null },
      orderBy: { unsubscribedAt: 'desc' },
    });
    return rows.map((r) => UnsubscribePrismaMapper.toRow(r));
  }

  async findByScope(userId: string, scope: string): Promise<UnsubscribeRow | null> {
    const raw = await this.delegate.findFirst({
      where: { userId, scope, deletedAt: null },
    });
    return raw ? UnsubscribePrismaMapper.toRow(raw) : null;
  }

  async save(row: UnsubscribeRow): Promise<UnsubscribeRow> {
    const data = UnsubscribePrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return UnsubscribePrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return UnsubscribePrismaMapper.toRow(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}

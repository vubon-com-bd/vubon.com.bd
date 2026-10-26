/**
 * BouncePrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — bounce events for suppression logic.
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationBounce } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  BouncePrismaMapper,
  type BounceRow,
} from '@infrastructure/persistence/prisma/mappers/bounce.prisma.mapper.js';

const MODEL_NAME = 'notificationBounce';

@Injectable()
export class BouncePrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationBounce> {
    return this.model<PrismaNotificationBounce>(MODEL_NAME);
  }

  async findById(id: string): Promise<BounceRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? BouncePrismaMapper.toRow(raw) : null;
  }

  async findByNotification(notificationId: string): Promise<readonly BounceRow[]> {
    const rows = await this.delegate.findMany({
      where: { notificationId },
      orderBy: { bouncedAt: 'desc' },
    });
    return rows.map((r) => BouncePrismaMapper.toRow(r));
  }

  async findByUser(userId: string): Promise<readonly BounceRow[]> {
    const rows = await this.delegate.findMany({
      where: { userId },
      orderBy: { bouncedAt: 'desc' },
    });
    return rows.map((r) => BouncePrismaMapper.toRow(r));
  }

  async findByRecipient(recipient: string): Promise<readonly BounceRow[]> {
    const rows = await this.delegate.findMany({
      where: { recipient },
      orderBy: { bouncedAt: 'desc' },
    });
    return rows.map((r) => BouncePrismaMapper.toRow(r));
  }

  async countByType(bounceType: string): Promise<number> {
    return this.delegate.count({ where: { bounceType } });
  }

  async save(row: BounceRow): Promise<BounceRow> {
    const data = BouncePrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return BouncePrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return BouncePrismaMapper.toRow(created);
  }
}

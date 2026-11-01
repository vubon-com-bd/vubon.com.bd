/**
 * BroadcastBatchPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — no domain repository interface (batch tracking)।
 */
import { Injectable, Logger } from '@nestjs/common';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationBroadcastBatch } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  BroadcastBatchPrismaMapper,
  type BroadcastBatchRow,
} from '@infrastructure/persistence/prisma/mappers/broadcast-batch.prisma.mapper.js';

const MODEL_NAME = 'notificationBroadcastBatch';

@Injectable()
export class BroadcastBatchPrismaRepository
  extends NotificationBasePrismaRepository
{
  private readonly logger = new Logger(BroadcastBatchPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationBroadcastBatch> {
    return this.model<PrismaNotificationBroadcastBatch>(MODEL_NAME);
  }

  async findById(id: string): Promise<BroadcastBatchRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? BroadcastBatchPrismaMapper.toRow(raw) : null;
  }

  async findByBroadcast(broadcastId: string): Promise<readonly BroadcastBatchRow[]> {
    const rows = await this.delegate.findMany({
      where: { broadcastId },
      orderBy: { batchNumber: 'asc' },
    });
    return rows.map((r) => BroadcastBatchPrismaMapper.toRow(r));
  }

  async save(row: BroadcastBatchRow): Promise<BroadcastBatchRow> {
    const data = BroadcastBatchPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return BroadcastBatchPrismaMapper.toRow(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return BroadcastBatchPrismaMapper.toRow(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async deleteByBroadcast(broadcastId: string): Promise<number> {
    const result = await this.delegate.deleteMany({ where: { broadcastId } });
    return (result as { count: number }).count;
  }

  async countByBroadcast(broadcastId: string): Promise<number> {
    return this.delegate.count({ where: { broadcastId } });
  }
}

/**
 * AuditLogPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — full audit trail (before/after state).
 */
import { Injectable } from '@nestjs/common';
import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationAuditLog } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  AuditLogPrismaMapper,
  type AuditLogRow,
} from '@infrastructure/persistence/prisma/mappers/audit-log.prisma.mapper.js';

const MODEL_NAME = 'notificationAuditLog';

@Injectable()
export class AuditLogPrismaRepository extends NotificationBasePrismaRepository {
  private get delegate(): PrismaDelegate<PrismaNotificationAuditLog> {
    return this.model<PrismaNotificationAuditLog>(MODEL_NAME);
  }

  async findById(id: string): Promise<AuditLogRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? AuditLogPrismaMapper.toRow(raw) : null;
  }

  async findByEntity(entityType: string, entityId: string): Promise<readonly AuditLogRow[]> {
    const rows = await this.delegate.findMany({
      where: { entityType, entityId },
      orderBy: { occurredAt: 'asc' },
    });
    return rows.map((r) => AuditLogPrismaMapper.toRow(r));
  }

  async findByActor(actorId: string): Promise<readonly AuditLogRow[]> {
    const rows = await this.delegate.findMany({
      where: { actorId },
      orderBy: { occurredAt: 'desc' },
    });
    return rows.map((r) => AuditLogPrismaMapper.toRow(r));
  }

  async save(row: AuditLogRow): Promise<AuditLogRow> {
    const data = AuditLogPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });
    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return AuditLogPrismaMapper.toRow(updated);
    }
    const created = await this.delegate.create({ data: data as never });
    return AuditLogPrismaMapper.toRow(created);
  }

  async purgeOlderThan(cutoff: string): Promise<number> {
    const result = await this.delegate.deleteMany({
      where: { occurredAt: { lt: new Date(cutoff) } },
    });
    return (result as { count: number }).count;
  }
}

/**
 * WebhookDeliveryPrismaRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * Infrastructure-only — persists webhook fire history.
 */
import { Injectable, Logger } from '@nestjs/common';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type { PrismaNotificationWebhookDelivery } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  WebhookDeliveryPrismaMapper,
  type WebhookDeliveryRow,
} from '@infrastructure/persistence/prisma/mappers/webhook-delivery.prisma.mapper.js';

const MODEL_NAME = 'notificationWebhookDelivery';

@Injectable()
export class WebhookDeliveryPrismaRepository
  extends NotificationBasePrismaRepository
{
  private readonly logger = new Logger(WebhookDeliveryPrismaRepository.name);

  private get delegate(): PrismaDelegate<PrismaNotificationWebhookDelivery> {
    return this.model<PrismaNotificationWebhookDelivery>(MODEL_NAME);
  }

  async findById(id: string): Promise<WebhookDeliveryRow | null> {
    const raw = await this.delegate.findUnique({ where: { id } });
    return raw ? WebhookDeliveryPrismaMapper.toRow(raw) : null;
  }

  async findByWebhook(webhookId: string): Promise<readonly WebhookDeliveryRow[]> {
    const rows = await this.delegate.findMany({
      where: { webhookId },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookDeliveryPrismaMapper.toRow(r));
  }

  async findByStatus(status: string): Promise<readonly WebhookDeliveryRow[]> {
    const rows = await this.delegate.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
    });
    return rows.map((r) => WebhookDeliveryPrismaMapper.toRow(r));
  }

  async findRetryable(): Promise<readonly WebhookDeliveryRow[]> {
    const rows = await this.delegate.findMany({
      where: {
        status: { in: ['failed', 'retrying'] },
        nextRetryAt: { lte: new Date() },
      },
      orderBy: { nextRetryAt: 'asc' },
    });
    return rows.map((r) => WebhookDeliveryPrismaMapper.toRow(r));
  }

  async findRecent(limit: number): Promise<readonly WebhookDeliveryRow[]> {
    const rows = await this.delegate.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return rows.map((r) => WebhookDeliveryPrismaMapper.toRow(r));
  }

  async save(row: WebhookDeliveryRow): Promise<WebhookDeliveryRow> {
    const data = WebhookDeliveryPrismaMapper.toPersistence(row);
    const existing = await this.delegate.findUnique({
      where: { id: row.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: row.id },
        data: data as never,
      });
      return WebhookDeliveryPrismaMapper.toRow(updated);
    }

    const created = await this.delegate.create({ data: data as never });
    return WebhookDeliveryPrismaMapper.toRow(created);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async deleteByWebhook(webhookId: string): Promise<number> {
    const result = await this.delegate.deleteMany({ where: { webhookId } });
    return (result as { count: number }).count;
  }

  async countByStatus(webhookId: string, status: string): Promise<number> {
    return this.delegate.count({ where: { webhookId, status } });
  }
}

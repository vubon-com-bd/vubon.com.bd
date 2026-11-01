/**
 * DigestItemPrismaRepository — implements DigestItemRepository
 * @module notification-service/infrastructure/persistence/prisma/repositories
 *
 * ⚠️ DigestItem needs parent Notification data to reconstruct entity।
 * Uses `include` to join Notification in a single query.
 */
import { Injectable } from '@nestjs/common';

import type { DigestItemRepository } from '@domain/repositories/digest-item.repository.interface.js';
import { DIGEST_ITEM_REPOSITORY } from '@domain/repositories/digest-item.repository.interface.js';
import type { DigestItemEntity } from '@domain/entities/digest-item.entity.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';

import {
  NotificationBasePrismaRepository,
  type PrismaDelegate,
} from '@infrastructure/persistence/prisma/base.prisma.repository.js';
import type {
  PrismaNotificationDigestItem,
  PrismaNotification,
} from '@infrastructure/persistence/prisma/prisma.client.js';
import { DigestItemPrismaMapper } from '@infrastructure/persistence/prisma/mappers/digest-item.prisma.mapper.js';

const MODEL_NAME = 'notificationDigestItem';

interface DigestItemWithNotification extends PrismaNotificationDigestItem {
  readonly notification: PrismaNotification;
}

@Injectable()
export class DigestItemPrismaRepository
  extends NotificationBasePrismaRepository
  implements DigestItemRepository
{
  private get delegate(): PrismaDelegate<DigestItemWithNotification> {
    return this.model<DigestItemWithNotification>(MODEL_NAME);
  }

  async findById(id: string): Promise<DigestItemEntity | null> {
    const raw = await this.delegate.findUnique({
      where: { id },
    } as never);
    if (!raw || !raw.notification) return null;
    return DigestItemPrismaMapper.toDomain(raw, raw.notification);
  }

  async findByDigest(digestId: DigestIdVO | string): Promise<readonly DigestItemEntity[]> {
    const did = typeof digestId === 'string' ? digestId : digestId.value;
    const rows = await this.delegate.findMany({
      where: { digestId: did },
      orderBy: { sortOrder: 'asc' },
    } as never);
    return rows
      .filter((r): r is DigestItemWithNotification => Boolean(r.notification))
      .map((r) => DigestItemPrismaMapper.toDomain(r, r.notification));
  }

  async findByNotification(
    notificationId: NotificationIdVO | string,
  ): Promise<readonly DigestItemEntity[]> {
    const nid = typeof notificationId === 'string' ? notificationId : notificationId.value;
    const rows = await this.delegate.findMany({
      where: { notificationId: nid },
    } as never);
    return rows
      .filter((r): r is DigestItemWithNotification => Boolean(r.notification))
      .map((r) => DigestItemPrismaMapper.toDomain(r, r.notification));
  }

  async findByCategory(digestId: string, category: string): Promise<readonly DigestItemEntity[]> {
    const all = await this.findByDigest(digestId);
    return Object.freeze(all.filter((i) => i.item.category.value === category));
  }

  async findUrgent(digestId: string): Promise<readonly DigestItemEntity[]> {
    const all = await this.findByDigest(digestId);
    return Object.freeze(all.filter((i) => i.item.isUrgent()));
  }

  async findAll(): Promise<readonly DigestItemEntity[]> {
    const rows = await this.delegate.findMany({});
    return rows
      .filter((r): r is DigestItemWithNotification => Boolean(r.notification))
      .map((r) => DigestItemPrismaMapper.toDomain(r, r.notification));
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.delegate.count({ where: { id } });
    return count > 0;
  }

  async save(entity: DigestItemEntity): Promise<DigestItemEntity> {
    const data = DigestItemPrismaMapper.toPersistence(entity, 0);
    const existing = await this.delegate.findUnique({
      where: { id: entity.id },
      select: { id: true },
    });

    if (existing) {
      const updated = await this.delegate.update({
        where: { id: entity.id },
        data: data as never,
      } as never);
      if (!updated.notification) return entity;
      return DigestItemPrismaMapper.toDomain(updated, updated.notification);
    }

    const created = await this.delegate.create({ data: data as never } as never);
    if (!created.notification) return entity;
    return DigestItemPrismaMapper.toDomain(created, created.notification);
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }

  async countByDigest(digestId: string): Promise<number> {
    return this.delegate.count({ where: { digestId } });
  }

  async deleteByDigest(digestId: string): Promise<number> {
    const result = await this.delegate.deleteMany({ where: { digestId } });
    return (result as { count: number }).count;
  }

  static readonly _token = DIGEST_ITEM_REPOSITORY;
}

/**
 * DigestItemPrismaMapper — Prisma NotificationDigestItem ↔ DigestItemEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma stores only digestId + notificationId + sortOrder — the item
 * content (title, summary) is derived from the joined Notification row।
 * This mapper reconstructs a DigestItemEntity using the parent Notification।
 */
import type {
  PrismaNotificationDigestItem,
  PrismaNotification,
} from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIsoRequired } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { DigestItemEntity } from '@domain/entities/digest-item.entity.js';
import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

export class DigestItemPrismaMapper {
  /**
   * Reconstructs DigestItemEntity from `NotificationDigestItem` + parent `Notification`.
   * The Notification row provides title, body, category, priority।
   */
  static toDomain(
    raw: PrismaNotificationDigestItem,
    parentNotification: PrismaNotification,
  ): DigestItemEntity {
    const item = DigestItemVO.reconstitute({
      notificationId: NotificationIdVO.reconstitute(raw.notificationId),
      category: NotificationCategoryVO.reconstitute(parentNotification.category),
      priority: NotificationPriorityVO.reconstitute(parentNotification.priority),
      title: parentNotification.title,
      summary: parentNotification.body.slice(0, 200),
      actionUrl: parentNotification.actionUrl ?? undefined,
      occurredAt: toIsoRequired(parentNotification.createdAt),
    });

    return DigestItemEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.createdAt),
      props: {
        digestId: DigestIdVO.reconstitute(raw.digestId),
        item,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: DigestItemEntity, sortOrder: number): Record<string, unknown> {
    return {
      id: entity.id,
      digestId: entity.digestId.value,
      notificationId: entity.item.notificationId.value,
      sortOrder,
    };
  }
}

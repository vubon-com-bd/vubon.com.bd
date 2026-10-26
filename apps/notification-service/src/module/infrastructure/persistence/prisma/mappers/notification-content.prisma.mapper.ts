/**
 * NotificationContentPrismaMapper
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma Notification row → NotificationContentEntity।
 * (Content is embedded in the main Notification table — no separate table.)
 */
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIsoRequired, jsonRecord } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { NotificationContentEntity } from '@domain/entities/notification-content.entity.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';

export class NotificationContentPrismaMapper {
  static toDomain(raw: PrismaNotification): NotificationContentEntity {
    const content = NotificationContentVO.reconstitute({
      subject: NotificationSubjectVO.reconstitute(raw.title),
      body: NotificationBodyVO.reconstitute(raw.body),
      imageUrl: raw.imageUrl ? ActionUrlVO.reconstitute(raw.imageUrl) : undefined,
      iconUrl: raw.iconUrl ? ActionUrlVO.reconstitute(raw.iconUrl) : undefined,
      actionUrl: raw.actionUrl ? ActionUrlVO.reconstitute(raw.actionUrl) : undefined,
      data: NotificationDataVO.reconstitute(jsonRecord(raw.data)),
    });

    return NotificationContentEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      props: {
        notificationId: NotificationIdVO.reconstitute(raw.id),
        content,
      },
    });
  }
}

/**
 * NotificationRecipientPrismaMapper
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Prisma Notification.recipient (Json) → NotificationRecipientEntity।
 */
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import { toIso, toIsoRequired, jsonRecord } from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { NotificationRecipientEntity } from '@domain/entities/notification-recipient.entity.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';

interface RecipientJsonShape {
  readonly userId?: string;
  readonly channel?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
  readonly webhookUrl?: string;
}

export class NotificationRecipientPrismaMapper {
  static toDomain(raw: PrismaNotification): NotificationRecipientEntity | null {
    const json = jsonRecord(raw.recipient) as RecipientJsonShape;
    if (!json.userId) return null;

    const recipient = NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(json.userId),
      channel: NotificationChannelVO.reconstitute(json.channel ?? raw.channel),
      email: json.email ? EmailAddressVO.reconstitute(json.email) : undefined,
      phone: json.phone ? PhoneNumberVO.reconstitute(json.phone) : undefined,
      deviceToken: json.deviceToken ? DeviceTokenVO.reconstitute(json.deviceToken) : undefined,
      webhookUrl: json.webhookUrl ? WebhookUrlVO.reconstitute(json.webhookUrl) : undefined,
    });

    return NotificationRecipientEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      props: {
        notificationId: NotificationIdVO.reconstitute(raw.id),
        recipient,
        deliveryStatus: DeliveryStatusVO.reconstitute(raw.deliveryStatus ?? 'queued'),
        deliveredAt: toIso(raw.deliveredAt),
        readAt: toIso(raw.readAt),
        failureReason: raw.failureReason ?? undefined,
      },
    });
  }
}

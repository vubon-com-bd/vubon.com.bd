/**
 * NotificationPrismaMapper — Prisma row ↔ NotificationEntity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 *
 * Handles the most complex mapping in the service:
 *  - readStatus + readAt + archivedAt + snoozedUntil → read (NotificationReadMetadata)
 *  - deliveryStatus + provider* + failure* → delivery (NotificationDeliveryVO)
 *  - recipient (Json) → NotificationRecipientVO
 *  - actions (Json) → NotificationActionVO[]
 *  - data (Json) → NotificationDataVO
 *  - reference (Json) → NotificationReference
 */
import type { PrismaNotification } from '@infrastructure/persistence/prisma/prisma.client.js';
import {
  toIso,
  toIsoRequired,
  toNum,
  jsonRecord,
  toArray,
} from '@infrastructure/persistence/prisma/prisma-mapper.helpers.js';

import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationActionVO } from '@domain/composites/notification-action.vo.js';
import { NotificationDeliveryVO } from '@domain/composites/notification-delivery.vo.js';

import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';

interface RecipientJsonShape {
  readonly userId?: string;
  readonly channel?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly deviceToken?: string;
  readonly webhookUrl?: string;
}

interface ActionJsonShape {
  readonly id?: string;
  readonly type?: string;
  readonly label?: string;
  readonly url?: string;
  readonly payload?: Record<string, unknown>;
}

export class NotificationPrismaMapper {
  // ═══════════════ Prisma → Domain ═══════════════
  static toDomain(raw: PrismaNotification): NotificationEntity {
    const readMetadata = this.buildReadMetadata(raw);
    const recipients = this.buildRecipients(raw);

    const vo = NotificationVO.reconstitute({
      id: NotificationIdVO.reconstitute(raw.id),
      userId: UserIdVO.reconstitute(raw.userId),
      type: NotificationTypeVO.reconstitute(raw.type),
      category: NotificationCategoryVO.reconstitute(raw.category),
      channel: NotificationChannelVO.reconstitute(raw.channel),
      priority: NotificationPriorityVO.reconstitute(raw.priority),
      status: NotificationStatusVO.reconstitute(raw.status),
      subject: NotificationSubjectVO.reconstitute(raw.title),
      body: NotificationBodyVO.reconstitute(raw.body),
      data: NotificationDataVO.reconstitute(jsonRecord(raw.data)),
    });

    const content = NotificationContentVO.reconstitute({
      subject: NotificationSubjectVO.reconstitute(raw.title),
      body: NotificationBodyVO.reconstitute(raw.body),
      imageUrl: raw.imageUrl ? ActionUrlVO.reconstitute(raw.imageUrl) : undefined,
      iconUrl: raw.iconUrl ? ActionUrlVO.reconstitute(raw.iconUrl) : undefined,
      actionUrl: raw.actionUrl ? ActionUrlVO.reconstitute(raw.actionUrl) : undefined,
      data: NotificationDataVO.reconstitute(jsonRecord(raw.data)),
    });

    const actions = this.buildActions(raw.actions);

    return NotificationEntity.reconstitute({
      id: raw.id,
      createdAt: toIsoRequired(raw.createdAt),
      updatedAt: toIsoRequired(raw.updatedAt),
      deletedAt: toIso(raw.deletedAt) ?? null,
      version: raw.version,
      props: {
        vo,
        content,
        recipients,
        actions,
        delivery: this.buildDelivery(raw),
        attempts: [],
        scheduledAt: toIso(raw.scheduledAt),
        sentAt: toIso(raw.sentAt),
        deliveredAt: toIso(raw.deliveredAt),
        expiresAt: toIso(raw.expiresAt),
        cancelledAt: toIso(raw.cancelledAt),
        cancelledBy: undefined,
        cancelledReason: undefined,
      },
    });
  }

  // ═══════════════ Domain → Prisma ═══════════════
  static toPersistence(entity: NotificationEntity): Record<string, unknown> {
    const vo = entity.vo;
    const delivery = entity.delivery;
    const primaryRecipient = entity.recipients[0];

    return {
      id: entity.id,
      userId: vo.userId.value,
      type: vo.type.value,
      category: vo.category.value,
      channel: vo.channel.value,
      priority: vo.priority.value,
      status: vo.status.value,
      title: vo.subject.value,
      body: vo.body.value,
      imageUrl: entity.content.imageUrl?.value ?? null,
      iconUrl: entity.content.iconUrl?.value ?? null,
      actionUrl: entity.content.actionUrl?.value ?? null,
      actions: entity.actions.map((a) => ({
        id: a.id.value,
        type: a.type.value,
        label: a.label,
        url: a.url?.value,
        payload: a.payload,
      })),
      data: vo.data.value,
      recipient: primaryRecipient
        ? {
            userId: primaryRecipient.userId.value,
            channel: primaryRecipient.channel.value,
            email: primaryRecipient.email?.value,
            phone: primaryRecipient.phone?.value,
            deviceToken: primaryRecipient.deviceToken?.value,
            webhookUrl: primaryRecipient.webhookUrl?.value,
          }
        : null,
      deliveryStatus: delivery?.status.value ?? 'queued',
      deliveryAttempts: delivery?.attemptCount ?? 0,
      retryAttempts: delivery?.attemptCount ?? 0,
      provider: delivery?.providerName?.value ?? null,
      providerMessageId: delivery?.providerMessageId?.value ?? null,
      failureReason: null,
      failureCode: null,
      readStatus: 'unread',
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      scheduledAt: entity.scheduledAt ? new Date(entity.scheduledAt) : null,
      sentAt: entity.sentAt ? new Date(entity.sentAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      readAt: null,
      archivedAt: null,
      failedAt: null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      expiredAt: null,
      snoozedUntil: null,
      metadata: null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }

  // ═══════════════ Private builders ═══════════════
  private static buildReadMetadata(raw: PrismaNotification): {
    status: string;
    readAt?: string;
    archivedAt?: string;
    snoozedUntil?: string;
  } {
    return {
      status: raw.readStatus,
      readAt: toIso(raw.readAt),
      archivedAt: toIso(raw.archivedAt),
      snoozedUntil: toIso(raw.snoozedUntil),
    };
  }

  private static buildDelivery(raw: PrismaNotification): NotificationDeliveryVO | undefined {
    if (!raw.deliveryStatus && !raw.provider && !raw.providerMessageId) {
      return undefined;
    }
    return NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.reconstitute(raw.deliveryStatus ?? 'queued'),
      providerName: raw.provider ? ProviderNameVO.reconstitute(raw.provider) : undefined,
      providerMessageId: raw.providerMessageId
        ? ProviderMessageIdVO.reconstitute(raw.providerMessageId)
        : undefined,
      attemptCount: raw.deliveryAttempts ?? 0,
      maxAttempts: 3,
      sentAt: toIso(raw.sentAt),
      deliveredAt: toIso(raw.deliveredAt),
      failedAt: toIso(raw.failedAt),
    });
  }

  private static buildRecipients(raw: PrismaNotification): readonly NotificationRecipientVO[] {
    const recipientJson = jsonRecord(raw.recipient) as RecipientJsonShape;
    if (!recipientJson.userId) return Object.freeze([]);

    const channel = recipientJson.channel ?? raw.channel;
    const recipient = NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(recipientJson.userId),
      channel: NotificationChannelVO.reconstitute(channel),
      email: recipientJson.email ? EmailAddressVO.reconstitute(recipientJson.email) : undefined,
      phone: recipientJson.phone ? PhoneNumberVO.reconstitute(recipientJson.phone) : undefined,
      deviceToken: recipientJson.deviceToken
        ? DeviceTokenVO.reconstitute(recipientJson.deviceToken)
        : undefined,
      webhookUrl: recipientJson.webhookUrl
        ? WebhookUrlVO.reconstitute(recipientJson.webhookUrl)
        : undefined,
    });

    return Object.freeze([recipient]);
  }

  private static buildActions(rawActions: unknown): readonly NotificationActionVO[] {
    if (!rawActions) return Object.freeze([]);
    const list = Array.isArray(rawActions) ? rawActions : [];

    return Object.freeze(
      list
        .filter((a): a is ActionJsonShape => typeof a === 'object' && a !== null)
        .filter((a) => a.id && a.type && a.label)
        .map((a) =>
          NotificationActionVO.reconstitute({
            id: ActionIdVO.reconstitute(a.id!),
            type: ActionTypeVO.reconstitute(a.type!),
            label: a.label!,
            url: a.url ? ActionUrlVO.reconstitute(a.url) : undefined,
            payload: a.payload ?? undefined,
          }),
        ),
    );
  }

  // ═══════════════ Suppress unused ═══════════════
  static readonly _helpers = { toNum, toArray };
}

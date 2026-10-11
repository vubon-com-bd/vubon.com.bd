/**
 * NotificationPrismaMapper — row ↔ domain entity
 * @module notification-service/infrastructure/persistence/prisma/mappers
 */
import { NotificationEntity } from '../../../../domain/entities/notification.entity.js';
import { NotificationIdVO } from '../../../../domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../../domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../../../../domain/value-objects/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../../../../domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../domain/value-objects/primitives/notification-body.vo.js';
import { NotificationDataVO } from '../../../../domain/value-objects/primitives/notification-data.vo.js';
import { DeliveryStatusVO } from '../../../../domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryFailureReasonVO } from '../../../../domain/value-objects/primitives/delivery-failure-reason.vo.js';
import { ReadStatusVO } from '../../../../domain/value-objects/primitives/read-status.vo.js';
import { UserIdVO } from '../../../../domain/value-objects/primitives/user-id.vo.js';
import { EmailAddressVO } from '../../../../domain/value-objects/primitives/email-address.vo.js';
import { PhoneNumberVO } from '../../../../domain/value-objects/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '../../../../domain/value-objects/primitives/device-token.vo.js';
import { NotificationContentVO } from '../../../../domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationActionsVO } from '../../../../domain/value-objects/composites/notification-actions.vo.js';
import { NotificationActionEntryVO } from '../../../../domain/value-objects/composites/notification-action-entry.vo.js';
import { NotificationActionVO } from '../../../../domain/value-objects/primitives/notification-action.vo.js';
import { NotificationActionTypeVO } from '../../../../domain/value-objects/primitives/notification-action-type.vo.js';
import { ActionUrlVO } from '../../../../domain/value-objects/primitives/action-url.vo.js';
import { NotificationReferenceVO } from '../../../../domain/value-objects/composites/notification-reference.vo.js';

export interface PrismaNotificationRow {
  id: string;
  userId: string;
  type: string;
  category: string;
  channel: string;
  priority: string;
  status: string;
  title: string;
  body: string;
  imageUrl: string | null;
  iconUrl: string | null;
  actionUrl: string | null;
  actions: unknown;
  data: unknown;
  reference: unknown;
  recipient: unknown;
  deliveryStatus: string;
  deliveryAttempts: number;
  retryAttempts: number;
  provider: string | null;
  providerMessageId: string | null;
  failureReason: string | null;
  failureCode: string | null;
  readStatus: string;
  expiresAt: Date | null;
  scheduledAt: Date | null;
  sentAt: Date | null;
  deliveredAt: Date | null;
  readAt: Date | null;
  archivedAt: Date | null;
  failedAt: Date | null;
  cancelledAt: Date | null;
  expiredAt: Date | null;
  snoozedUntil: Date | null;
  metadata: unknown;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

const toIso = (d: Date | null | undefined): string | undefined =>
  d ? new Date(d).toISOString() : undefined;

const asRecord = (v: unknown): Readonly<Record<string, unknown>> | undefined => {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return undefined;
  return v as Readonly<Record<string, unknown>>;
};

export class NotificationPrismaMapper {
  static toDomain(raw: PrismaNotificationRow): NotificationEntity {
    const recipient = asRecord(raw.recipient) ?? {};
    const channelVO = NotificationChannelVO.reconstitute(raw.channel);

    const recipientVO = NotificationRecipientVO.reconstitute({
      userId: UserIdVO.reconstitute(raw.userId),
      channel: channelVO,
      email: recipient['email'] ? EmailAddressVO.reconstitute(String(recipient['email'])) : undefined,
      phone: recipient['phone'] ? PhoneNumberVO.reconstitute(String(recipient['phone'])) : undefined,
      deviceToken: recipient['deviceToken']
        ? DeviceTokenVO.reconstitute(String(recipient['deviceToken']))
        : undefined,
    });

    const actionsRaw = Array.isArray(raw.actions) ? raw.actions : [];
    const actions =
      actionsRaw.length > 0
        ? NotificationActionsVO.create(
            actionsRaw.map((a) => {
              const item = a as Record<string, unknown>;
              return NotificationActionEntryVO.create({
                action: NotificationActionVO.reconstitute(String(item['action'] ?? 'view')),
                type: NotificationActionTypeVO.reconstitute(String(item['type'] ?? 'primary')),
                label: String(item['label'] ?? ''),
                url: item['url'] ? ActionUrlVO.reconstitute(String(item['url'])) : undefined,
                payload: asRecord(item['payload']),
              });
            }),
          )
        : undefined;

    const refRaw = asRecord(raw.reference);
    const reference = refRaw
      ? NotificationReferenceVO.reconstitute({
          type: String(refRaw['type']),
          id: String(refRaw['id']),
          url: refRaw['url'] ? String(refRaw['url']) : undefined,
        })
      : undefined;

    return NotificationEntity.reconstitute({
      id: raw.id,
      createdAt: new Date(raw.createdAt).toISOString(),
      updatedAt: new Date(raw.updatedAt).toISOString(),
      deletedAt: raw.deletedAt ? new Date(raw.deletedAt).toISOString() : null,
      version: raw.version,
      props: {
        type: NotificationTypeVO.reconstitute(raw.type),
        category: NotificationCategoryVO.reconstitute(raw.category),
        channel: channelVO,
        status: NotificationStatusVO.reconstitute(raw.status),
        priority: NotificationPriorityVO.reconstitute(raw.priority),
        content: NotificationContentVO.reconstitute({
          title: NotificationTitleVO.reconstitute(raw.title),
          body: NotificationBodyVO.reconstitute(raw.body),
          data: raw.data ? NotificationDataVO.reconstitute(asRecord(raw.data) ?? {}) : undefined,
        }),
        recipient: recipientVO,
        actions,
        reference,
        imageUrl: raw.imageUrl ?? undefined,
        iconUrl: raw.iconUrl ?? undefined,
        data: asRecord(raw.data),
        scheduledAt: toIso(raw.scheduledAt),
        expiresAt: toIso(raw.expiresAt),
        deliveryStatus: DeliveryStatusVO.reconstitute(raw.deliveryStatus),
        provider: raw.provider ?? undefined,
        providerMessageId: raw.providerMessageId ?? undefined,
        failureReason: raw.failureReason
          ? DeliveryFailureReasonVO.reconstitute(raw.failureReason)
          : undefined,
        deliveryAttempts: raw.deliveryAttempts,
        readStatus: ReadStatusVO.reconstitute(raw.readStatus),
        readAt: toIso(raw.readAt),
        sentAt: toIso(raw.sentAt),
        deliveredAt: toIso(raw.deliveredAt),
        failedAt: toIso(raw.failedAt),
        cancelledAt: toIso(raw.cancelledAt),
        expiredAt: toIso(raw.expiredAt),
        archivedAt: toIso(raw.archivedAt),
        retryAttempts: raw.retryAttempts,
        metadata: asRecord(raw.metadata),
      },
    });
  }

  static toPersistence(entity: NotificationEntity): Record<string, unknown> {
    const recipient = {
      userId: entity.recipient.userId.value,
      email: entity.recipient.email?.value,
      phone: entity.recipient.phone?.value,
      deviceToken: entity.recipient.deviceToken?.value,
    };
    const actions = entity.actions
      ? entity.actions.actions.map((a) => ({
          action: a.action.value,
          type: a.type.value,
          label: a.label,
          url: a.url?.value,
          payload: a.payload,
        }))
      : null;
    const reference = entity.reference
      ? { type: entity.reference.type, id: entity.reference.id, url: entity.reference.url }
      : null;

    return {
      id: entity.id,
      userId: entity.userId.value,
      type: entity.type.value,
      category: entity.category.value,
      channel: entity.channel.value,
      priority: entity.priority.value,
      status: entity.status.value,
      title: entity.content.title.value,
      body: entity.content.body.value,
      imageUrl: entity.imageUrl ?? null,
      iconUrl: entity.iconUrl ?? null,
      actionUrl: entity.reference?.url ?? null,
      actions,
      data: entity.data ?? null,
      reference,
      recipient,
      deliveryStatus: entity.deliveryStatus.value,
      deliveryAttempts: entity.deliveryAttempts,
      retryAttempts: entity.retryAttempts,
      provider: entity.provider ?? null,
      providerMessageId: entity.providerMessageId ?? null,
      failureReason: entity.failureReason?.value ?? null,
      failureCode: null,
      readStatus: entity.readStatus.value,
      expiresAt: entity.expiresAt ? new Date(entity.expiresAt) : null,
      scheduledAt: entity.scheduledAt ? new Date(entity.scheduledAt) : null,
      sentAt: entity.sentAt ? new Date(entity.sentAt) : null,
      deliveredAt: entity.deliveredAt ? new Date(entity.deliveredAt) : null,
      readAt: entity.readAt ? new Date(entity.readAt) : null,
      archivedAt: entity.archivedAt ? new Date(entity.archivedAt) : null,
      failedAt: entity.failedAt ? new Date(entity.failedAt) : null,
      cancelledAt: entity.cancelledAt ? new Date(entity.cancelledAt) : null,
      expiredAt: entity.expiredAt ? new Date(entity.expiredAt) : null,
      snoozedUntil: null,
      metadata: entity.metadata ?? null,
      version: entity.version,
      updatedAt: new Date(entity.updatedAt),
    };
  }
}

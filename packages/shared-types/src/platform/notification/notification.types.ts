/**
 * Notification Core Types
 * @module shared-types/platform/notification
 *
 * Notification entity + aggregator।
 */

import type { UserId, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';
import type { NotificationTypeValue } from './notification-type.types';
import type { NotificationChannelValue } from './notification-channel.types';
import type { NotificationStatusValue } from './notification-status.types';
import type { NotificationPriorityValue } from './notification-priority.types';
import type { NotificationCategoryValue } from './notification-category.types';
import type { NotificationDeliveryMetadata } from './notification-delivery-status.types';
import type { NotificationReadMetadata } from './notification-read-status.types';
import type { NotificationAction } from './notification-action.types';

export interface Notification extends BaseEntity<string> {
  readonly userId: UserId;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channel: NotificationChannelValue;
  readonly priority: NotificationPriorityValue;
  readonly status: NotificationStatusValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: Url;
  readonly iconUrl?: Url;
  readonly actionUrl?: Url;
  readonly actions?: readonly NotificationAction[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly delivery?: NotificationDeliveryMetadata;
  readonly read?: NotificationReadMetadata;
  readonly scheduledAt?: string;
  readonly sentAt?: string;
  readonly expiresAt?: string;
  readonly reference?: NotificationReference;
}

export interface NotificationReference {
  readonly type: string;
  readonly id: string;
  readonly url?: string;
}

export interface NotificationPublic {
  readonly id: string;
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channel: NotificationChannelValue;
  readonly priority: NotificationPriorityValue;
  readonly status: NotificationStatusValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: Url;
  readonly actionUrl?: Url;
  readonly actions?: readonly NotificationAction[];
  readonly createdAt: string;
  readonly read?: NotificationReadMetadata;
}

export interface NotificationSummary {
  readonly id: string;
  readonly title: string;
  readonly type: NotificationTypeValue;
  readonly channel: NotificationChannelValue;
  readonly status: NotificationStatusValue;
  readonly createdAt: string;
  readonly isRead: boolean;
}

export interface NotificationSendInput {
  readonly userId: UserId | readonly UserId[];
  readonly type: NotificationTypeValue;
  readonly category: NotificationCategoryValue;
  readonly channels: readonly NotificationChannelValue[];
  readonly priority?: NotificationPriorityValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actionUrl?: string;
  readonly actions?: readonly NotificationAction[];
  readonly data?: Readonly<Record<string, unknown>>;
  readonly scheduledAt?: string;
}

export interface NotificationSendResult {
  readonly success: boolean;
  readonly notificationIds?: readonly string[];
  readonly failureCount?: number;
  readonly error?: string;
}

export interface NotificationListFilter {
  readonly userId?: UserId;
  readonly type?: NotificationTypeValue;
  readonly category?: NotificationCategoryValue;
  readonly channel?: NotificationChannelValue;
  readonly status?: NotificationStatusValue;
  readonly priority?: NotificationPriorityValue;
  readonly isRead?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
}

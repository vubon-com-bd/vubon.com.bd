/**
 * Notification Digest Types
 * @module shared-types/platform/notification
 */

import type {
  NOTIFICATION_DIGEST_FREQUENCY,
  NOTIFICATION_DIGEST_TYPE,
  NOTIFICATION_DIGEST_STATUS,
} from '@vubon/shared-constants/platform';

export type NotificationDigestFrequencyValue =
  (typeof NOTIFICATION_DIGEST_FREQUENCY)[keyof typeof NOTIFICATION_DIGEST_FREQUENCY];

export type NotificationDigestTypeValue =
  (typeof NOTIFICATION_DIGEST_TYPE)[keyof typeof NOTIFICATION_DIGEST_TYPE];

export type NotificationDigestStatusValue =
  (typeof NOTIFICATION_DIGEST_STATUS)[keyof typeof NOTIFICATION_DIGEST_STATUS];

export interface NotificationDigest {
  readonly id: string;
  readonly userId: string;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly type: NotificationDigestTypeValue;
  readonly status: NotificationDigestStatusValue;
  readonly categories: readonly string[];
  readonly sendHour: number;
  readonly timezone: string;
  readonly itemCount: number;
  readonly generatedAt?: string;
  readonly sentAt?: string;
  readonly lastDeliveredAt?: string;
}

export interface DigestPreference {
  readonly userId: string;
  readonly enabled: boolean;
  readonly frequency: NotificationDigestFrequencyValue;
  readonly categories: readonly string[];
  readonly sendHour: number;
  readonly timezone: string;
}

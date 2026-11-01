/**
 * Notification Category Value Types
 * @module shared-types/platform/notification
 */

import type { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform';

export type NotificationCategoryValue =
  (typeof NOTIFICATION_CATEGORY)[keyof typeof NOTIFICATION_CATEGORY];

export interface NotificationCategoryMetadata {
  readonly value: NotificationCategoryValue;
  readonly label: string;
  readonly isSystemCategory: boolean;
}

/**
 * Notification Type Value Types
 * @module shared-types/platform/notification
 */

import type { NOTIFICATION_TYPE } from '@vubon/shared-constants/platform';

export type NotificationTypeValue = (typeof NOTIFICATION_TYPE)[keyof typeof NOTIFICATION_TYPE];

export interface NotificationTypeMetadata {
  readonly value: NotificationTypeValue;
  readonly label: string;
  readonly isTransactional: boolean;
  readonly isPromotional: boolean;
  readonly canOptOut: boolean;
}

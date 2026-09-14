/**
 * In-App Notification Types
 * @module shared-types/platform/notification
 */

import type { IN_APP_TYPE, IN_APP_POSITION, IN_APP_STATUS } from '@vubon/shared-constants/platform';

export type InAppTypeValue = (typeof IN_APP_TYPE)[keyof typeof IN_APP_TYPE];

export type InAppPositionValue = (typeof IN_APP_POSITION)[keyof typeof IN_APP_POSITION];

export type InAppStatusValue = (typeof IN_APP_STATUS)[keyof typeof IN_APP_STATUS];

export interface InAppNotification {
  readonly id: string;
  readonly userId: string;
  readonly type: InAppTypeValue;
  readonly position?: InAppPositionValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly actions?: readonly InAppAction[];
  readonly status: InAppStatusValue;
  readonly displayDurationSeconds?: number;
  readonly autoDismiss: boolean;
  readonly readAt?: string;
  readonly dismissedAt?: string;
  readonly clickedAt?: string;
  readonly createdAt: string;
  readonly expiresAt?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export interface InAppAction {
  readonly id: string;
  readonly label: string;
  readonly url?: string;
  readonly action?: string;
}

export interface InAppSendInput {
  readonly userId: string;
  readonly type: InAppTypeValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly actions?: readonly InAppAction[];
}

export interface InAppInbox {
  readonly userId: string;
  readonly unreadCount: number;
  readonly totalCount: number;
  readonly notifications: readonly InAppNotification[];
}

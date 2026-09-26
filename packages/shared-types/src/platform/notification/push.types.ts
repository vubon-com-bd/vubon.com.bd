/**
 * Push Notification Types
 * @module shared-types/platform/notification
 */

import type {
  PUSH_PROVIDER,
  PUSH_PLATFORM,
  PUSH_STATUS,
  PUSH_PRIORITY,
} from '@vubon/shared-constants/platform';

export type PushProviderValue = (typeof PUSH_PROVIDER)[keyof typeof PUSH_PROVIDER];

export type PushPlatformValue = (typeof PUSH_PLATFORM)[keyof typeof PUSH_PLATFORM];

export type PushStatusValue = (typeof PUSH_STATUS)[keyof typeof PUSH_STATUS];

export type PushPriorityValue = (typeof PUSH_PRIORITY)[keyof typeof PUSH_PRIORITY];

export interface PushMessage {
  readonly id: string;
  readonly token: string;
  readonly platform: PushPlatformValue;
  readonly provider?: PushProviderValue;
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly actions?: readonly PushAction[];
  readonly priority: PushPriorityValue;
  readonly silent: boolean;
  readonly status: PushStatusValue;
  readonly ttl?: number;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly failureReason?: string;
}

export interface PushAction {
  readonly id: string;
  readonly title: string;
  readonly icon?: string;
}

export interface PushSendInput {
  readonly tokens: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly priority?: PushPriorityValue;
  readonly silent?: boolean;
}

export interface PushSendResult {
  readonly success: boolean;
  readonly messageId?: string;
  readonly successCount: number;
  readonly failureCount: number;
  readonly error?: string;
}

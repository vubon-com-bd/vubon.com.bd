/**
 * Push Notification Request DTOs
 * @module notification-service/application/dtos/requests/push
 */
import type {
  PushPlatformValue,
  PushPriorityValue,
  PushProviderValue,
} from '@vubon/shared-types/platform/notification';

export interface PushActionInputDTO {
  readonly id: string;
  readonly title: string;
  readonly icon?: string;
}

export interface SendPushRequestDTO {
  readonly userIds?: readonly string[];
  readonly tokens?: readonly string[];
  readonly title: string;
  readonly body: string;
  readonly imageUrl?: string;
  readonly iconUrl?: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly actions?: readonly PushActionInputDTO[];
  readonly priority?: PushPriorityValue;
  readonly silent?: boolean;
  readonly ttl?: number;
  readonly provider?: PushProviderValue;
  readonly platform?: PushPlatformValue;
  readonly idempotencyKey?: string;
}

export interface SendPushToTopicRequestDTO {
  readonly topic: string;
  readonly title: string;
  readonly body: string;
  readonly data?: Readonly<Record<string, unknown>>;
  readonly priority?: PushPriorityValue;
}

export interface RegisterPushSubscriptionRequestDTO {
  readonly userId: string;
  readonly token: string;
  readonly platform: PushPlatformValue;
  readonly deviceId?: string;
  readonly appVersion?: string;
  readonly osVersion?: string;
}

export interface GetPushRequestDTO {
  readonly pushId: string;
}

export interface ListPushRequestDTO {
  readonly filter?: {
    readonly userId?: string;
    readonly platform?: string;
    readonly status?: string;
    readonly fromDate?: string;
    readonly toDate?: string;
  };
  readonly page: number;
  readonly limit: number;
}

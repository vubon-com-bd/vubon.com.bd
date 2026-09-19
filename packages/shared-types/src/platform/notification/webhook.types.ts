/**
 * Webhook Types
 * @module shared-types/platform/notification
 */

import type {
  WEBHOOK_METHOD,
  WEBHOOK_STATUS,
  WEBHOOK_DELIVERY_STATUS,
  WEBHOOK_EVENT,
} from '@vubon/shared-constants/platform';
import type { Url } from '../../common/primitives';

export type WebhookMethodValue = (typeof WEBHOOK_METHOD)[keyof typeof WEBHOOK_METHOD];

export type WebhookStatusValue = (typeof WEBHOOK_STATUS)[keyof typeof WEBHOOK_STATUS];

export type WebhookDeliveryStatusValue =
  (typeof WEBHOOK_DELIVERY_STATUS)[keyof typeof WEBHOOK_DELIVERY_STATUS];

export type WebhookEventValue = (typeof WEBHOOK_EVENT)[keyof typeof WEBHOOK_EVENT];

export interface Webhook {
  readonly id: string;
  readonly name: string;
  readonly url: Url;
  readonly method: WebhookMethodValue;
  readonly events: readonly WebhookEventValue[];
  readonly status: WebhookStatusValue;
  readonly headers?: Readonly<Record<string, string>>;
  readonly secret?: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastTriggeredAt?: string;
}

export interface WebhookDelivery {
  readonly id: string;
  readonly webhookId: string;
  readonly event: WebhookEventValue;
  readonly status: WebhookDeliveryStatusValue;
  readonly requestBody: Readonly<Record<string, unknown>>;
  readonly responseStatus?: number;
  readonly responseBody?: string;
  readonly durationMs?: number;
  readonly attemptCount: number;
  readonly nextRetryAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
  readonly createdAt: string;
}

export interface WebhookTriggerInput {
  readonly event: WebhookEventValue;
  readonly payload: Readonly<Record<string, unknown>>;
  readonly webhookIds?: readonly string[];
}

export interface WebhookTriggerResult {
  readonly success: boolean;
  readonly deliveryIds: readonly string[];
  readonly error?: string;
}

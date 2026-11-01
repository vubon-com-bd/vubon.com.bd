/**
 * CanSendWebhookSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a webhook can fire for a given event।
 * Checks: status, subscription, payload size, rate limit।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { WEBHOOK } from '@vubon/shared-constants/platform';
import type { WebhookEntity } from '@domain/entities/webhook.entity.js';

export interface CanSendWebhookContext {
  readonly event: string;
  readonly payloadSizeBytes?: number;
  readonly failedAttempts24h?: number;
}

export interface CanSendWebhookCandidate {
  readonly webhook: WebhookEntity;
  readonly ctx: CanSendWebhookContext;
}

const MAX_FAILED_ATTEMPTS = 5;

export class CanSendWebhookSpecification extends Specification<CanSendWebhookCandidate> {
  isSatisfiedBy(c: CanSendWebhookCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanSendWebhookCandidate): string | null {
    if (!c.webhook.canDeliver()) {
      return `webhook status "${c.webhook.status.value}" cannot deliver`;
    }

    if (!c.webhook.subscribes(c.ctx.event)) {
      return `webhook does not subscribe to event "${c.ctx.event}"`;
    }

    if (
      c.ctx.payloadSizeBytes !== undefined &&
      c.ctx.payloadSizeBytes > WEBHOOK.MAX_PAYLOAD_SIZE_KB * 1024
    ) {
      return `payload size ${c.ctx.payloadSizeBytes}B exceeds ${WEBHOOK.MAX_PAYLOAD_SIZE_KB}KB`;
    }

    if (
      c.ctx.failedAttempts24h !== undefined &&
      c.ctx.failedAttempts24h >= MAX_FAILED_ATTEMPTS
    ) {
      return `webhook has ${c.ctx.failedAttempts24h} failed attempts in last 24h (circuit open)`;
    }

    return null;
  }

  static strict(): CanSendWebhookSpecification {
    return new CanSendWebhookSpecification();
  }
}

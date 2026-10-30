/**
 * WebhookDispatcherService — bridges domain events → external webhook subscribers
 *
 * Event name mapping: internal event bus names → user-facing webhook enum
 */

import { Injectable, Inject, Logger, OnModuleInit, Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import {
  WEBHOOK_REPOSITORY,
  type WebhookRepository,
} from '@domain/repositories/webhook.repository.interface.js';
import { WebhookQueue } from '@infrastructure/queues/webhook.queue.js';

export const WEBHOOK_DISPATCHER = Symbol('WEBHOOK_DISPATCHER');

// Event bus internal name → user-facing webhook subscription name
const EVENT_MAP: Readonly<Record<string, readonly string[]>> = {
  'order.order.created': ['order.created'],
  'order.order.updated': ['order.updated'],
  'order.order.status_changed': ['order.updated'],
  'order.order.cancelled': ['order.cancelled'],
  'order.order.delivered': ['order.delivered'],
  'payment.payment.completed': ['payment.succeeded'],
  'payment.payment.failed': ['payment.failed'],
  'payment.payment.refunded': ['payment.refunded'],
  'user.created': ['user.created'],
  'user.updated': ['user.updated'],
  'user.deleted': ['user.deleted'],
  'product.product.created': ['product.created'],
  'product.product.updated': ['product.updated'],
  'product.product.deleted': ['product.deleted'],
  'vendor.vendor.approved': ['vendor.approved'],
  'vendor.vendor.rejected': ['vendor.rejected'],
};

@Injectable()
export class WebhookDispatcherService implements OnModuleInit {
  private readonly logger = new Logger(WebhookDispatcherService.name);

  constructor(
    @Inject(WEBHOOK_REPOSITORY)
    private readonly webhookRepo: WebhookRepository,
    private readonly eventBus: EventBusService,
    @Optional()
    private readonly webhookQueue?: WebhookQueue,
  ) {}

  onModuleInit(): void {
    if (!this.webhookQueue) {
      this.logger.warn('WebhookQueue not available — webhook dispatch disabled');
      return;
    }
    for (const internalEvent of Object.keys(EVENT_MAP)) {
      this.eventBus.registerHandler(internalEvent, async (event) => {
        await this.dispatch(internalEvent, event);
      });
    }
    this.logger.log(`📡 WebhookDispatcher subscribed to ${Object.keys(EVENT_MAP).length} internal events`);
  }

  private async dispatch(internalEvent: string, event: unknown): Promise<void> {
    this.logger.debug(`[DISPATCH] ${internalEvent}`);
    try {
      const externalEvents = EVENT_MAP[internalEvent] ?? [];
      if (externalEvents.length === 0) return;

      const payload = (event as { payload?: Record<string, unknown> }).payload ?? (event as Record<string, unknown>);
      const eventId = (event as { id?: string }).id ?? randomUUID();
      const occurredAt = (event as { occurredAt?: string }).occurredAt ?? new Date().toISOString();

      for (const externalEvent of externalEvents) {
        let subscribers: readonly { id: string }[] = [];
        try {
          subscribers = (await this.webhookRepo.findActiveSubscribers(externalEvent)) as unknown as readonly { id: string }[];
        } catch (err) {
          this.logger.warn(`findActiveSubscribers(${externalEvent}) failed: ${err instanceof Error ? err.message : 'unknown'}`);
          continue;
        }

        this.logger.debug(`[DISPATCH] ${externalEvent}: ${subscribers.length} subscribers`);
        if (subscribers.length === 0) continue;

        for (const webhook of subscribers) {
          const deliveryId = randomUUID();
          try {
            await this.webhookQueue!.enqueueDeliver({
              webhookId: webhook.id,
              deliveryId,
              event: externalEvent,
              payload: {
                eventType: externalEvent,
                eventId,
                occurredAt,
                data: payload,
              },
            });
            this.logger.log(`📤 Webhook ${webhook.id} queued → ${externalEvent} (delivery=${deliveryId})`);
          } catch (err) {
            this.logger.warn(`Webhook ${webhook.id} enqueue failed: ${err instanceof Error ? err.message : 'unknown'}`);
          }
        }
      }
    } catch (err) {
      this.logger.error(`Webhook dispatch error for ${internalEvent}: ${err instanceof Error ? err.message : 'unknown'}`);
    }
  }
}

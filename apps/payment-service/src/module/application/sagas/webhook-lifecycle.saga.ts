/**
 * WebhookLifecycleSaga — observes webhook events
 * @module payment-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  WebhookReceivedEvent,
  WebhookFailedEvent,
  WebhookDuplicateEvent,
} from '../../domain/events/webhook.events.js';

@Injectable()
export class WebhookLifecycleSaga {
  private readonly logger = new Logger(WebhookLifecycleSaga.name);

  @Saga()
  onWebhookReceived = (events$: Observable<unknown>): Observable<never> => {
    return events$.pipe(
      ofType(WebhookReceivedEvent),
      tap((e: WebhookReceivedEvent) => {
        this.logger.debug(
          `Webhook received from ${e.payload.gateway}: ${e.payload.eventType} (${e.payload.gatewayEventId})`,
        );
      }),
      // No outbound command; just observe
      tap({ next: () => undefined }),
    ) as Observable<never>;
  };

  @Saga()
  onWebhookFailed = (events$: Observable<unknown>): Observable<never> => {
    return events$.pipe(
      ofType(WebhookFailedEvent),
      tap((e: WebhookFailedEvent) => {
        this.logger.warn(
          `Webhook failed from ${e.payload.gateway} — attempt ${e.payload.attempts}: ${e.payload.reason}`,
        );
      }),
      tap({ next: () => undefined }),
    ) as Observable<never>;
  };

  @Saga()
  onWebhookDuplicate = (events$: Observable<unknown>): Observable<never> => {
    return events$.pipe(
      ofType(WebhookDuplicateEvent),
      tap((e: WebhookDuplicateEvent) => {
        this.logger.debug(
          `Duplicate webhook from ${e.payload.gateway}: ${e.payload.gatewayEventId}`,
        );
      }),
      tap({ next: () => undefined }),
    ) as Observable<never>;
  };
}

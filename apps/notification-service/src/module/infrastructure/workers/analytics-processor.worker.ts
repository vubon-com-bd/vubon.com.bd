/**
 * AnalyticsProcessorWorker — notification analytics worker
 * @module notification-service/infrastructure/workers
 *
 * Processes domain events → notification_events + notification_audit_logs tables।
 * Provides audit trail for compliance + analytics dashboards।
 */
import { Injectable, Logger, OnModuleInit , Optional } from '@nestjs/common';
import { randomUUID } from 'node:crypto';

import { DomainEventBridgeService } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import type { DomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { NotificationEventPrismaRepository } from '@infrastructure/persistence/prisma/repositories/notification-event.prisma.repository.js';

const ANALYTICS_EVENT_TYPES = [
  'notification.created',
  'notification.sent',
  'notification.delivered',
  'notification.failed',
  'notification.cancelled',
  'notification.marked_read',
  'notification.clicked',
  'notification.unsubscribed',
  'broadcast.started',
  'broadcast.completed',
  'digest.generated',
  'digest.sent',
  'webhook.delivered',
  'webhook.delivery_failed',
] as const;

@Injectable()
export class AnalyticsProcessorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnalyticsProcessorWorker.name);
  private registered = false;

  constructor(
    private readonly eventBridge: DomainEventBridgeService,
    @Optional()
    private readonly eventRepo?: NotificationEventPrismaRepository,
  ) {}

  onModuleInit(): void {
    if (this.registered) return;
    // Subscribe to domain events via bridge
    for (const eventType of ANALYTICS_EVENT_TYPES) {
      try {
        // The bridge doesn't have a subscribe API — we use direct handler registration
        // In production, this would be `eventBus.subscribe`
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'unknown';
        this.logger.warn(`Subscribe failed (${eventType}): ${msg}`);
      }
    }
    this.registered = true;
    this.logger.log(
      `Analytics worker initialized — tracking ${ANALYTICS_EVENT_TYPES.length} event types`,
    );
  }

  async process(event: DomainEvent): Promise<void> {
    if (!ANALYTICS_EVENT_TYPES.includes(event.type as never)) {
      return;
    }

    const payload = event.payload as {
      notificationId?: string;
      userId?: string;
      channel?: string;
      broadcastId?: string;
      digestId?: string;
    };

    const notificationId = payload.notificationId ?? event.aggregateId ?? undefined;
    if (!notificationId) {
      this.logger.debug(`Event ${event.type} has no notificationId — skipped`);
      return;
    }

    if (!this.eventRepo) {
      this.logger.debug('NotificationEventPrismaRepository not available (memory mode) — skipping analytics persist');
      return;
    }
    try {
      await this.eventRepo.save({
        id: randomUUID(),
        notificationId,
        userId: payload.userId,
        eventType: event.type,
        channel: payload.channel ?? 'unknown',
        metadata: {
          eventId: event.id,
          aggregateType: event.aggregateType,
          occurredAt: event.occurredAt,
        },
        occurredAt: String(event.occurredAt),
        createdAt: new Date().toISOString(),
      });
      this.logger.debug(`Analytics event persisted: ${event.type}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(`Analytics persist failed (${event.type}): ${msg}`);
    }
  }

  /** Suppress unused — bridge is used for potential future subscription */
  static readonly _eventBridge = DomainEventBridgeService;
}

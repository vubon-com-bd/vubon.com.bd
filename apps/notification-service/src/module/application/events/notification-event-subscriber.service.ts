/**
 * NotificationEventSubscriberService
 * @module notification-service/application/events
 *
 * Registers this service with EventBusService for fan-out event consumption.
 * Queue: domain-events-notification
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

const SERVICE_NAME = 'notification';

@Injectable()
export class NotificationEventSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(NotificationEventSubscriberService.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.setServiceName(SERVICE_NAME);
    this.logger.log(`🎧 Notification event subscriber initialized for "${SERVICE_NAME}"`);
    this.logger.log(`   Queue: domain-events-${SERVICE_NAME}`);
  }
}

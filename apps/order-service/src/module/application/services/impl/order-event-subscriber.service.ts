/**
 * OrderEventSubscriberService
 * @module order-service/application/services/impl
 *
 * Bootstraps cross-service event subscription for Order Service.
 *
 * Lifecycle:
 *   1. onModuleInit → set service name → EventBus worker uses "domain-events-order"
 *   2. Individual handlers register themselves via their own onModuleInit
 *      (CartCheckedOutHandler, PaymentCompletedHandler, PaymentFailedHandler)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

const SERVICE_NAME = 'order';

@Injectable()
export class OrderEventSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(OrderEventSubscriberService.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.setServiceName(SERVICE_NAME);
    this.logger.log(`🎧 Order event subscriber initialized for "${SERVICE_NAME}"`);
    this.logger.log(`   Queue: domain-events-${SERVICE_NAME}`);
  }
}

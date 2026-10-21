/**
 * PaymentEventSubscriberService
 * @module payment-service/application/events
 *
 * Bootstraps cross-service event subscription for Payment Service.
 *
 * Lifecycle:
 *   1. onModuleInit → set service name → EventBus worker uses "domain-events-payment"
 *   2. Individual handlers register themselves via their own onModuleInit
 *      (OrderCreatedHandler, OrderCancelledHandler, etc.)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

const SERVICE_NAME = 'payment';

@Injectable()
export class PaymentEventSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(PaymentEventSubscriberService.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.setServiceName(SERVICE_NAME);
    this.logger.log(`🎧 Payment event subscriber initialized for "${SERVICE_NAME}"`);
    this.logger.log(`   Queue: domain-events-${SERVICE_NAME}`);
  }
}

/**
 * CartEventSubscriberService
 * @module cart-service/application/services/impl
 *
 * Bootstraps cross-service event subscription for Cart Service.
 *
 * Lifecycle:
 *   1. onModuleInit → set service name → EventBus worker uses "domain-events-cart"
 *   2. Individual handlers register themselves via their own onModuleInit
 *      (ProductUpdatedHandler, UserDeletedHandler, etc.)
 */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

const SERVICE_NAME = 'cart';

@Injectable()
export class CartEventSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(CartEventSubscriberService.name);

  constructor(private readonly eventBus: EventBusService) {}

  onModuleInit(): void {
    this.eventBus.setServiceName(SERVICE_NAME);
    this.logger.log(`🎧 Cart event subscriber initialized for "${SERVICE_NAME}"`);
    this.logger.log(`   Queue: domain-events-${SERVICE_NAME}`);
  }
}

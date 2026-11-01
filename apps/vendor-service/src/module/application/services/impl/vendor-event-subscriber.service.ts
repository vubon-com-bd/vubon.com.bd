/**
 * VendorEventSubscriberService — wire cross-service event consumers
 * @module vendor-service/application/services/impl
 *
 * On module init:
 *   1. Register service name with EventBusService
 *   2. Subscribe handlers to incoming events
 *
 * Handlers live in: application/handlers/
 */
import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  UserCreatedHandler,
} from '../../handlers/user-created.handler.js';

@Injectable()
export class VendorEventSubscriberService implements OnModuleInit {
  private readonly logger = new Logger(VendorEventSubscriberService.name);

  constructor(
    private readonly eventBus: EventBusService,
    private readonly userCreatedHandler: UserCreatedHandler,
  ) {}

  onModuleInit(): void {
    // ─── Register service name (fan-out queue: domain-events-vendor) ───
    this.eventBus.setServiceName('vendor');

    // ─── Register handlers for incoming events ───
    this.eventBus.registerHandler('identity.user.created', (event) =>
      this.userCreatedHandler.handle(event),
    );

    this.logger.log(
      '✅ VendorEventSubscriberService ready — subscribed to: user.created',
    );
  }
}

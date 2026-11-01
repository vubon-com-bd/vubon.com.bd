import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventBridgeModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bridge';
import { EventBusModule } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';

import { SHIPPING_METHOD_REPOSITORY } from '@domain/repositories/shipping-method.repository.interface';
import { SHIPPING_METHOD_EVENT_STORE } from '@domain/event-store/shipping-method.event-store';

import { ShippingMethodMemoryRepository } from '@infrastructure/persistence/memory/repositories/shipping-method.memory.repository';
import { ShippingMethodEventBridge } from '@infrastructure/messaging/shipping-method-event-bridge.service';

import { ShippingMethodService, SHIPPING_METHOD_EVENT_BRIDGE } from '@application/services/impl/shipping-method.service';
import { SHIPPING_METHOD_SERVICE } from '@application/services/interfaces/shipping-method.service.interface';

@Module({
  imports: [CqrsModule, EventBridgeModule, EventBusModule],
  providers: [
    ShippingMethodMemoryRepository,
    { provide: SHIPPING_METHOD_REPOSITORY, useExisting: ShippingMethodMemoryRepository },
    { provide: SHIPPING_METHOD_EVENT_STORE, useExisting: ShippingMethodMemoryRepository },
    ShippingMethodEventBridge,
    { provide: SHIPPING_METHOD_EVENT_BRIDGE, useExisting: ShippingMethodEventBridge },
    ShippingMethodService,
    { provide: SHIPPING_METHOD_SERVICE, useExisting: ShippingMethodService },
  ],
  exports: [SHIPPING_METHOD_SERVICE, ShippingMethodService, SHIPPING_METHOD_REPOSITORY],
})
export class ShippingMethodModule {}

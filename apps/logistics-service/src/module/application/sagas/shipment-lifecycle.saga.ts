/**
 * ShipmentLifecycleSaga — reacts to shipment domain events
 * @module logistics-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface ShipmentLifecycleContext {
  readonly shipmentId: string;
  readonly trackingNumber: string;
  readonly orderId: string;
}

@Injectable()
export class ShipmentLifecycleSaga extends BaseSaga<ShipmentLifecycleContext> {
  readonly name = 'shipment-lifecycle';
  private readonly logger = new Logger(ShipmentLifecycleSaga.name);

  async execute(input: ShipmentLifecycleContext): Promise<void> {
    this.setContext(input);
    this.logger.log(`Shipment lifecycle started for ${input.shipmentId}`);
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    this.logger.warn(`Shipment lifecycle compensated for ${ctx?.shipmentId}`);
  }
}

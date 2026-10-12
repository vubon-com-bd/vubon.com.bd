/**
 * DeliveryAttemptSaga — reacts to delivery attempt events
 * @module logistics-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface DeliveryAttemptContext {
  readonly deliveryId: string;
  readonly shipmentId: string;
  readonly attemptNumber: number;
}

@Injectable()
export class DeliveryAttemptSaga extends BaseSaga<DeliveryAttemptContext> {
  readonly name = 'delivery-attempt';
  private readonly logger = new Logger(DeliveryAttemptSaga.name);

  async execute(input: DeliveryAttemptContext): Promise<void> {
    this.setContext(input);
    this.logger.log(`Delivery attempt saga started for ${input.deliveryId} (attempt ${input.attemptNumber})`);
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    this.logger.warn(`Delivery attempt saga compensated for ${ctx?.deliveryId}`);
  }
}

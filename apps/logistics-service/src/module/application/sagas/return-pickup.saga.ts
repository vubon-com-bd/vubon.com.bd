/**
 * ReturnPickupSaga — reacts to return shipment events
 * @module logistics-service/application/sagas
 */
import { Injectable, Logger } from '@nestjs/common';
import { BaseSaga } from '@vubon/shared-kernel/application/sagas';

export interface ReturnPickupContext {
  readonly returnId: string;
  readonly orderId: string;
  readonly rmaNumber: string;
}

@Injectable()
export class ReturnPickupSaga extends BaseSaga<ReturnPickupContext> {
  readonly name = 'return-pickup';
  private readonly logger = new Logger(ReturnPickupSaga.name);

  async execute(input: ReturnPickupContext): Promise<void> {
    this.setContext(input);
    this.logger.log(`Return pickup saga started for ${input.returnId} (RMA ${input.rmaNumber})`);
  }

  async compensate(): Promise<void> {
    const ctx = this.getContext();
    this.logger.warn(`Return pickup saga compensated for ${ctx?.returnId}`);
  }
}

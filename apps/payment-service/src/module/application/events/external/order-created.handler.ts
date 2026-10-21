/**
 * OrderCreatedHandler — initiates payment when order is created
 * @module payment-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { PAYMENT_METHOD } from '@vubon/shared-constants/business';

import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface';

export const ORDER_CREATED_EVENT = 'order-service.order.created';

interface OrderCreatedPayload {
  readonly orderId: string;
  readonly orderNumber: string;
  readonly customerId: string;
  readonly totalAmount: number;
  readonly currency: string;
  readonly itemCount: number;
  readonly createdAt: string;
}

interface OrderCreatedEvent {
  readonly id: string;
  readonly type: 'order-service.order.created';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderCreatedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderCreatedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderCreatedHandler.name);

  constructor(
    @Inject(PAYMENT_SERVICE)
    private readonly paymentService: IPaymentService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_CREATED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderCreatedEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_CREATED_EVENT}"`);
  }

  private async handle(event: OrderCreatedEvent): Promise<void> {
    const { orderId, customerId, totalAmount, currency, orderNumber } = event.payload;

    this.logger.log(
      `Received order.created — orderId=${orderId} (${orderNumber}), amount=${totalAmount} ${currency}`,
    );

    try {
      const result = await this.paymentService.initiate(
        {
          orderId,
          method: PAYMENT_METHOD.CARD,
          gateway: 'stripe',
          amount: totalAmount,
          currency,
          idempotencyKey: `order-${orderId}`,
        } as never,
        customerId,
      );

      this.logger.log(
        `✅ Payment initiated: ${result.paymentId} for order ${orderId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `OrderCreatedHandler failed for order ${orderId}: ${msg}`,
      );
    }
  }
}

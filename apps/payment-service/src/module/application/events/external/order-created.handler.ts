/**
 * OrderCreatedHandler — initiates payment + generates invoice when order is created
 * @module payment-service/application/events/external
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import { PAYMENT_METHOD } from '@vubon/shared-constants/business';

import {
  PAYMENT_SERVICE,
  type IPaymentService,
} from '@application/services/interfaces/payment.service.interface';
import {
  INVOICE_SERVICE,
  type IInvoiceService,
} from '@application/services/interfaces/invoice.service.interface';

export const ORDER_CREATED_EVENT = 'order.order.created';

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
  readonly type: 'order.order.created';
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
    @Inject(INVOICE_SERVICE)
    private readonly invoiceService: IInvoiceService,
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

    // ─── STEP 1: Auto-generate invoice ───
    try {
      const invoice = await this.invoiceService.generate(
        {
          userId: customerId,
          orderId,
          subtotal: totalAmount,
          taxAmount: 0,
          currency,
          notes: `Auto-generated for order ${orderNumber}`,
        } as never,
        'system',
      );

      this.logger.log(
        `✅ Invoice auto-generated: ${invoice.id} (${invoice.invoiceNumber}) for order ${orderId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `Invoice auto-generation failed for order ${orderId}: ${msg}`,
      );
      // Continue to payment even if invoice fails
    }

    // ─── STEP 2: Initiate payment ───
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

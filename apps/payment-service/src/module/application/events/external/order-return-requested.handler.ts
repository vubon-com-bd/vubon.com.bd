/**
 * OrderReturnRequestedHandler — initiate refund when order return requested
 * @module payment-service/application/events/external
 *
 * Order service emits 'order.order-return.requested' when a
 * customer requests a return. This handler initiates the refund workflow.
 */
import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  REFUND_SERVICE,
  type IRefundService,
} from '../../services/interfaces/refund.service.interface.js';

export const ORDER_RETURN_REQUESTED_EVENT = 'order.order-return.requested';

interface OrderReturnRequestedPayload {
  readonly returnId: string;
  readonly orderId: string;
  readonly userId: string;
  readonly reason: string;
  readonly amount?: number;
}

interface OrderReturnRequestedEvent {
  readonly id: string;
  readonly type: 'order.order-return.requested';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: OrderReturnRequestedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class OrderReturnRequestedHandler implements OnModuleInit {
  private readonly logger = new Logger(OrderReturnRequestedHandler.name);

  constructor(
    @Inject(REFUND_SERVICE)
    private readonly refundService: IRefundService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(ORDER_RETURN_REQUESTED_EVENT, async (event) => {
      await this.handle(event as unknown as OrderReturnRequestedEvent);
    });
    this.logger.log(`✅ Registered handler for "${ORDER_RETURN_REQUESTED_EVENT}"`);
  }

  private async handle(event: OrderReturnRequestedEvent): Promise<void> {
    const p = event.payload;
    this.logger.log(
      `📥 order-return.requested → returnId=${p.returnId} orderId=${p.orderId}`,
    );

    try {
      const result = await this.refundService.request({
        orderId: p.orderId,
        userId: p.userId,
        returnId: p.returnId,
        reason: p.reason,
        amount: p.amount,
      } as never);

      this.logger.log(
        `✅ Refund initiated: refundId=${result.refundId} for return ${p.returnId}`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      this.logger.error(
        `Failed to initiate refund for return ${p.returnId}: ${msg}`,
      );
    }
  }
}

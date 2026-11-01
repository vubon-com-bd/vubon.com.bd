/**
 * UserStatusChangedHandler — cancels orders when user is suspended/deleted
 * @module order-service/application/events/external
 *
 * Identity service emits 'identity.user.status_changed' when user status changes.
 * If user becomes suspended/deleted → cancel all pending orders.
 */
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventBusService } from '@vubon/shared-kernel/infrastructure/messaging/event-bus';
import {
  ORDER_SERVICE,
  type IOrderService,
} from '../../services/interfaces/order.service.interface.js';
import {
  ORDER_CANCEL_SERVICE,
  type IOrderCancelService,
} from '../../services/interfaces/order-cancel.service.interface.js';

export const USER_STATUS_CHANGED_EVENT = 'identity.user.status_changed';

interface UserStatusChangedPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

interface UserStatusChangedEvent {
  readonly id: string;
  readonly type: 'identity.user.status_changed';
  readonly aggregateId: string;
  readonly aggregateType: string;
  readonly payload: UserStatusChangedPayload;
  readonly occurredAt: string;
  readonly version: number;
}

@Injectable()
export class UserStatusChangedHandler implements OnModuleInit {
  private readonly logger = new Logger(UserStatusChangedHandler.name);

  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderService: IOrderService,
    @Inject(ORDER_CANCEL_SERVICE)
    private readonly cancelService: IOrderCancelService,
    private readonly eventBus: EventBusService,
  ) {}

  onModuleInit(): void {
    this.eventBus.registerHandler(USER_STATUS_CHANGED_EVENT, async (event) => {
      await this.handle(event as unknown as UserStatusChangedEvent);
    });
    this.logger.log(`✅ Registered handler for "${USER_STATUS_CHANGED_EVENT}"`);
  }

  private async handle(event: UserStatusChangedEvent): Promise<void> {
    const { userId, fromStatus, toStatus, reason } = event.payload;

    this.logger.log(
      `📥 user.status_changed → userId=${userId} ${fromStatus} → ${toStatus}`,
    );

    // Only act on suspension or deletion
    if (!['suspended', 'deleted', 'inactive'].includes(toStatus)) {
      return;
    }

    try {
      // Find all pending orders for this user
      const ordersResult = await this.orderService.list({
        page: 1,
        limit: 100,
        filter: {
          customerId: userId,
          status: ['pending', 'confirmed', 'processing'],
        },
      } as never);

      const orders = (ordersResult as unknown as { items?: readonly unknown[] }).items ?? [];

      this.logger.log(
        `Found ${orders.length} active orders for user ${userId} — cancelling`,
      );

      for (const order of orders) {
        const orderId = (order as unknown as { id: string }).id;
        try {
          // 1. Request cancellation
          const cancelResult = await this.cancelService.request({
            orderId,
            reason: `Auto-cancelled: user status changed to ${toStatus}` +
              (reason ? ` (${reason})` : ''),
          } as never, 'system');

          // 2. Auto-approve (system-initiated)
          await this.cancelService.approve({
            cancelId: cancelResult.id,
          } as never, 'system');

          this.logger.log(`✅ Cancelled order ${orderId}`);
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'unknown';
          this.logger.warn(`Failed to cancel order ${orderId}: ${msg}`);
        }
      }

      this.logger.log(
        `✅ ${orders.length} orders processed for user ${userId} (${toStatus})`,
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'unknown';
      this.logger.error(
        `UserStatusChangedHandler failed for user ${userId}: ${msg}`,
      );
    }
  }
}

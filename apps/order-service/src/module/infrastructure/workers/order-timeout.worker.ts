/**
 * OrderTimeoutWorker — auto-cancels stale pending orders
 * @module order-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../domain/repositories/order.repository.interface.js';
import type { OrderEntity } from '../../domain/entities/order.entity.js';
import { ORDER_CONFIG } from '../config/order.config.js';

interface TimeoutPayload {
  readonly orderId?: string;
}

@Injectable()
export class OrderTimeoutWorker extends BaseWorker<TimeoutPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.ORDER_PROCESSING;
  protected readonly jobNames = [ORDER_JOB_NAME.AUTO_CANCEL_ORDER] as const;

  constructor(
    queueService: QueueService,
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {
    super(queueService, 'OrderTimeoutWorker');
  }

  protected async handle(payload: TimeoutPayload): Promise<unknown> {
    if (payload.orderId) {
      const stale = await this.repo.findStalePending(
        ORDER_CONFIG.autoCancelHours * 60,
      );
      const target: OrderEntity | undefined = stale.find(
        (o: OrderEntity) => o.id === payload.orderId,
      );
      if (!target) return { skipped: true };
      target.cancel('auto_timeout', 'system');
      await this.repo.save(target);
      this.logger.log(`Auto-cancelled order ${payload.orderId}`);
      return { cancelled: true };
    }
    const stale = await this.repo.findStalePending(
      ORDER_CONFIG.autoCancelHours * 60,
    );
    for (const order of stale) {
      order.cancel('auto_timeout', 'system');
      await this.repo.save(order);
    }
    this.logger.log(`Auto-cancelled ${stale.length} stale orders`);
    return { cancelledCount: stale.length };
  }

  protected concurrency(): number {
    return 1;
  }
}

/**
 * OrderProcessorWorker — processes order events
 * @module order-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import type { ProcessOrderPayload } from '../queues/order.queue.js';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../domain/repositories/order.repository.interface.js';
import { OrderIdVO } from '../../domain/value-objects/primitives/order-id.vo.js';

@Injectable()
export class OrderProcessorWorker extends BaseWorker<ProcessOrderPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.ORDER_PROCESSING;
  protected readonly jobNames = [ORDER_JOB_NAME.PROCESS_ORDER] as const;

  constructor(
    queueService: QueueService,
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {
    super(queueService, 'OrderProcessorWorker');
  }

  protected async handle(payload: ProcessOrderPayload): Promise<unknown> {
    const vo = OrderIdVO.reconstitute(payload.orderId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) return { skipped: true, reason: 'not_found' };
    this.logger.log(
      `Processed order ${payload.orderId} (status=${entity.status.value})`,
    );
    return { processed: true, status: entity.status.value };
  }

  protected concurrency(): number {
    return 3;
  }
}

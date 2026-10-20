/**
 * ReturnProcessorWorker — processes return lifecycle events
 * @module order-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '../queues/queue.constants.js';
import {
  ORDER_RETURN_REPOSITORY,
  type OrderReturnRepository,
} from '../../domain/repositories/order-return.repository.interface.js';

interface ProcessReturnPayload {
  readonly returnId: string;
}

@Injectable()
export class ReturnProcessorWorker extends BaseWorker<ProcessReturnPayload> {
  protected readonly queueName = ORDER_QUEUE_NAME.ORDER_PROCESSING;
  protected readonly jobNames = [ORDER_JOB_NAME.PROCESS_RETURN] as const;

  constructor(
    queueService: QueueService,
    @Inject(ORDER_RETURN_REPOSITORY)
    private readonly repo: OrderReturnRepository,
  ) {
    super(queueService, 'ReturnProcessorWorker');
  }

  protected async handle(payload: ProcessReturnPayload): Promise<unknown> {
    const entity = await this.repo.findById(payload.returnId);
    if (!entity) return { skipped: true };
    this.logger.log(
      `Processed return ${payload.returnId} (status=${entity.status.value})`,
    );
    return { processed: true };
  }

  protected concurrency(): number {
    return 2;
  }
}

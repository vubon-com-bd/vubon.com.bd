/**
 * ProductProcessorWorker
 * @module product-service/infrastructure/workers
 */
import { Inject, Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { BaseWorker } from './base.worker.js';
import {
  PRODUCT_QUEUE_NAME,
  PRODUCT_JOB_NAME,
} from '../queues/queue.constants.js';
import type { ProcessProductPayload } from '../queues/product.queue.js';
import {
  PRODUCT_REPOSITORY,
  type ProductRepository,
} from '../../domain/repositories/product.repository.interface.js';
import { ProductIdVO } from '../../domain/value-objects/primitives/product-id.vo.js';

@Injectable()
export class ProductProcessorWorker extends BaseWorker<ProcessProductPayload> {
  protected readonly queueName = PRODUCT_QUEUE_NAME.PRODUCT_PROCESSING;
  protected readonly jobNames = [PRODUCT_JOB_NAME.PROCESS_PRODUCT] as const;

  constructor(
    queueService: QueueService,
    @Inject(PRODUCT_REPOSITORY)
    private readonly repo: ProductRepository,
  ) {
    super(queueService, 'ProductProcessorWorker');
  }

  protected async handle(payload: ProcessProductPayload): Promise<unknown> {
    const vo = ProductIdVO.create(payload.productId);
    const entity = await this.repo.findByIdVO(vo);
    if (!entity) return { skipped: true, reason: 'not_found' };

    this.logger.log(`Processed product ${payload.productId} (status=${entity.status.value})`);
    return { processed: true, status: entity.status.value };
  }

  protected concurrency(): number {
    return 3;
  }
}

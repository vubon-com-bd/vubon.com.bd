import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { VECTOR_QUEUE_NAME, type VectorIndexJobPayload } from '../queues/vector.queue';
import { VectorService } from '../../application/services/impl/vector.service';

@Injectable()
export class VectorIndexingWorker implements OnModuleInit {
  private readonly logger = new Logger(VectorIndexingWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly vectorService: VectorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<VectorIndexJobPayload>(
      VECTOR_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Indexing vector: ${payload.vectorId}`);
        await this.vectorService.index(payload.vectorId, payload.indexId);
        this.logger.log(`Vector indexed: ${payload.vectorId}`);
      },
      5,
    );
  }
}

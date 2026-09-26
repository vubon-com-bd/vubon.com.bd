import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { VECTOR_QUEUE_NAME, type VectorRebuildJobPayload } from '../queues/vector.queue';
import { VectorService } from '../../application/services/impl/vector.service';

@Injectable()
export class VectorIndexRebuildWorker implements OnModuleInit {
  private readonly logger = new Logger(VectorIndexRebuildWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly vectorService: VectorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<VectorRebuildJobPayload>(
      VECTOR_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Rebuilding index: ${payload.indexId}`);
        await this.vectorService.rebuildIndex(payload.indexId, payload.force);
        this.logger.log(`Index rebuilt: ${payload.indexId}`);
      },
      1,
    );
  }
}

import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { EMBEDDING_QUEUE_NAME, type EmbeddingJobPayload } from '../queues/embedding.queue';
import { EmbeddingService } from '../../application/services/impl/embedding.service';

@Injectable()
export class EmbeddingGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(EmbeddingGeneratorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly embeddingService: EmbeddingService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<EmbeddingJobPayload>(
      EMBEDDING_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Embedding: ${payload.sourceId}`);
        await this.embeddingService.generate({
          sourceId: payload.sourceId,
          sourceType: payload.sourceType,
          content: payload.content,
          type: 'text',
          dimension: 1536,
        });
        this.logger.log(`Embedding complete: ${payload.sourceId}`);
      },
      3,
    );
  }
}

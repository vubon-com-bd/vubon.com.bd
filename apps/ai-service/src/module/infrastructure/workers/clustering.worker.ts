import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { VECTOR_QUEUE_NAME } from '../queues/vector.queue';
import { ClusterService } from '../../application/services/impl/cluster.service';

interface ClusteringPayload {
  readonly vectorIds: readonly string[];
  readonly k: number;
}

@Injectable()
export class ClusteringWorker implements OnModuleInit {
  private readonly logger = new Logger(ClusteringWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly clusterService: ClusterService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<ClusteringPayload>(
      VECTOR_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Clustering ${payload.vectorIds.length} vectors`);
        await this.clusterService.create({
          vectorIds: [...payload.vectorIds],
          k: payload.k,
          algorithm: 'kmeans',
          maxIterations: 100,
        });
      },
      1,
    );
  }
}

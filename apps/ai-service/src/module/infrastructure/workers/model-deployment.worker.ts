import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { VECTOR_QUEUE_NAME } from '../queues/vector.queue';
import { ModelService } from '../../application/services/impl/model.service';

interface DeployPayload {
  readonly modelId: string;
}

@Injectable()
export class ModelDeploymentWorker implements OnModuleInit {
  private readonly logger = new Logger(ModelDeploymentWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly modelService: ModelService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<DeployPayload>(
      VECTOR_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Deploying model: ${payload.modelId}`);
        await this.modelService.deploy({
          modelId: payload.modelId,
          trafficPercent: 100,
        });
        this.logger.log(`Model deployed: ${payload.modelId}`);
      },
      1,
    );
  }
}

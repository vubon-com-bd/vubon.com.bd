import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { ANALYTICS_QUEUE_NAME } from '../queues/analytics.queue';
import { DriftDetectorService } from '../services/internal/drift-detector.service';

interface DriftPayload {
  readonly modelId: string;
  readonly metric: string;
  readonly baseline: number;
  readonly current: number;
}

@Injectable()
export class DriftDetectorWorker implements OnModuleInit {
  private readonly logger = new Logger(DriftDetectorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly driftDetector: DriftDetectorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<DriftPayload>(
      ANALYTICS_QUEUE_NAME,
      async (payload) => {
        const result = this.driftDetector.detect({
          metricName: payload.metric,
          baseline: payload.baseline,
          current: payload.current,
          threshold: 0.2,
        });
        if (result.drifted) {
          this.logger.warn(`Drift detected on ${payload.modelId}: ${result.severity}`);
        }
      },
      2,
    );
  }
}

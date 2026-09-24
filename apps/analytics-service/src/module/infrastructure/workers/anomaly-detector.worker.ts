import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { AnomalyDetectorService } from '../services/internal/anomaly-detector.service';

@Injectable()
export class AnomalyDetectorWorker implements OnModuleInit {
  private readonly logger = new Logger(AnomalyDetectorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly detector: AnomalyDetectorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      metricName: string;
      currentValue: number;
      history: number[];
    }>('analytics:anomaly', async (payload) => {
      const result = this.detector.detect(payload.currentValue, payload.history);
      if (result.isAnomaly) {
        this.logger.warn(
          `Anomaly detected for ${payload.metricName}: z=${result.zScore}`,
        );
      }
      return result;
    }, 3);
  }
}

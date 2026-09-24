import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { WORKER_CONFIG } from '../config/worker.config';
import { MetricAggregatorService } from '../services/internal/metric-aggregator.service';

@Injectable()
export class MetricAggregatorWorker implements OnModuleInit {
  private readonly logger = new Logger(MetricAggregatorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly aggregator: MetricAggregatorService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{
      values: number[];
      method: string;
    }>(
      'analytics:metric',
      async (payload) => {
        this.logger.debug(`Aggregating ${payload.values.length} values`);
        const result = this.aggregator.aggregate(payload.values, payload.method);
        return { result };
      },
      WORKER_CONFIG.metricAggregatorConcurrency,
    );
  }
}

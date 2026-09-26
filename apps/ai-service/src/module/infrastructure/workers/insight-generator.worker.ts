import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { INSIGHT_QUEUE_NAME, type InsightJobPayload } from '../queues/insight.queue';
import { InsightService } from '../../application/services/impl/insight.service';

@Injectable()
export class InsightGeneratorWorker implements OnModuleInit {
  private readonly logger = new Logger(InsightGeneratorWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly insightService: InsightService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<InsightJobPayload>(
      INSIGHT_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Insight for: ${payload.target}`);
        try {
          await this.insightService.generate({
            target: payload.target,
            type: payload.type,
            priority: 'medium',
            findings: [],
            confidence: 0.7,
          });
        } catch (error) {
          this.logger.warn(`Insight skipped: ${payload.target}`, error);
        }
      },
      3,
    );
  }
}

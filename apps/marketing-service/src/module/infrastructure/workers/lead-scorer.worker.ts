import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { LeadScoringService } from '../services/internal/lead-scoring.service';

@Injectable()
export class LeadScorerWorker implements OnModuleInit {
  private readonly logger = new Logger(LeadScorerWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly scorer: LeadScoringService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ leadId: string; source: string }>(
      'marketing-lead',
      async (payload) => {
        const score = this.scorer.calculate({
          emailProvided: true,
          phoneProvided: false,
          companyProvided: false,
          source: payload.source,
        });
        this.logger.log(`Lead ${payload.leadId}: score ${score}`);
      },
    );
  }
}

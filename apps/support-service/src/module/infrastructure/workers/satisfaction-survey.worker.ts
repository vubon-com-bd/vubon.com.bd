import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { SurveyRepository } from '../../domain/repositories/survey.repository.interface';

@Injectable()
export class SatisfactionSurveyWorker implements OnModuleInit {
  private readonly logger = new Logger(SatisfactionSurveyWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly surveyRepo: SurveyRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ ticketId: string; userId: string }>(
      QUEUE_NAME.NOTIFICATION,
      async (payload) => {
        this.logger.log(
          `Sending satisfaction survey for ticket ${payload.ticketId}`,
        );
        const surveys = await this.surveyRepo.findActive();
        this.logger.debug(`Active surveys: ${surveys.length}`);
      },
    );
  }
}

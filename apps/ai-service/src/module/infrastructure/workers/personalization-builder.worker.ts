import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { PERSONALIZATION_QUEUE_NAME, type PersonalizationJobPayload } from '../queues/personalization.queue';
import { PersonalizationProfileService } from '../../application/services/impl/personalization-profile.service';

@Injectable()
export class PersonalizationBuilderWorker implements OnModuleInit {
  private readonly logger = new Logger(PersonalizationBuilderWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly profileService: PersonalizationProfileService,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<PersonalizationJobPayload>(
      PERSONALIZATION_QUEUE_NAME,
      async (payload) => {
        this.logger.log(`Building profile: ${payload.userId}`);
        try {
          await this.profileService.findByUser(payload.userId);
        } catch (error) {
          this.logger.warn(`Profile not found for ${payload.userId}`, error);
        }
      },
      2,
    );
  }
}

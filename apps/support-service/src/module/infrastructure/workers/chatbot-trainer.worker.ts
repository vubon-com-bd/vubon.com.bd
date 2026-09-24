import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME } from '@vubon/shared-constants/infrastructure';
import type { ChatbotRepository } from '../../domain/repositories/chatbot.repository.interface';
import type { ChatbotIntentRepository } from '../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotIdVO } from '../../domain/value-objects/primitives/chatbot-id.vo';

@Injectable()
export class ChatbotTrainerWorker implements OnModuleInit {
  private readonly logger = new Logger(ChatbotTrainerWorker.name);

  constructor(
    private readonly queueService: QueueService,
    private readonly chatbotRepo: ChatbotRepository,
    private readonly intentRepo: ChatbotIntentRepository,
  ) {}

  onModuleInit(): void {
    this.queueService.registerWorker<{ chatbotId: string }>(
      QUEUE_NAME.CLEANUP,
      async (payload) => {
        this.logger.log(`Training chatbot: ${payload.chatbotId}`);
        const intents = await this.intentRepo.findByChatbot(
          ChatbotIdVO.create(payload.chatbotId),
        );
        this.logger.debug(`Intents to train: ${intents.length}`);
      },
    );
  }
}

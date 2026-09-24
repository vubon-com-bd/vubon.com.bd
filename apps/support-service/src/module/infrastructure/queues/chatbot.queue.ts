import { Injectable } from '@nestjs/common';
import { QueueService } from '@vubon/shared-kernel/infrastructure';
import { QUEUE_NAME, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export interface ChatbotTrainingJobPayload {
  readonly chatbotId: string;
  readonly action: 'train' | 'retrain';
}

@Injectable()
export class ChatbotQueue {
  readonly queueName = QUEUE_NAME.CLEANUP;

  constructor(private readonly queueService: QueueService) {}

  async enqueueTraining(payload: ChatbotTrainingJobPayload): Promise<string> {
    return this.queueService.enqueue(
      this.queueName,
      `chatbot.${payload.action}`,
      payload,
      { priority: QUEUE_PRIORITY.BACKGROUND },
    );
  }
}

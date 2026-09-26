/**
 * TrainIntentHandler
 * @module support-service/application/commands/chatbot
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainIntentCommand } from './train-intent.command';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import type { ChatbotServiceInterface } from '../../services/interfaces/chatbot.service.interface';

export class TrainIntentHandler extends BaseCommandHandler<
  TrainIntentCommand,
  ChatbotResponseDTO
> {
  readonly commandType = 'support.chatbot.train_intent';

  constructor(private readonly chatbotService: ChatbotServiceInterface) {
    super();
  }

  async execute(command: TrainIntentCommand): Promise<ChatbotResponseDTO> {
    return this.chatbotService.trainIntent(command.payload);
  }
}

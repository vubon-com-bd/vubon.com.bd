/**
 * TrainEntityHandler
 * @module support-service/application/commands/chatbot
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainEntityCommand } from './train-entity.command';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import type { ChatbotServiceInterface } from '../../services/interfaces/chatbot.service.interface';

export class TrainEntityHandler extends BaseCommandHandler<
  TrainEntityCommand,
  ChatbotResponseDTO
> {
  readonly commandType = 'support.chatbot.train_entity';

  constructor(private readonly chatbotService: ChatbotServiceInterface) {
    super();
  }

  async execute(command: TrainEntityCommand): Promise<ChatbotResponseDTO> {
    return this.chatbotService.trainEntity(command.payload);
  }
}

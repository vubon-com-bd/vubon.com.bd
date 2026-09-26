/**
 * TrainEntityCommand
 * @module support-service/application/commands/chatbot
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TrainEntityRequestDTO } from '../../dtos/requests/chatbot/train-entity.dto';

export class TrainEntityCommand extends BaseCommand {
  readonly type = 'support.chatbot.train_entity';

  constructor(public readonly payload: TrainEntityRequestDTO) {
    super();
  }
}

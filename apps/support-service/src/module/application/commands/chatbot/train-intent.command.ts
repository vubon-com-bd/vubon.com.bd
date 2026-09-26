/**
 * TrainIntentCommand
 * @module support-service/application/commands/chatbot
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { TrainIntentRequestDTO } from '../../dtos/requests/chatbot/train-intent.dto';

export class TrainIntentCommand extends BaseCommand {
  readonly type = 'support.chatbot.train_intent';

  constructor(public readonly payload: TrainIntentRequestDTO) {
    super();
  }
}

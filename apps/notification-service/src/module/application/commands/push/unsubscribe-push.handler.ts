import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnsubscribePushCommand } from './unsubscribe-push.command.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';

@CommandHandler(UnsubscribePushCommand)
export class UnsubscribePushHandler implements ICommandHandler<UnsubscribePushCommand, void> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(c: UnsubscribePushCommand): Promise<void> {
    await this.service.unsubscribe(c.token, c.actorId);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SubscribePushCommand } from './subscribe-push.command.js';
import { PUSH_SERVICE, type IPushService } from '../../services/interfaces/push.service.interface.js';

@CommandHandler(SubscribePushCommand)
export class SubscribePushHandler implements ICommandHandler<SubscribePushCommand, void> {
  constructor(@Inject(PUSH_SERVICE) private readonly service: IPushService) {}

  async execute(c: SubscribePushCommand): Promise<void> {
    await this.service.subscribe(c.dto);
  }
}

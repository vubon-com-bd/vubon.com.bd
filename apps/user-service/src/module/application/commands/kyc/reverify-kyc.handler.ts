import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ReverifyKycCommand } from './reverify-kyc.command';

@CommandHandler(ReverifyKycCommand)
export class ReverifyKycHandler
  extends BaseCommandHandler<ReverifyKycCommand, void>
  implements ICommandHandler<ReverifyKycCommand>
{
  readonly commandType = 'user.kyc.reverify';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: ReverifyKycCommand): Promise<void> {
    void command;
    throw new Error('reverify-kyc not yet wired');
  }
}

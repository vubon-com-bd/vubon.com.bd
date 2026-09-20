import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlinkSocialCommand } from './unlink-social.command';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface';

@CommandHandler(UnlinkSocialCommand)
export class UnlinkSocialHandler
  extends BaseCommandHandler<UnlinkSocialCommand, void>
  implements ICommandHandler<UnlinkSocialCommand>
{
  readonly commandType = 'auth.unlink-social';

  constructor(
    @Inject('AuthSocialService') @Inject('AuthSocialService') private readonly socialService: AuthSocialServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UnlinkSocialCommand): Promise<void> {
    await this.socialService.unlink(command.userId, command.provider);
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UnlinkSocialCommand } from './unlink-social.command.js';
import type { AuthSocialServiceInterface } from '../../services/interfaces/auth-social.service.interface.js';
import { AUTH_SOCIAL_SERVICE } from '../../tokens.js';

@CommandHandler(UnlinkSocialCommand)
export class UnlinkSocialHandler
  extends BaseCommandHandler<UnlinkSocialCommand, void>
  implements ICommandHandler<UnlinkSocialCommand> {
  readonly commandType = 'UnlinkSocialCommand';
  constructor(
    @Inject(AUTH_SOCIAL_SERVICE) private readonly socialService: AuthSocialServiceInterface,
  ) { super(); }

  async execute(command: UnlinkSocialCommand): Promise<void> {
    await this.socialService.unlink(command.userId, command.input);
  }
}

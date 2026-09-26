import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokeRoleCommand } from './revoke-role.command';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_ROLE_SERVICE } from '../../tokens';

@CommandHandler(RevokeRoleCommand)
export class RevokeRoleHandler
  extends BaseCommandHandler<RevokeRoleCommand, void>
  implements ICommandHandler<RevokeRoleCommand> {
  readonly commandType = 'RevokeRoleCommand';
  constructor(
    @Inject(USER_ROLE_SERVICE)
    private readonly userRoleService: UserRoleServiceInterface,
  ) { super(); }

  async execute(command: RevokeRoleCommand): Promise<void> {
    await this.userRoleService.revoke(
      command.input.userId as UserId,
      command.input.role,
    );
  }
}

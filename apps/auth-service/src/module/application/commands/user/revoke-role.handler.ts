import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokeRoleCommand } from './revoke-role.command';
import type { AuthRoleServiceInterface } from '../../services/interfaces/auth-role.service.interface';

@CommandHandler(RevokeRoleCommand)
export class RevokeRoleHandler
  extends BaseCommandHandler<RevokeRoleCommand, void>
  implements ICommandHandler<RevokeRoleCommand>
{
  readonly commandType = 'user.revoke-role';

  constructor(
    private readonly roleService: AuthRoleServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RevokeRoleCommand): Promise<void> {
    await this.roleService.revoke(command.userId, command.role);
  }
}

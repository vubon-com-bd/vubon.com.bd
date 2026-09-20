import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignRoleCommand } from './assign-role.command';
import type { AuthRoleServiceInterface } from '../../services/interfaces/auth-role.service.interface';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler
  extends BaseCommandHandler<AssignRoleCommand, void>
  implements ICommandHandler<AssignRoleCommand>
{
  readonly commandType = 'user.assign-role';

  constructor(
    @Inject('AuthRoleService') private readonly roleService: AuthRoleServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AssignRoleCommand): Promise<void> {
    await this.roleService.assign(command.userId, command.role);
  }
}

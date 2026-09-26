import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignPermissionCommand } from './assign-permission.command';
import type { AuthRoleServiceInterface } from '../../services/interfaces/auth-role.service.interface';
import { AUTH_ROLE_SERVICE } from '../../tokens';

@CommandHandler(AssignPermissionCommand)
export class AssignPermissionHandler
  extends BaseCommandHandler<AssignPermissionCommand, void>
  implements ICommandHandler<AssignPermissionCommand> {
  readonly commandType = 'AssignPermissionCommand';
  constructor(
    @Inject(AUTH_ROLE_SERVICE)
    private readonly roleService: AuthRoleServiceInterface,
  ) { super(); }

  async execute(command: AssignPermissionCommand): Promise<void> {
    await this.roleService.addPermission(
      command.input.roleId,
      command.input.permission,
    );
  }
}

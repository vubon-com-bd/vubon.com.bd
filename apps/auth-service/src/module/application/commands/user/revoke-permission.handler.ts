import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokePermissionCommand } from './revoke-permission.command';
import type { AuthRoleServiceInterface } from '../../services/interfaces/auth-role.service.interface';
import { AUTH_ROLE_SERVICE } from '../../tokens';

@CommandHandler(RevokePermissionCommand)
export class RevokePermissionHandler
  extends BaseCommandHandler<RevokePermissionCommand, void>
  implements ICommandHandler<RevokePermissionCommand> {
  readonly commandType = 'RevokePermissionCommand';
  constructor(
    @Inject(AUTH_ROLE_SERVICE)
    private readonly roleService: AuthRoleServiceInterface,
  ) { super(); }

  async execute(command: RevokePermissionCommand): Promise<void> {
    await this.roleService.removePermission(
      command.input.roleId,
      command.input.permission,
    );
  }
}

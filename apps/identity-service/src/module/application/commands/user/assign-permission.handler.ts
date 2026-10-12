import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignPermissionCommand } from './assign-permission.command.js';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface.js';
import { USER_PERMISSION_SERVICE } from '../../services/interfaces/user-permission.service.interface.js';

export interface AssignPermissionResponse { readonly success: true; readonly granted: boolean; }

@CommandHandler(AssignPermissionCommand)
export class AssignPermissionHandler
  extends BaseCommandHandler<AssignPermissionCommand, AssignPermissionResponse>
  implements ICommandHandler<AssignPermissionCommand>
{
  readonly commandType = 'user.assign-permission';
  constructor(@Inject(USER_PERMISSION_SERVICE) private readonly service: UserPermissionServiceInterface) { super(); }

  async execute(command: AssignPermissionCommand): Promise<AssignPermissionResponse> {
    await this.service.grant(command.input.userId, command.input.permission, command.grantedBy, command.input.expiresAt);
    return { success: true, granted: true };
  }
}

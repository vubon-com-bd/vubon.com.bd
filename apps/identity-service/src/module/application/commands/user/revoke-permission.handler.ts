import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokePermissionCommand } from './revoke-permission.command.js';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface.js';
import { USER_PERMISSION_SERVICE } from '../../services/interfaces/user-permission.service.interface.js';

export interface RevokePermissionResponse { readonly success: true; readonly revoked: boolean; }

@CommandHandler(RevokePermissionCommand)
export class RevokePermissionHandler
  extends BaseCommandHandler<RevokePermissionCommand, RevokePermissionResponse>
  implements ICommandHandler<RevokePermissionCommand>
{
  readonly commandType = 'user.revoke-permission';
  constructor(@Inject(USER_PERMISSION_SERVICE) private readonly service: UserPermissionServiceInterface) { super(); }

  async execute(command: RevokePermissionCommand): Promise<RevokePermissionResponse> {
    await this.service.revoke(command.input.userId, command.input.permission, command.revokedBy);
    return { success: true, revoked: true };
  }
}

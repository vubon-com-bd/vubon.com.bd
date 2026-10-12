import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokeRoleCommand } from './revoke-role.command.js';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface.js';
import { USER_ROLE_SERVICE } from '../../services/interfaces/user-role.service.interface.js';

export interface RevokeRoleResponse { readonly success: true; readonly revoked: boolean; }

@CommandHandler(RevokeRoleCommand)
export class RevokeRoleHandler
  extends BaseCommandHandler<RevokeRoleCommand, RevokeRoleResponse>
  implements ICommandHandler<RevokeRoleCommand>
{
  readonly commandType = 'user.revoke-role';
  constructor(@Inject(USER_ROLE_SERVICE) private readonly service: UserRoleServiceInterface) { super(); }

  async execute(command: RevokeRoleCommand): Promise<RevokeRoleResponse> {
    await this.service.revoke(command.input.userId, command.input.role, command.revokedBy);
    return { success: true, revoked: true };
  }
}

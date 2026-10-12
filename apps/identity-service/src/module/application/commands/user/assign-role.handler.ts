import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignRoleCommand } from './assign-role.command.js';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface.js';
import { USER_ROLE_SERVICE } from '../../services/interfaces/user-role.service.interface.js';

export interface AssignRoleResponse { readonly success: true; readonly assigned: boolean; }

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler
  extends BaseCommandHandler<AssignRoleCommand, AssignRoleResponse>
  implements ICommandHandler<AssignRoleCommand>
{
  readonly commandType = 'user.assign-role';
  constructor(@Inject(USER_ROLE_SERVICE) private readonly service: UserRoleServiceInterface) { super(); }

  async execute(command: AssignRoleCommand): Promise<AssignRoleResponse> {
    await this.service.assign(command.input.userId, command.input.role, command.assignedBy, command.input.expiresAt);
    return { success: true, assigned: true };
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignRoleCommand } from './assign-role.command';
import type { UserRoleServiceInterface } from '../../services/interfaces/user-role.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import { USER_ROLE_SERVICE } from '../../tokens';

@CommandHandler(AssignRoleCommand)
export class AssignRoleHandler
  extends BaseCommandHandler<AssignRoleCommand, void>
  implements ICommandHandler<AssignRoleCommand> {
  readonly commandType = 'AssignRoleCommand';
  constructor(
    @Inject(USER_ROLE_SERVICE)
    private readonly userRoleService: UserRoleServiceInterface,
  ) { super(); }

  async execute(command: AssignRoleCommand): Promise<void> {
    await this.userRoleService.assign(
      command.input.userId as UserId,
      command.input.role,
    );
  }
}

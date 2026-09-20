import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AssignPermissionCommand } from './assign-permission.command';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface';

@CommandHandler(AssignPermissionCommand)
export class AssignPermissionHandler
  extends BaseCommandHandler<AssignPermissionCommand, void>
  implements ICommandHandler<AssignPermissionCommand>
{
  readonly commandType = 'user.assign-permission';

  constructor(
    @Inject('UserPermissionService') private readonly permissionService: UserPermissionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: AssignPermissionCommand): Promise<void> {
    await this.permissionService.assign(command.userId, command.permission);
  }
}

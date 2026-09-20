import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RevokePermissionCommand } from './revoke-permission.command';
import type { UserPermissionServiceInterface } from '../../services/interfaces/user-permission.service.interface';

@CommandHandler(RevokePermissionCommand)
export class RevokePermissionHandler
  extends BaseCommandHandler<RevokePermissionCommand, void>
  implements ICommandHandler<RevokePermissionCommand>
{
  readonly commandType = 'user.revoke-permission';

  constructor(
    @Inject('UserPermissionService') private readonly permissionService: UserPermissionServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: RevokePermissionCommand): Promise<void> {
    await this.permissionService.revoke(command.userId, command.permission);
  }
}

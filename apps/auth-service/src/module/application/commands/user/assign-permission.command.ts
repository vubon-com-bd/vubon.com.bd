import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignPermissionCommand extends BaseCommand {
  readonly type = 'user.assign-permission';

  constructor(
    public readonly userId: string,
    public readonly permission: string,
  ) {
    super();
  }
}

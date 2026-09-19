import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RevokePermissionCommand extends BaseCommand {
  readonly type = 'user.revoke-permission';

  constructor(
    public readonly userId: string,
    public readonly permission: string,
  ) {
    super();
  }
}

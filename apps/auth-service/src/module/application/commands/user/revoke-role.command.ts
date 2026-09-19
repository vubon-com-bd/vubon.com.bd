import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RevokeRoleCommand extends BaseCommand {
  readonly type = 'user.revoke-role';

  constructor(
    public readonly userId: string,
    public readonly role: string,
  ) {
    super();
  }
}

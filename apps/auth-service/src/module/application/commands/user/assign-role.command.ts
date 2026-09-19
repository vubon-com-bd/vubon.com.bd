import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignRoleCommand extends BaseCommand {
  readonly type = 'user.assign-role';

  constructor(
    public readonly userId: string,
    public readonly role: string,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AssignRoleCommand extends BaseCommand {
  readonly type = 'vendor.team.assign-role';

  constructor(
    public readonly memberId: string,
    public readonly role: string,
  ) {
    super();
  }
}

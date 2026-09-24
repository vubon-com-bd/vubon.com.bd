import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateTeamCommand extends BaseCommand {
  readonly type = 'support.team.update';

  constructor(
    public readonly teamId: string,
    public readonly name?: string,
    public readonly description?: string,
    public readonly isActive?: boolean,
  ) {
    super();
  }
}

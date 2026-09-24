import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateTeamCommand extends BaseCommand {
  readonly type = 'support.team.create';

  constructor(
    public readonly name: string,
    public readonly type_: string,
    public readonly description?: string,
  ) {
    super();
  }
}

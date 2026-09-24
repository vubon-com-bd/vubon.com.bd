import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateDashboardCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.create';

  constructor(
    public readonly name: string,
    public readonly ownerId: string,
    public readonly layout?: string,
  ) {
    super();
  }
}

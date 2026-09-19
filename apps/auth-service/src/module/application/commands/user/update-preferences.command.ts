import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePreferencesCommand extends BaseCommand {
  readonly type = 'user.update-preferences';

  constructor(
    public readonly userId: string,
    public readonly newsletter?: boolean,
    public readonly promotions?: boolean,
    public readonly orderUpdates?: boolean,
    public readonly productRecommendations?: boolean,
    public readonly securityAlerts?: boolean,
  ) {
    super();
  }
}

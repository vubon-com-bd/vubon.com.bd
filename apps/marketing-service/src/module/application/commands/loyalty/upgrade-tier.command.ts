import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpgradeTierCommand extends BaseCommand {
  readonly type = 'marketing.loyalty.upgrade-tier';

  constructor(
    public readonly userId: string,
    public readonly targetTier: string,
  ) {
    super();
  }
}

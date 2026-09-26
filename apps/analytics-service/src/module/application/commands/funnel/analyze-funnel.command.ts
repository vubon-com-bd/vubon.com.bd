import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class AnalyzeFunnelCommand extends BaseCommand {
  readonly type = 'analytics.funnel.analyze';

  constructor(
    public readonly funnelId: string,
    public readonly fromDate: string,
    public readonly toDate: string,
  ) {
    super();
  }
}

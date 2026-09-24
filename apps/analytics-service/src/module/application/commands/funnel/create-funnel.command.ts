import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateFunnelCommand extends BaseCommand {
  readonly type = 'analytics.funnel.create';

  constructor(
    public readonly name: string,
    public readonly steps: readonly string[],
    public readonly ownerId: string,
  ) {
    super();
  }
}

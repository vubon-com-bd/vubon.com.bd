import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ComputeAttributionCommand extends BaseCommand {
  readonly type = 'analytics.attribution.compute';

  constructor(
    public readonly conversionId: string,
    public readonly model: string,
    public readonly touchpoints: readonly string[],
    public readonly conversionValue: number,
  ) {
    super();
  }
}

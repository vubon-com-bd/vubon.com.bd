import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ComputeAttributionCommand extends BaseCommand {
  readonly type = 'analytics.attribution.compute';
  constructor(
    public readonly conversionId: string,
    public readonly conversionValue: number,
    public readonly touchpointIds: readonly string[],
    public readonly model: string
  ) { super(); }
}

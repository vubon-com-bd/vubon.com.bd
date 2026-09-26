import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrackClickCommand extends BaseCommand {
  readonly type = 'ai.recommendation.track-click';

  constructor(
    public readonly recommendationId: string,
    public readonly userId: string,
    public readonly productId: string,
  ) {
    super();
  }
}

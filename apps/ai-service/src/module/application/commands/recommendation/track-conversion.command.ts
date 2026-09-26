import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrackConversionCommand extends BaseCommand {
  readonly type = 'ai.recommendation.track-conversion';

  constructor(
    public readonly recommendationId: string,
    public readonly userId: string,
    public readonly productId: string,
    public readonly orderId?: string,
  ) {
    super();
  }
}

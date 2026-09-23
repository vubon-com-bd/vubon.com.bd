import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TrackConversionCommand extends BaseCommand {
  readonly type = 'marketing.affiliate.track-conversion';

  constructor(
    public readonly affiliateId: string,
    public readonly orderId: string,
    public readonly orderAmount: number,
  ) {
    super();
  }
}

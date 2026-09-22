import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SubmitReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.submit';

  constructor(
    public readonly vendorId: string,
    public readonly userId: string,
    public readonly orderId: string,
    public readonly rating: number,
    public readonly content?: string,
  ) {
    super();
  }
}

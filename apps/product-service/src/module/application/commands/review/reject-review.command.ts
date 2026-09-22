import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RejectReviewCommand extends BaseCommand {
  readonly type = 'product.review.reject';

  constructor(
    public readonly reviewId: string,
    public readonly reason: string,
  ) {
    super();
  }
}

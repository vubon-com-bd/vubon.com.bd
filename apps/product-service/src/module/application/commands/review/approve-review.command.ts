import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ApproveReviewCommand extends BaseCommand {
  readonly type = 'product.review.approve';

  constructor(public readonly reviewId: string) {
    super();
  }
}

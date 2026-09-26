import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeleteReviewCommand extends BaseCommand {
  readonly type = 'product.review.delete';

  constructor(public readonly reviewId: string) {
    super();
  }
}

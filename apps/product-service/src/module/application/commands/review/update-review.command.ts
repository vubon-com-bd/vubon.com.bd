import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateReviewCommand extends BaseCommand {
  readonly type = 'product.review.update';

  constructor(
    public readonly reviewId: string,
    public readonly content?: string,
    public readonly rating?: number,
  ) {
    super();
  }
}

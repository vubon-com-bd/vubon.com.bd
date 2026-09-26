import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class SubmitReviewCommand extends BaseCommand {
  readonly type = 'product.review.submit';

  constructor(
    public readonly productId: string,
    public readonly userId: string,
    public readonly rating: number,
    public readonly content: string,
  ) {
    super();
  }
}

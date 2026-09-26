import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class RespondReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.respond';

  constructor(
    public readonly reviewId: string,
    public readonly response: string,
  ) {
    super();
  }
}

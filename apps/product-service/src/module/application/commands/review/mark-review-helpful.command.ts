import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class MarkReviewHelpfulCommand extends BaseCommand {
  readonly type = 'review.helpful';
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
  ) { super(); }
}

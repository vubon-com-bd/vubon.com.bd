import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ApproveReviewCommand extends BaseCommand {
  readonly type = 'review.approve';
  constructor(
    public readonly reviewId: string,
    public readonly moderatorId: string,
  ) { super(); }
}

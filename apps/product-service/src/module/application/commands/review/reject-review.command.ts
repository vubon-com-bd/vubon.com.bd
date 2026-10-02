import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class RejectReviewCommand extends BaseCommand {
  readonly type = 'review.reject';
  constructor(
    public readonly reviewId: string,
    public readonly reason: string,
    public readonly moderatorId: string,
  ) { super(); }
}

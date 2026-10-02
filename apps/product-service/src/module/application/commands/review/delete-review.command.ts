import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class DeleteReviewCommand extends BaseCommand {
  readonly type = 'review.delete';
  constructor(
    public readonly reviewId: string,
    public readonly actorId: string,
  ) { super(); }
}

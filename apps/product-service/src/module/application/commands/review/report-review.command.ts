import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ReportReviewCommand extends BaseCommand {
  readonly type = 'review.report';
  constructor(
    public readonly reviewId: string,
    public readonly userId: string,
    public readonly reason: string,
  ) { super(); }
}

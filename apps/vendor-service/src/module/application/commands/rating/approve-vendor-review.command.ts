import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class ApproveVendorReviewCommand extends BaseCommand {
  readonly type = 'vendor.review.approve';
  constructor(
    public readonly reviewId: string,
    public readonly actorId?: string,
  ) { super(); }
}

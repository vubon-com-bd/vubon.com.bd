import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class ApproveReviewCommand extends BaseCommand {
  readonly type = 'product.review.approve';
  constructor(public readonly dto: ApproveReviewRequestDTO) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class RejectReviewCommand extends BaseCommand {
  readonly type = 'product.review.reject';
  constructor(public readonly dto: RejectReviewRequestDTO) {
    super();
  }
}

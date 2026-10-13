import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitReviewCommandDTO } from '../../dtos/requests/review/index.js';

export class SubmitReviewCommand extends BaseCommand {
  readonly type = 'product.review.submit';
  constructor(public readonly dto: SubmitReviewCommandDTO) {
    super();
  }
}

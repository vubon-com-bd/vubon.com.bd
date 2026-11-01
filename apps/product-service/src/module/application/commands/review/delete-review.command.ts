import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class DeleteReviewCommand extends BaseCommand {
  readonly type = 'product.review.delete';
  constructor(public readonly dto: DeleteReviewRequestDTO) {
    super();
  }
}

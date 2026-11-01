import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateReviewRequestDTO } from '../../dtos/requests/review/index.js';

export class UpdateReviewCommand extends BaseCommand {
  readonly type = 'product.review.update';
  constructor(public readonly dto: UpdateReviewRequestDTO) {
    super();
  }
}

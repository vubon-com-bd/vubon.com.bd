import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateReviewRequestDTO } from '../../dtos/requests/review/update-review.dto.js';

export class UpdateReviewCommand extends BaseCommand {
  readonly type = 'review.update';
  constructor(public readonly dto: UpdateReviewRequestDTO) { super(); }
}

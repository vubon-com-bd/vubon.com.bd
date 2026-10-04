import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitReviewRequestDTO } from '../../dtos/requests/review/submit-review.dto.js';

export class SubmitReviewCommand extends BaseCommand {
  readonly type = 'review.submit';
  constructor(public readonly dto: SubmitReviewRequestDTO) { super(); }
}

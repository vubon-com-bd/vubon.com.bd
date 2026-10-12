import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartClaimReviewRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class StartClaimReviewCommand extends BaseCommand {
  readonly type = 'logistics.insurance.start_review';
  constructor(public readonly dto: StartClaimReviewRequestDTO, public readonly actorId?: string) { super(); }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReviewClaimRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class ReviewClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.review_claim';
  constructor(public readonly dto: ReviewClaimRequestDTO, public readonly actorId: string) { super(); }
}

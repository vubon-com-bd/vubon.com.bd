import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveClaimRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class ApproveClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.approve_claim';
  constructor(public readonly dto: ApproveClaimRequestDTO, public readonly actorId: string) { super(); }
}

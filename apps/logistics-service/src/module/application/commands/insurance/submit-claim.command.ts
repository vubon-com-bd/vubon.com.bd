import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SubmitClaimRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class SubmitClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.submit_claim';
  constructor(public readonly dto: SubmitClaimRequestDTO, public readonly actorId: string) { super(); }
}

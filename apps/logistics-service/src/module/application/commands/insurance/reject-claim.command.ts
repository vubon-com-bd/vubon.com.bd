import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectClaimRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class RejectClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.reject_claim';
  constructor(public readonly dto: RejectClaimRequestDTO, public readonly actorId: string) { super(); }
}

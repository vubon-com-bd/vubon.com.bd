import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PayClaimRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class PayClaimInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.pay_claim';
  constructor(public readonly dto: PayClaimRequestDTO, public readonly actorId: string) { super(); }
}

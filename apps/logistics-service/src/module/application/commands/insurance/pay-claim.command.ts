import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PayClaimRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class PayClaimCommand extends BaseCommand {
  readonly type = 'logistics.insurance.pay';
  constructor(public readonly dto: PayClaimRequestDTO, public readonly actorId?: string) { super(); }
}

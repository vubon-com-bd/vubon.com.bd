import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ApproveClaimRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class ApproveClaimCommand extends BaseCommand {
  readonly type = 'logistics.insurance.approve';
  constructor(public readonly dto: ApproveClaimRequestDTO, public readonly actorId?: string) { super(); }
}

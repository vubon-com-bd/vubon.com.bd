import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RejectClaimRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class RejectClaimCommand extends BaseCommand {
  readonly type = 'logistics.insurance.reject';
  constructor(public readonly dto: RejectClaimRequestDTO, public readonly actorId?: string) { super(); }
}

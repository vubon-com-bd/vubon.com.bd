import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AppealClaimRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class AppealClaimCommand extends BaseCommand {
  readonly type = 'logistics.insurance.appeal';
  constructor(public readonly dto: AppealClaimRequestDTO, public readonly actorId?: string) { super(); }
}

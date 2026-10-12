import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CancelInsuranceRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class CancelInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.cancel';
  constructor(public readonly dto: CancelInsuranceRequestDTO, public readonly actorId?: string) { super(); }
}

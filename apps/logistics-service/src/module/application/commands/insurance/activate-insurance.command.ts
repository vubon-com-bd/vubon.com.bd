import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateInsuranceRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class ActivateInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.activate';
  constructor(public readonly dto: ActivateInsuranceRequestDTO, public readonly actorId?: string) { super(); }
}

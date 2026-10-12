import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ExpireInsuranceRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class ExpireInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.expire';
  constructor(public readonly dto: ExpireInsuranceRequestDTO, public readonly actorId?: string) { super(); }
}

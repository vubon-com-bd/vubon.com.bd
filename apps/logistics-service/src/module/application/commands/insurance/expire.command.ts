import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { InsuranceActionRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class ExpireInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.expire';
  constructor(public readonly dto: InsuranceActionRequestDTO, public readonly actorId: string) { super(); }
}

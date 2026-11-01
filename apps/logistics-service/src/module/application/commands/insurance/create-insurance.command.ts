import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateInsuranceRequestDTO } from '@application/dtos/requests/insurance/index.js';
export class CreateInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.create';
  constructor(public readonly dto: CreateInsuranceRequestDTO, public readonly actorId: string) { super(); }
}

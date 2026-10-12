import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PurchaseInsuranceRequestDTO } from '../../dtos/requests/insurance/insurance.dto.js';
export class PurchaseInsuranceCommand extends BaseCommand {
  readonly type = 'logistics.insurance.purchase';
  constructor(public readonly dto: PurchaseInsuranceRequestDTO, public readonly actorId?: string) { super(); }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { RemitDriverCashRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class RemitDriverCashCommand extends BaseCommand {
  readonly type = 'logistics.driver.remit_cash';
  constructor(public readonly dto: RemitDriverCashRequestDTO, public readonly actorId?: string) { super(); }
}

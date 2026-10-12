import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReceiveDriverCashRequestDTO } from '../../dtos/requests/driver/driver.dto.js';
export class ReceiveDriverCashCommand extends BaseCommand {
  readonly type = 'logistics.driver.receive_cash';
  constructor(public readonly dto: ReceiveDriverCashRequestDTO, public readonly actorId?: string) { super(); }
}

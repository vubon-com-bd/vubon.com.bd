import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DepositCashRequestDTO } from '@application/dtos/requests/driver/index.js';
export class DepositCashDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.deposit_cash';
  constructor(public readonly dto: DepositCashRequestDTO, public readonly actorId: string) { super(); }
}

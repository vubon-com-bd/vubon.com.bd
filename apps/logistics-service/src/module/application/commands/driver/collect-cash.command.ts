import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CollectCashRequestDTO } from '@application/dtos/requests/driver/index.js';
export class CollectCashDriverCommand extends BaseCommand {
  readonly type = 'logistics.driver.collect_cash';
  constructor(public readonly dto: CollectCashRequestDTO, public readonly actorId: string) { super(); }
}

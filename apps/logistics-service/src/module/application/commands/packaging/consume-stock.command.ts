import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConsumeStockRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class ConsumeStockPackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.consume_stock';
  constructor(public readonly dto: ConsumeStockRequestDTO, public readonly actorId: string) { super(); }
}

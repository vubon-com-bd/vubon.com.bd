import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddStockRequestDTO } from '@application/dtos/requests/packaging/index.js';
export class AddStockPackagingCommand extends BaseCommand {
  readonly type = 'logistics.packaging.add_stock';
  constructor(public readonly dto: AddStockRequestDTO, public readonly actorId: string) { super(); }
}

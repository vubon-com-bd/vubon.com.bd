import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AdjustPackagingStockRequestDTO } from '../../dtos/requests/packaging/packaging.dto.js';
export class AdjustPackagingStockCommand extends BaseCommand {
  readonly type = 'logistics.packaging.adjust_stock';
  constructor(public readonly dto: AdjustPackagingStockRequestDTO, public readonly actorId?: string) { super(); }
}

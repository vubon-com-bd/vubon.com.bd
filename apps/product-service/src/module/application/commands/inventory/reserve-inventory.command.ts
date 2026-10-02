/**
 * ReserveInventoryCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReserveInventoryRequestDTO } from '../../dtos/requests/inventory/reserve-inventory.dto.js';

export class ReserveInventoryCommand extends BaseCommand {
  readonly type = 'inventory.reserve';
  constructor(public readonly dto: ReserveInventoryRequestDTO) { super(); }
}

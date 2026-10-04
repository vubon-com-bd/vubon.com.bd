/**
 * AdjustInventoryCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AdjustInventoryRequestDTO } from '../../dtos/requests/inventory/adjust-inventory.dto.js';

export class AdjustInventoryCommand extends BaseCommand {
  readonly type = 'inventory.adjust';
  constructor(public readonly dto: AdjustInventoryRequestDTO) { super(); }
}

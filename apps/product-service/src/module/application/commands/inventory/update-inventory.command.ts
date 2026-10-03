/**
 * UpdateInventoryCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateInventoryRequestDTO } from '../../dtos/requests/inventory/update-inventory.dto.js';

export class UpdateInventoryCommand extends BaseCommand {
  readonly type = 'inventory.update';
  constructor(
    public readonly dto: UpdateInventoryRequestDTO,
    public readonly actorId: string,
  ) { super(); }
}

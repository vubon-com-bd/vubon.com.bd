/**
 * ReleaseInventoryCommand
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseInventoryRequestDTO } from '../../dtos/requests/inventory/release-inventory.dto.js';

export class ReleaseInventoryCommand extends BaseCommand {
  readonly type = 'inventory.release';
  constructor(public readonly dto: ReleaseInventoryRequestDTO) { super(); }
}

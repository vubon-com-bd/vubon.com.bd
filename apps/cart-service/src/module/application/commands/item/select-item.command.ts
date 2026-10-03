import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectItemRequestDTO } from '../../dtos/requests/item/select-item.dto.js';

export class SelectItemCommand extends BaseCommand {
  readonly type = 'cart.item.select';
  constructor(public readonly dto: SelectItemRequestDTO) { super(); }
}

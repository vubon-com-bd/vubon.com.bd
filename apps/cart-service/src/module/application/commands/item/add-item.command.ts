import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddItemRequestDTO } from '../../dtos/requests/item/add-item.dto.js';

export class AddItemCommand extends BaseCommand {
  readonly type = 'cart.item.add';
  constructor(public readonly dto: AddItemRequestDTO) { super(); }
}

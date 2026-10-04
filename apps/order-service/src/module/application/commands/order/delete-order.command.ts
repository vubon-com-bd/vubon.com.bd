import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeleteOrderRequestDTO } from '../../dtos/requests/order/delete-order.dto.js';

export class DeleteOrderCommand extends BaseCommand {
  readonly type = 'order.delete';
  constructor(public readonly dto: DeleteOrderRequestDTO, public readonly actorId?: string) { super(); }
}

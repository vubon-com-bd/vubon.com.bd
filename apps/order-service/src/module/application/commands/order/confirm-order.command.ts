import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmOrderStatusRequestDTO } from '../../dtos/requests/order/confirm-order.dto.js';

export class ConfirmOrderCommand extends BaseCommand {
  readonly type = 'order.confirm';
  constructor(public readonly dto: ConfirmOrderStatusRequestDTO, public readonly actorId?: string) { super(); }
}

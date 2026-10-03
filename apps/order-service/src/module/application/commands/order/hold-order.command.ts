import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { HoldOrderRequestDTO } from '../../dtos/requests/order/hold-order.dto.js';

export class HoldOrderCommand extends BaseCommand {
  readonly type = 'order.hold';
  constructor(public readonly dto: HoldOrderRequestDTO, public readonly actorId?: string) { super(); }
}

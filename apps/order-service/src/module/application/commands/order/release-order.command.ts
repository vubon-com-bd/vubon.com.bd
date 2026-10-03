import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ReleaseOrderRequestDTO } from '../../dtos/requests/order/release-order.dto.js';

export class ReleaseOrderCommand extends BaseCommand {
  readonly type = 'order.release';
  constructor(public readonly dto: ReleaseOrderRequestDTO, public readonly actorId?: string) { super(); }
}

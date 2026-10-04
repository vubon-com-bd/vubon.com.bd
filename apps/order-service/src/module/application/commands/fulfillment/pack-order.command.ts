import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { PackOrderRequestDTO } from '../../dtos/requests/fulfillment/pack-order.dto.js';

export class PackOrderCommand extends BaseCommand {
  readonly type = 'fulfillment.pack';
  constructor(public readonly dto: PackOrderRequestDTO, public readonly actorId?: string) { super(); }
}

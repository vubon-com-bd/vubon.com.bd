import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectShippingRequestDTO } from '../../dtos/requests/checkout/select-shipping.dto.js';

export class SelectShippingCommand extends BaseCommand {
  readonly type = 'checkout.select_shipping';
  constructor(public readonly dto: SelectShippingRequestDTO, public readonly actorId?: string) { super(); }
}

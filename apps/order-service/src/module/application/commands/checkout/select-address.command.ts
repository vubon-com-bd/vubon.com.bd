import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SelectAddressRequestDTO } from '../../dtos/requests/checkout/select-address.dto.js';

export class SelectAddressCommand extends BaseCommand {
  readonly type = 'checkout.select_address';
  constructor(public readonly dto: SelectAddressRequestDTO, public readonly actorId?: string) { super(); }
}

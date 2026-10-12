import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class CreateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.create';
  constructor(public readonly dto: CreateShippingMethodRequestDTO, public readonly actorId?: string) { super(); }
}

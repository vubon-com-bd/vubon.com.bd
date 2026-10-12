import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class UpdateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.update';
  constructor(public readonly dto: UpdateShippingMethodRequestDTO, public readonly actorId?: string) { super(); }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class DeactivateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.deactivate';
  constructor(public readonly dto: DeactivateShippingMethodRequestDTO, public readonly actorId?: string) { super(); }
}

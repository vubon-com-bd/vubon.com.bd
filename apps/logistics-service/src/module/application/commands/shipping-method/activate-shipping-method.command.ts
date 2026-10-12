import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ActivateShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class ActivateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.activate';
  constructor(public readonly dto: ActivateShippingMethodRequestDTO, public readonly actorId?: string) { super(); }
}

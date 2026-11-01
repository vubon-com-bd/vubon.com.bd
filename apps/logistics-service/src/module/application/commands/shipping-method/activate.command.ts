import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ShippingMethodActionRequestDTO } from '@application/dtos/requests/shipping-method/index.js';
export class ActivateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.activate';
  constructor(public readonly dto: ShippingMethodActionRequestDTO, public readonly actorId: string) { super(); }
}

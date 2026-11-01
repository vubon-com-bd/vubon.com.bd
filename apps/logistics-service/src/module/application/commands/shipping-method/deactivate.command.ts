import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeactivateShippingMethodRequestDTO } from '@application/dtos/requests/shipping-method/index.js';
export class DeactivateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.deactivate';
  constructor(public readonly dto: DeactivateShippingMethodRequestDTO, public readonly actorId: string) { super(); }
}

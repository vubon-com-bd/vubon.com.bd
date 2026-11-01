import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateShippingMethodRequestDTO } from '@application/dtos/requests/shipping-method/index.js';
export class UpdateShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.update';
  constructor(public readonly dto: UpdateShippingMethodRequestDTO, public readonly actorId: string) { super(); }
}

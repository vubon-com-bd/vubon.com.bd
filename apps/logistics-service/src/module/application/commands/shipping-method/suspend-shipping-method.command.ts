import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SuspendShippingMethodRequestDTO } from '../../dtos/requests/shipping-method/shipping-method.dto.js';
export class SuspendShippingMethodCommand extends BaseCommand {
  readonly type = 'logistics.shipping_method.suspend';
  constructor(public readonly dto: SuspendShippingMethodRequestDTO, public readonly actorId?: string) { super(); }
}

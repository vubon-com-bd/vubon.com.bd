import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { SetShippingMethodsRequestDTO } from '../../dtos/requests/shipping/index.js';

export class SetShippingMethodsCommand extends BaseCommand {
  readonly type = 'vendor.shipping.set_methods';
  constructor(
    public readonly dto: SetShippingMethodsRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}

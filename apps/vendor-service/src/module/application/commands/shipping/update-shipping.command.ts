import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateShippingRequestDTO } from '../../dtos/requests/shipping/index.js';

export class UpdateShippingCommand extends BaseCommand {
  readonly type = 'vendor.shipping.update';
  constructor(
    public readonly dto: UpdateShippingRequestDTO,
    public readonly actorId?: string,
  ) {
    super();
  }
}

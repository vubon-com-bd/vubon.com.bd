import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { StartCheckoutRequestDTO } from '../../dtos/requests/checkout/start-checkout.dto.js';

export class StartCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.start';
  constructor(public readonly dto: StartCheckoutRequestDTO, public readonly actorId?: string) { super(); }
}

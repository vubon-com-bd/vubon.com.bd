import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfirmCheckoutRequestDTO } from '../../dtos/requests/checkout/confirm-checkout.dto.js';

export class ConfirmCheckoutCommand extends BaseCommand {
  readonly type = 'checkout.confirm';
  constructor(public readonly dto: ConfirmCheckoutRequestDTO, public readonly actorId?: string) { super(); }
}

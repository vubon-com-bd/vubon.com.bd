import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { MergeGuestCartRequestDTO } from '../../dtos/requests/guest/merge-guest-cart.dto.js';

export class MergeGuestCartCommand extends BaseCommand {
  readonly type = 'guest.merge';
  constructor(public readonly dto: MergeGuestCartRequestDTO) { super(); }
}

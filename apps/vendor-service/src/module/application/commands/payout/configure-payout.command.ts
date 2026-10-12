/**
 * ConfigurePayoutCommand
 * @module vendor-service/application/commands/payout
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfigurePayoutRequestDto } from '../../dtos/requests/configure-payout.dto.js';

export class ConfigurePayoutCommand extends BaseCommand {
  readonly type = 'vendor.payout.configure';
  constructor(
    public readonly dto: ConfigurePayoutRequestDto,
    public readonly actorId?: string,
  ) { super(); }
}

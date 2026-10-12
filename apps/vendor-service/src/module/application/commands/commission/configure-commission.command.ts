/**
 * ConfigureCommissionCommand
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { ConfigureCommissionRequestDto } from '../../dtos/requests/configure-commission.dto.js';

export class ConfigureCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.configure';
  constructor(
    public readonly dto: ConfigureCommissionRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}

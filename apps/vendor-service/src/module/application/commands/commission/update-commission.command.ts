/**
 * UpdateCommissionCommand
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateCommissionRequestDTO } from '../../dtos/requests/commission/index.js';

export class UpdateCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.update';
  constructor(
    public readonly dto: UpdateCommissionRequestDTO,
    public readonly actorId: string,
  ) {
    super();
  }
}

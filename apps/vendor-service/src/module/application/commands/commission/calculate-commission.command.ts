/**
 * CalculateCommissionCommand — preview commission
 * @module vendor-service/application/commands/commission
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CalculateCommissionRequestDto } from '../../dtos/requests/calculate-commission.dto.js';

export class CalculateCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.calculate';
  constructor(
    public readonly dto: CalculateCommissionRequestDto,
    public readonly actorId?: string,
  ) {
    super();
  }
}

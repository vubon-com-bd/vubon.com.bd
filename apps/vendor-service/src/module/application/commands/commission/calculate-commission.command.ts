import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CalculateCommissionRequestDTO } from '../../dtos/requests/commission/index.js';

export class CalculateCommissionCommand extends BaseCommand {
  readonly type = 'vendor.commission.calculate';
  constructor(public readonly dto: CalculateCommissionRequestDTO) {
    super();
  }
}

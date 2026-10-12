/**
 * Update KPI Command
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateKpiDto } from '../../dtos/requests/kpi/update-kpi.dto.js';

export class UpdateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.update';

  constructor(
    public readonly kpiId: string,
    public readonly payload: UpdateKpiDto
  ) {
    super();
  }
}

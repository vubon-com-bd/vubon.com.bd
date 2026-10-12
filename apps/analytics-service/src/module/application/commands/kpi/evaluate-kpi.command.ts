/**
 * Evaluate KPI Command
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { EvaluateKpiDto } from '../../dtos/requests/kpi/evaluate-kpi.dto.js';

export class EvaluateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.evaluate';

  constructor(
    public readonly kpiId: string,
    public readonly payload: EvaluateKpiDto
  ) {
    super();
  }
}

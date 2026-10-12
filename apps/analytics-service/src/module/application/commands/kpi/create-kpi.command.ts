/**
 * Create KPI Command
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateKpiDto } from '../../dtos/requests/kpi/create-kpi.dto.js';

export class CreateKpiCommand extends BaseCommand {
  readonly type = 'analytics.kpi.create';

  constructor(public readonly payload: CreateKpiDto) {
    super();
  }
}

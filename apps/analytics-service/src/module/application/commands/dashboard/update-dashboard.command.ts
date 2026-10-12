import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdateDashboardDto } from '../../dtos/requests/dashboard/update-dashboard.dto.js';

export class UpdateDashboardCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.update';
  constructor(
    public readonly dashboardId: string,
    public readonly payload: UpdateDashboardDto,
    public readonly userId: string
  ) { super(); }
}

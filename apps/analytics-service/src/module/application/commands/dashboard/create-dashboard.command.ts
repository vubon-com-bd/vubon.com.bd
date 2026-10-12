import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreateDashboardDto } from '../../dtos/requests/dashboard/create-dashboard.dto.js';

export class CreateDashboardCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.create';
  constructor(
    public readonly payload: CreateDashboardDto,
    public readonly userId: string
  ) { super(); }
}

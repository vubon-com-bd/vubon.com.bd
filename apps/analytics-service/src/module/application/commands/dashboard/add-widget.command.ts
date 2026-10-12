import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { AddWidgetDto } from '../../dtos/requests/dashboard/add-widget.dto.js';

export class AddWidgetCommand extends BaseCommand {
  readonly type = 'analytics.dashboard.add-widget';
  constructor(
    public readonly dashboardId: string,
    public readonly payload: AddWidgetDto,
    public readonly userId: string
  ) { super(); }
}

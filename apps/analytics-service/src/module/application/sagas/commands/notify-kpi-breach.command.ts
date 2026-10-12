import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class NotifyKpiBreachCommand extends BaseSagaCommand {
  readonly type = 'analytics.saga.notify-kpi-breach';
  constructor(
    public readonly kpiId: string,
    public readonly kpiName: string,
    public readonly achievementPercent: number,
    public readonly sagaId?: string
  ) { super(); }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateAnalyticsCommand extends BaseCommand {
  readonly type = 'saga.update_analytics';
  constructor(
    public readonly orderId: string,
    public readonly eventName: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) { super(); }
}

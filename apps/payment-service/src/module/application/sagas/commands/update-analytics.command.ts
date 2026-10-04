import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateAnalyticsCommand extends BaseCommand {
  readonly type = 'saga.update_analytics';
  constructor(
    public readonly paymentId: string,
    public readonly event: string,
    public readonly data?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}

import { BaseCommand } from '@vubon/shared-kernel/application/commands';

export class UpdateAnalyticsCommand extends BaseCommand {
  readonly type = 'saga.analytics.update';
  constructor(
    public readonly cartId: string,
    public readonly event: string,
    public readonly payload: Readonly<Record<string, unknown>>,
  ) { super(); }
}

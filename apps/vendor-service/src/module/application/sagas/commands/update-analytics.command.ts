import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'vendor.saga.update_analytics';

  constructor(
    public readonly vendorId: string,
    public readonly eventType: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly occurredAt: string,
    public readonly sagaId?: string,
  ) {
    super();
  }
}

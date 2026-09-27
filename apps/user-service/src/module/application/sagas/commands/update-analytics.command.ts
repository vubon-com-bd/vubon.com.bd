/**
 * UpdateAnalyticsCommand
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'saga.analytics.update';

  constructor(
    public readonly userId: string,
    public readonly eventName: string,
    public readonly payload: Readonly<Record<string, unknown>>
  ) {
    super();
  }
}

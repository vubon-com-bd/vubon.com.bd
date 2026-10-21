/**
 * UpdateAnalyticsCommand
 * @module payment-service/application/sagas/commands
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class UpdateAnalyticsCommand extends BaseSagaCommand {
  readonly type = 'payment.saga.update_analytics';
  constructor(
    public readonly paymentId: string,
    public readonly event: string,
    public readonly data: Readonly<Record<string, unknown>>,
    public readonly sagaId?: string,
  ) {
    super();
  }
}

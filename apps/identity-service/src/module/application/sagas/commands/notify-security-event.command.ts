import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class NotifySecurityEventCommand extends BaseSagaCommand {
  readonly type = 'saga.notify-security-event';
  constructor(
    public readonly userId: string,
    public readonly eventType: string,
    public readonly metadata?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}

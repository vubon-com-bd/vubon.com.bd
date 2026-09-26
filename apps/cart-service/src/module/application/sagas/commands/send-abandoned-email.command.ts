import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendAbandonedEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.send-abandoned-email';
  constructor(public readonly userId: string, public readonly cartId: string) { super(); }
}

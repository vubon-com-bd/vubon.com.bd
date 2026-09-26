import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendAbandonedSmsCommand extends BaseSagaCommand {
  readonly type = 'saga.send-abandoned-sms';
  constructor(public readonly userId: string, public readonly cartId: string) { super(); }
}

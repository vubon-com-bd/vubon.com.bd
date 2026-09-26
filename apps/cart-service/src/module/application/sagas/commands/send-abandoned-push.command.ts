import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendAbandonedPushCommand extends BaseSagaCommand {
  readonly type = 'saga.send-abandoned-push';
  constructor(public readonly userId: string, public readonly cartId: string) { super(); }
}

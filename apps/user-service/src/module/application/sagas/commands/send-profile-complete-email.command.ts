import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendProfileCompleteEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.user.profile-complete-email';

  constructor(public readonly userId: string) {
    super();
  }
}

import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas/base.saga.command';

export class SendSatisfactionSurveyCommand extends BaseSagaCommand {
  readonly type = 'saga.send-satisfaction-survey';

  constructor(
    public readonly ticketId: string,
    public readonly userId: string,
  ) {
    super();
  }
}

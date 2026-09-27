/**
 * SendProfileCompleteEmailCommand
 */
import { BaseSagaCommand } from '@vubon/shared-kernel/application/sagas';

export class SendProfileCompleteEmailCommand extends BaseSagaCommand {
  readonly type = 'saga.email.profileComplete';

  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly completionScore: number
  ) {
    super();
  }
}
